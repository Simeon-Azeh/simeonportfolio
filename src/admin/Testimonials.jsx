import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Tag, Space, Modal, Form, Input, Rate, Switch, 
  Popconfirm, message, Skeleton, Badge, Typography, Avatar, Tooltip
} from 'antd';
import { 
  CheckOutlined, 
  CloseOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
  StarOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { 
  collection, 
  query, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy, 
  where 
} from 'firebase/firestore';
import { db } from '../firebase';
import moment from 'moment';

const { TextArea } = Input;
const { Title, Text } = Typography;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, [refreshKey]);

  useEffect(() => {
    if (testimonials.length) {
      applyFilters();
    }
  }, [testimonials, filterStatus, searchText]);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const testimonialsRef = collection(db, 'testimonials');
      const q = query(testimonialsRef);
      const snapshot = await getDocs(q);
      
      const fetchedTestimonials = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      }));
      
      setTestimonials(fetchedTestimonials);
      setFilteredTestimonials(fetchedTestimonials);
      message.success('Testimonials loaded successfully');
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      message.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...testimonials];
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(item => item.status === filterStatus);
    }
    
    // Apply search
    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      result = result.filter(
        item => 
          item.name?.toLowerCase().includes(lowerCaseSearch) || 
          item.position?.toLowerCase().includes(lowerCaseSearch) ||
          item.text?.toLowerCase().includes(lowerCaseSearch) ||
          item.company?.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    setFilteredTestimonials(result);
  };

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (record) => {
    setCurrentTestimonial(record);
    form.setFieldsValue({
      name: record.name,
      position: record.position,
      company: record.company || '',
      text: record.text,
      rating: record.rating,
      status: record.status === 'approved'
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const testimonialRef = doc(db, 'testimonials', currentTestimonial.id);
      
      await updateDoc(testimonialRef, {
        name: values.name,
        position: values.position,
        company: values.company || '',
        text: values.text,
        rating: values.rating,
        status: values.status ? 'approved' : 'rejected',
        updatedAt: new Date()
      });
      
      message.success('Testimonial updated successfully');
      setEditModalVisible(false);
      refreshData();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      message.error('Failed to update testimonial');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      message.success('Testimonial deleted successfully');
      refreshData();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      message.error('Failed to delete testimonial');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const testimonialRef = doc(db, 'testimonials', id);
      await updateDoc(testimonialRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      message.success(`Testimonial ${newStatus === 'approved' ? 'approved' : 'rejected'}`);
      refreshData();
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Reviewer',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar 
            src={record.image} 
            size="large" 
            icon={<UserOutlined />}
            className="mr-3"
          />
          <div>
            <Text strong>{text}</Text>
            <div className="text-xs text-gray-500">{record.position}</div>
            {record.company && (
              <div className="text-xs text-gray-500">
                {record.company}
              </div>
            )}
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Testimonial',
      dataIndex: 'text',
      key: 'text',
      width: '35%',
      render: text => (
        <div className="max-h-32 overflow-auto pr-2">
          <Text ellipsis={{ rows: 3 }}>{text}</Text>
        </div>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: rating => <Rate disabled defaultValue={rating} />,
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = 'default';
        let text = 'Unknown';
        
        switch(status) {
          case 'approved':
            color = 'success';
            text = 'Approved';
            break;
          case 'rejected':
            color = 'error';
            text = 'Rejected';
            break;
          case 'pending':
            color = 'warning';
            text = 'Pending';
            break;
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: date => moment(date).format('MMM D, YYYY'),
      sorter: (a, b) => a.timestamp - b.timestamp,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          {record.status !== 'approved' && (
            <Tooltip title="Approve">
              <Button 
                type="primary" 
                size="small" 
                icon={<CheckOutlined />} 
                onClick={() => handleStatusChange(record.id, 'approved')}
                className="bg-green-500 hover:bg-green-600"
              />
            </Tooltip>
          )}
          
          {record.status !== 'rejected' && (
            <Tooltip title="Reject">
              <Button 
                type="primary" 
                danger 
                size="small" 
                icon={<CloseOutlined />} 
                onClick={() => handleStatusChange(record.id, 'rejected')}
              />
            </Tooltip>
          )}
          
          <Tooltip title="Edit">
            <Button 
              size="small" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this testimonial?"
              description="This action cannot be undone."
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
              icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            >
              <Button 
                danger 
                size="small" 
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const statusTabs = [
    { key: 'all', label: 'All', count: testimonials.length },
    { 
      key: 'pending', 
      label: 'Pending', 
      count: testimonials.filter(t => t.status === 'pending').length,
      color: 'orange'
    },
    { 
      key: 'approved', 
      label: 'Approved', 
      count: testimonials.filter(t => t.status === 'approved').length,
      color: 'green'
    },
    { 
      key: 'rejected', 
      label: 'Rejected', 
      count: testimonials.filter(t => t.status === 'rejected').length,
      color: 'red'
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Title level={2} className="mb-0 md:mb-0 dark:text-white">
          Manage Testimonials
        </Title>
        
        <div className="flex mt-4 md:mt-0">
          <Input 
            placeholder="Search testimonials..." 
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="mr-2 w-64"
            allowClear
          />
          <Button 
            icon={<ReloadOutlined />} 
            onClick={refreshData}
            loading={loading}
          >
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {statusTabs.map(tab => (
          <Button
            key={tab.key}
            type={filterStatus === tab.key ? 'primary' : 'default'}
            onClick={() => setFilterStatus(tab.key)}
            className={filterStatus === tab.key ? (tab.color ? `bg-${tab.color}-500 border-${tab.color}-500` : '') : ''}
          >
            {tab.label}
            <Badge 
              count={tab.count} 
              className="ml-2"
              style={{ backgroundColor: tab.color || '#1890ff' }}
            />
          </Button>
        ))}
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton active avatar paragraph={{ rows: 1 }} />
          <Skeleton active avatar paragraph={{ rows: 1 }} />
          <Skeleton active avatar paragraph={{ rows: 1 }} />
        </div>
      ) : (
        <Table 
          columns={columns} 
          dataSource={filteredTestimonials}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} testimonials`
          }}
          onChange={(pagination, filters, sorter) => {
            console.log('Table params:', { pagination, filters, sorter });
          }}
          locale={{ 
            emptyText: (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">
                  <StarOutlined />
                </div>
                <p className="text-gray-500">No testimonials found</p>
                {searchText && 
                  <Button 
                    type="link" 
                    onClick={() => setSearchText('')}
                  >
                    Clear search
                  </Button>
                }
              </div>
            ) 
          }}
        />
      )}
      
      <Modal
        title="Edit Testimonial"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Save Changes"
        cancelText="Cancel"
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the name' }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: 'Please enter the position' }]}
            >
              <Input />
            </Form.Item>
          </div>
          
          <Form.Item
            name="company"
            label="Company (Optional)"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="text"
            label="Testimonial Text"
            rules={[{ required: true, message: 'Please enter the testimonial text' }]}
          >
            <TextArea rows={4} showCount maxLength={500} />
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true, message: 'Please select rating' }]}
            >
              <Rate allowHalf />
            </Form.Item>
            
            <Form.Item
              name="status"
              label="Approve Testimonial"
              valuePropName="checked"
            >
              <Switch 
                checkedChildren={<CheckOutlined />} 
                unCheckedChildren={<CloseOutlined />} 
              />
            </Form.Item>
          </div>
          
          {currentTestimonial && (
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md mt-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div>
                  <CalendarOutlined className="mr-1" />
                  Submitted: {moment(currentTestimonial.timestamp).format('MMM D, YYYY, h:mm A')}
                </div>
                {currentTestimonial.email && (
                  <div>
                    Email: {currentTestimonial.email}
                  </div>
                )}
              </div>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Testimonials;