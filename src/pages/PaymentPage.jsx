import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCouponValidation, useProcessPayment } from '../hooks/usePayments';
import { toast } from '../components/common/CustomToast';
import api from '../services/api';

function PaymentPage() {
  const { bookingId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [bookingDetails, setBookingDetails] = useState(state?.bookingData || null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [fetchError, setFetchError] = useState('');

  const validateCouponMutation = useCouponValidation();
  const processPaymentMutation = useProcessPayment();

  // Fallback fetch: যদি state না থাকে, তাহলে API থেকে ডেটা আনো
  useEffect(() => {
    if (!bookingDetails && bookingId) {
      api.get(`/bookings/${bookingId}`)
        .then(res => {
          if (res.data && res.data.data) {
            setBookingDetails(res.data.data);
            setFinalAmount(res.data.data.totalPrice);
            setFetchError('');
          } else {
            setFetchError('Booking not found.');
            toast.error('Booking not found.');
          }
        })
        .catch(() => {
          setFetchError('Failed to fetch booking details.');
          toast.error('Failed to fetch booking details.');
          navigate('/member/dashboard/approved-bookings', { replace: true });
        });
    }
  }, [bookingDetails, bookingId, navigate]);

  // Redirect if not logged in or no booking details
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please log in to make a payment.');
      navigate('/login', { replace: true });
    } else if (!bookingDetails && !bookingId) {
      toast.error('No booking details provided. Please select an approved booking from your dashboard.');
      navigate('/member/dashboard/approved-bookings', { replace: true });
    }
  }, [isLoggedIn, bookingDetails, bookingId, navigate]);

  useEffect(() => {
    if (bookingDetails) {
      setFinalAmount(bookingDetails.totalPrice);
    }
  }, [bookingDetails]);

  // Apply Coupon Logic
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.info('Please enter a coupon code.');
      return;
    }
    try {
      const data = await validateCouponMutation.mutateAsync(couponCode);
      setDiscountPercentage(data.discountPercentage);
      // Recalculate final amount with discount
      const calculatedDiscount = (bookingDetails?.totalPrice * data.discountPercentage) / 100;
      setFinalAmount(bookingDetails?.totalPrice - calculatedDiscount);
      toast.success(`Coupon "${data.code}" applied! ${data.discountPercentage}% off.`);
    } catch (error) {
      setDiscountPercentage(0);
      setFinalAmount(bookingDetails?.totalPrice || 0);
    }
  };

  // Submit Payment
  const handleSubmitPayment = (e) => {
    e.preventDefault();

    if (!paymentMethod || !transactionId) {
      toast.error('Please select a payment method and provide a transaction ID.');
      return;
    }

    const paymentDetails = {
      bookingId: bookingDetails?._id,
      transactionId,
      paymentMethod,
      couponCode: discountPercentage > 0 ? couponCode : null,
    };

    processPaymentMutation.mutate(paymentDetails);
  };

  // Handle successful payment: redirect to confirmed bookings
  useEffect(() => {
    if (processPaymentMutation.status === 'success') {
      setTimeout(() => {
        navigate('/member/dashboard/confirmed-bookings', { replace: true });
      }, 1500);
    }
  }, [processPaymentMutation.status, navigate]);

  // Debug log
  useEffect(() => {
    console.log('bookingDetails:', bookingDetails);
    if (fetchError) {
      console.log('fetchError:', fetchError);
    }
  }, [bookingDetails, fetchError]);

  if (fetchError) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-150px)] text-xl font-semibold text-red-600">
        {fetchError}
        <pre className="text-xs text-gray-500 bg-gray-100 p-2 mt-4 rounded max-w-xl overflow-x-auto">{JSON.stringify({ bookingDetails, user, fetchError }, null, 2)}</pre>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-150px)] text-xl font-semibold text-yellow-700">
        Please log in to continue.
        <pre className="text-xs text-gray-500 bg-gray-100 p-2 mt-4 rounded max-w-xl overflow-x-auto">{JSON.stringify({ user, bookingDetails, fetchError }, null, 2)}</pre>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-150px)] text-xl font-semibold text-yellow-700">
        No booking details found for this payment.
        <pre className="text-xs text-gray-500 bg-gray-100 p-2 mt-4 rounded max-w-xl overflow-x-auto">{JSON.stringify({ user, bookingDetails, fetchError }, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 border-b pb-4">
          Complete Your Payment
        </h2>

        <form onSubmit={handleSubmitPayment}>
          {/* Read-only Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Court Name</label>
              <input type="text" value={bookingDetails?.court?.name || 'N/A'} className="form-input" readOnly disabled />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Court Type</label>
              <input type="text" value={bookingDetails?.court?.type || 'N/A'} className="form-input" readOnly disabled />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Booking Date</label>
              <input type="text" value={bookingDetails?.bookingDate ? new Date(bookingDetails.bookingDate).toLocaleDateString() : 'N/A'} className="form-input" readOnly disabled />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Selected Slots</label>
              <input type="text" value={bookingDetails?.selectedSlots?.join(', ') || 'N/A'} className="form-input" readOnly disabled />
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="mb-6 border p-4 rounded-lg bg-blue-50 border-blue-200">
            <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="couponCode">
              Have a Coupon Code?
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="couponCode"
                className="form-input flex-grow"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={validateCouponMutation.status === 'pending'}
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={validateCouponMutation.status === 'pending'}
              >
                {validateCouponMutation.status === 'pending' ? 'Applying...' : 'Apply'}
              </button>
            </div>
            {discountPercentage > 0 && (
              <p className="mt-2 text-green-700 text-sm font-semibold">
                {discountPercentage}% discount applied!
              </p>
            )}
          </div>

          {/* Payment Method & Transaction ID */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                className="form-input"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Mobile Banking">Mobile Banking</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionId">Transaction ID</label>
              <input
                type="text"
                id="transactionId"
                className="form-input"
                placeholder="Enter transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Amount Display */}
          <div className="mb-8 text-right">
            {discountPercentage > 0 && (
              <p className="text-xl text-gray-600 line-through">Original: ${bookingDetails?.totalPrice?.toFixed(2) || '0.00'}</p>
            )}
            <h3 className="text-3xl font-bold text-green-700">
              Amount to Pay: ${finalAmount.toFixed(2)}
            </h3>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={processPaymentMutation.status === 'pending' || !paymentMethod || !transactionId}
            >
              {processPaymentMutation.status === 'pending' ? 'Processing...' : 'Confirm Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;