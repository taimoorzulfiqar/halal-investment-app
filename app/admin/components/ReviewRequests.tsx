'use client';

import { useState, useEffect } from 'react';

type ReviewRequest = {
  id: string;
  investment: {
    id: string;
    title: string;
    description: string;
  };
  requester: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comment: string | null;
  createdAt: string;
};

export default function ReviewRequests() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ReviewRequest | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await fetch('/api/admin/review-requests');
    if (res.ok) {
      const data = await res.json();
      setRequests(data);
    }
  };

  const handleAction = async (requestId: string, action: 'APPROVED' | 'REJECTED') => {
    const res = await fetch(`/api/admin/review-requests/${requestId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: action,
        comment: comment
      })
    });

    if (res.ok) {
      setSelectedRequest(null);
      setComment('');
      fetchRequests();
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{request.investment.title}</div>
                  <div className="text-sm text-gray-500">{request.investment.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {request.requester.firstName} {request.requester.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{request.requester.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      request.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {request.status === 'PENDING' && (
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Review
                    </button>
                  )}
                  {request.comment && (
                    <div className="text-sm text-gray-500 mt-1">
                      Comment: {request.comment}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Review Investment Request</h2>
            <div className="mb-4">
              <h3 className="font-medium">Investment Details</h3>
              <p className="text-gray-600">{selectedRequest.investment.title}</p>
              <p className="text-sm text-gray-500">{selectedRequest.investment.description}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setComment('');
                }}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(selectedRequest.id, 'REJECTED')}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction(selectedRequest.id, 'APPROVED')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
