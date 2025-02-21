import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Request {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

function AdminDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:3001/requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const updateRequestStatus = async (id: number, status: string) => {
    try {
      // Find the current request
      const request = requests.find(r => r.id === id);
      if (!request) return;

      // Create the updated request object
      const updatedRequest = { ...request, status };

      const response = await fetch(`http://localhost:3001/requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRequest),
      });

      if (!response.ok) {
        throw new Error('Failed to update request status');
      }

      // Update the local state immediately
      setRequests(prevRequests => 
        prevRequests.map(req => req.id === id ? { ...req, status } : req)
      );
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update request status. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-[#1e3a8a]">Admin Dashboard</h2>
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No vacation requests found.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{request.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>Start: {new Date(request.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <span>End: {new Date(request.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <p className="text-gray-600 bg-gray-50 p-3 rounded-md mb-4">{request.reason}</p>

              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateRequestStatus(request.id, 'approved')}
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => updateRequestStatus(request.id, 'declined')}
                    className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <XCircle size={18} />
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;