import React, { useState } from 'react';
import { usePaymentHistory } from '../../hooks/usePayments'; // Import the hook
import { FaTable, FaThLarge } from 'react-icons/fa'; // Icons for view toggle

function MemberPaymentHistory() {
  const { data: payments, isLoading, isError, error } = usePaymentHistory();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading payment history...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load payment history.'}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Payment History</h2>
        {/* View Toggle Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md transition duration-300 ${
              viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label="View as table"
          >
            <FaTable className="text-xl" />
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`p-2 rounded-md transition duration-300 ${
              viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label="View as cards"
          >
            <FaThLarge className="text-xl" />
          </button>
        </div>
      </div>

      {payments.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10">You have no payment history.</p>
      ) : (
        <>
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Final Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {payment.booking?.court?.name || 'N/A'} ({payment.booking?.court?.type || 'N/A'})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {payment.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        ${payment.discountAmount.toFixed(2)} ({payment.couponUsed || 'No Coupon'})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">
                        ${payment.finalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {payment.transactionId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payments.map((payment) => (
                <div key={payment._id} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Date:</span> {new Date(payment.paymentDate).toLocaleDateString()}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {payment.booking?.court?.name || 'N/A'} ({payment.booking?.court?.type || 'N/A'})
                  </h3>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Method:</span> {payment.paymentMethod}</p>
                  <p className="text-gray-700 mb-1"><span className="font-semibold">Original:</span> ${payment.amount.toFixed(2)}</p>
                  {payment.discountAmount > 0 && (
                    <p className="text-red-600 mb-1">
                      <span className="font-semibold">Discount:</span> -${payment.discountAmount.toFixed(2)} ({payment.couponUsed})
                    </p>
                  )}
                  <p className="text-green-600 font-bold text-2xl mt-3">
                    Paid: ${payment.finalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 truncate">
                    <span className="font-semibold">Tx ID:</span> {payment.transactionId}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MemberPaymentHistory;