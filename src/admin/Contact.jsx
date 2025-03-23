import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMail, FiUser, FiMessageSquare, FiCalendar, FiClock, FiEye, 
  FiRefreshCw, FiX, FiCheck, FiTrash2, FiAlertCircle, FiSearch, FiFilter
} from 'react-icons/fi';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  where,
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';

const Contact = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'read'
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState(null);

  // Fetch contact form submissions
  useEffect(() => {
    setIsLoading(true);
    
    let submissionsQuery;
    
    if (filter === 'new') {
      submissionsQuery = query(
        collection(db, 'contactFormSubmissions'),
        where('status', '==', 'new'),
        orderBy('timestamp', 'desc')
      );
    } else if (filter === 'read') {
      submissionsQuery = query(
        collection(db, 'contactFormSubmissions'),
        where('status', '==', 'read'),
        orderBy('timestamp', 'desc')
      );
    } else {
      submissionsQuery = query(
        collection(db, 'contactFormSubmissions'),
        orderBy('timestamp', 'desc')
      );
    }
    
    const unsubscribe = onSnapshot(submissionsQuery, (snapshot) => {
      const fetchedSubmissions = snapshot.docs.map(doc => {
        const data = doc.data();
        let timestamp;

        // Handle different timestamp formats
        if (data.timestamp && typeof data.timestamp.toDate === 'function') {
          timestamp = data.timestamp.toDate();
        } else if (data.timestamp) {
          timestamp = new Date(data.timestamp);
        } else {
          timestamp = new Date();
        }

        return {
          id: doc.id,
          ...data,
          timestamp
        };
      });
      
      setSubmissions(fetchedSubmissions);
      setIsLoading(false);
      
      // Select the first submission if available and none is selected
      if (fetchedSubmissions.length > 0 && !selectedSubmission) {
        setSelectedSubmission(fetchedSubmissions[0]);
      }
    });
    
    return () => unsubscribe();
  }, [filter]);

  // Mark submission as read when selected
  useEffect(() => {
    if (selectedSubmission?.id && selectedSubmission.status === 'new') {
      const submissionRef = doc(db, 'contactFormSubmissions', selectedSubmission.id);
      
      updateDoc(submissionRef, {
        status: 'read',
        readAt: Timestamp.now()
      }).then(() => {
        // Update locally to avoid waiting for the snapshot
        setSelectedSubmission(prev => ({
          ...prev,
          status: 'read',
          readAt: new Date()
        }));
      }).catch(error => {
        console.error("Error updating document:", error);
      });
    }
  }, [selectedSubmission]);

  const handleSelectSubmission = (submission) => {
    setSelectedSubmission(submission);
  };

  const handleDeleteSubmission = (id) => {
    setIsDeleting(true);
    
    deleteDoc(doc(db, 'contactFormSubmissions', id))
      .then(() => {
        if (selectedSubmission && selectedSubmission.id === id) {
          const nextSubmission = submissions.find(s => s.id !== id);
          setSelectedSubmission(nextSubmission || null);
        }
        setShowDeleteConfirm(false);
        setSubmissionToDelete(null);
      })
      .catch(error => {
        console.error("Error deleting document:", error);
        alert("Failed to delete submission. Please try again.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const confirmDelete = (submission) => {
    setSubmissionToDelete(submission);
    setShowDeleteConfirm(true);
  };

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), 'MMM d, yyyy • h:mm a');
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Filter submissions by search term
  const filteredSubmissions = submissions.filter(submission => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (submission.name && submission.name.toLowerCase().includes(searchLower)) ||
      (submission.email && submission.email.toLowerCase().includes(searchLower)) ||
      (submission.subject && submission.subject.toLowerCase().includes(searchLower)) ||
      (submission.message && submission.message.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-4"
          >
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/30 rounded-full p-2">
                <FiAlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Delete Contact Submission
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this contact submission from {submissionToDelete?.name || 'Unknown'}? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSubmission(submissionToDelete.id)}
                disabled={isDeleting}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 border border-transparent rounded-md shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="mr-2 -ml-1" /> Delete
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Submissions list */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Contact Submissions
            </h2>
            <button 
              onClick={() => window.location.reload()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Refresh submissions"
            >
              <FiRefreshCw size={16} />
            </button>
          </div>
          
          {/* Search and filter */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search submissions..."
                className="pl-10 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                  filter === 'all'
                    ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                  filter === 'new'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                New
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                  filter === 'read'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Read
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Loading submissions...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? "No submissions matching your search." 
                : filter !== 'all'
                  ? `No ${filter} submissions found.`
                  : "No contact submissions available."
              }
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubmissions.map((submission) => (
                <li key={submission.id} className="relative">
                  <button
                    onClick={() => handleSelectSubmission(submission)}
                    className={`w-full text-left px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedSubmission?.id === submission.id ? 'bg-pink-50 dark:bg-pink-900/10' : ''
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-900 dark:text-white truncate pr-8 flex items-center">
                        {submission.name || 'Unknown'}
                        {submission.status === 'new' && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        <FiCalendar className="inline mr-1" />
                        {format(new Date(submission.timestamp), 'MMM d')}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-center text-xs text-gray-600 dark:text-gray-300">
                      <FiMail className="mr-1 flex-shrink-0" />
                      <span className="truncate">{submission.email || 'No email'}</span>
                    </div>
                    
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                      <FiMessageSquare className="inline mr-1" />
                      {submission.subject || 'No subject'}
                    </div>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(submission);
                    }}
                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-700 rounded-full"
                    title="Delete submission"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submission detail panel */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {selectedSubmission ? (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    {selectedSubmission.name || 'Unknown'}
                    {selectedSubmission.status === 'new' && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        New
                      </span>
                    )}
                    {selectedSubmission.status === 'read' && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Read
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Submitted {formatTimestamp(selectedSubmission.timestamp)}
                  </p>
                </div>
                <button
                  onClick={() => confirmDelete(selectedSubmission)}
                  className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Delete submission"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6 flex-grow overflow-y-auto">
              {/* Contact details */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Contact Details</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                      <FiUser className="inline mr-1" /> Name:
                    </div>
                    <div className="text-gray-800 dark:text-white">
                      {selectedSubmission.name || 'Not provided'}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                      <FiMail className="inline mr-1" /> Email:
                    </div>
                    <div className="text-gray-800 dark:text-white break-all">
                      <a href={`mailto:${selectedSubmission.email}`} className="text-pink-600 dark:text-pink-400 hover:underline">
                        {selectedSubmission.email || 'Not provided'}
                      </a>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                      <FiMessageSquare className="inline mr-1" /> Subject:
                    </div>
                    <div className="text-gray-800 dark:text-white">
                      {selectedSubmission.subject || 'Not provided'}
                    </div>
                  </div>
                  {selectedSubmission.language && (
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                        Language:
                      </div>
                      <div className="text-gray-800 dark:text-white">
                        {selectedSubmission.language}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Message content */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Message</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                    {selectedSubmission.message || 'No message content'}
                  </p>
                </div>
              </div>
              
              {/* Metadata */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Additional Information</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3 text-sm">
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                      <FiClock className="inline mr-1" /> Received:
                    </div>
                    <div className="text-gray-800 dark:text-white">
                      {formatTimestamp(selectedSubmission.timestamp)}
                    </div>
                  </div>
                  
                  {selectedSubmission.status === 'read' && selectedSubmission.readAt && (
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                        <FiEye className="inline mr-1" /> Read:
                      </div>
                      <div className="text-gray-800 dark:text-white">
                        {formatTimestamp(selectedSubmission.readAt)}
                      </div>
                    </div>
                  )}
                  
                  {selectedSubmission.source && (
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                        Source:
                      </div>
                      <div className="text-gray-800 dark:text-white">
                        {selectedSubmission.source}
                      </div>
                    </div>
                  )}
                  
                  {selectedSubmission.userAgent && (
                    <div className="flex">
                      <div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">
                        Device:
                      </div>
                      <div className="text-gray-800 dark:text-white text-xs break-all">
                        {selectedSubmission.userAgent}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center">
                    <FiUser className="mr-1" />
                    From: {selectedSubmission.name || 'Unknown'}
                  </span>
                </div>
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <FiMail className="mr-2 -ml-1" />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-500 dark:text-gray-400">
            <FiMessageSquare className="w-12 h-12 mb-4" />
            <h3 className="font-medium text-lg mb-1">No Submission Selected</h3>
            <p>Select a submission from the list to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;