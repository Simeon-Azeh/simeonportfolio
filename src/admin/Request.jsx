import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Table, Tag, Button, Space, Modal, Tooltip, Badge, message } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { BsCalendar, BsClock } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  // Fetch booking requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const requestsQuery = query(
        collection(db, 'bookings'),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(requestsQuery);
      const fetchedRequests = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      }));
      
      setRequests(fetchedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      message.error('Failed to load booking requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status: newStatus,
        updatedAt: new Date()
      });
      message.success(`Booking request ${newStatus}`);
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update booking status');
    }
  };

  // Handle request deletion
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      message.success('Booking request deleted');
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Error deleting request:', error);
      message.error('Failed to delete booking request');
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (service) => (
        <Tag color="blue">
          {service.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </Tag>
      ),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <span className="flex items-center gap-1">
            <BsCalendar className="text-gray-400" />
            {dayjs(record.date).format('MMM D, YYYY')}
          </span>
          <span className="flex items-center gap-1">
            <BsClock className="text-gray-400" />
            {record.time}
          </span>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColors = {
          pending: 'warning',
          approved: 'success',
          rejected: 'error',
          completed: 'processing'
        };
        return (
          <Badge status={statusColors[status]} text={status.charAt(0).toUpperCase() + status.slice(1)} />
        );
      },
    },
    {
      title: 'Requested',
      key: 'timestamp',
      render: (_, record) => (
        <Tooltip title={dayjs(record.timestamp).format('MMM D, YYYY HH:mm:ss')}>
          {dayjs(record.timestamp).fromNow()}
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              icon={<EyeOutlined />} 
              onClick={() => {
                setCurrentRequest(record);
                setDetailModalVisible(true);
              }}
            />
          </Tooltip>
          {record.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />}
                  onClick={() => handleStatusUpdate(record.id, 'approved')}
                  className="bg-green-500 hover:bg-green-600"
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button 
                  danger 
                  icon={<CloseOutlined />}
                  onClick={() => handleStatusUpdate(record.id, 'rejected')}
                />
              </Tooltip>
            </>
          )}
          <Tooltip title="Delete">
            <Button 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => Modal.confirm({
                title: 'Delete Booking Request',
                content: 'Are you sure you want to delete this booking request?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => handleDelete(record.id)
              })}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-light-text">Booking Requests</h1>
        <p className="text-gray-600">Manage and respond to booking requests from clients</p>
      </div>

      <Table 
        columns={columns}
        dataSource={requests}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Detail Modal */}
      <Modal
        title="Booking Request Details"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={600}
      >
        {currentRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-gray-500">Client Name</h4>
                <p className="font-medium">{currentRequest.name}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Email</h4>
                <p className="font-medium">{currentRequest.email}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Service</h4>
                <Tag color="blue">
                  {currentRequest.service.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </Tag>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Status</h4>
                <Badge 
                  status={
                    currentRequest.status === 'pending' ? 'warning' :
                    currentRequest.status === 'approved' ? 'success' :
                    currentRequest.status === 'rejected' ? 'error' :
                    'processing'
                  } 
                  text={currentRequest.status.charAt(0).toUpperCase() + currentRequest.status.slice(1)} 
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-500 mb-1">Preferred Schedule</h4>
              <Space direction="vertical" size="small">
                <span className="flex items-center gap-2">
                  <BsCalendar />
                  {dayjs(currentRequest.date).format('dddd, MMMM D, YYYY')}
                </span>
                <span className="flex items-center gap-2">
                  <BsClock />
                  {currentRequest.time}
                </span>
              </Space>
            </div>

            {currentRequest.message && (
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Project Details</h4>
                <p className="bg-gray-50 p-3 rounded-lg">{currentRequest.message}</p>
              </div>
            )}

            <div className="pt-4 border-t">
              <Space>
                {currentRequest.status === 'pending' && (
                  <>
                    <Button 
                      type="primary" 
                      icon={<CheckOutlined />}
                      onClick={() => {
                        handleStatusUpdate(currentRequest.id, 'approved');
                        setDetailModalVisible(false);
                      }}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Approve
                    </Button>
                    <Button 
                      danger 
                      icon={<CloseOutlined />}
                      onClick={() => {
                        handleStatusUpdate(currentRequest.id, 'rejected');
                        setDetailModalVisible(false);
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button onClick={() => setDetailModalVisible(false)}>Close</Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingRequests;