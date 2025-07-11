import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'; // Install react-datepicker: npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Don't forget to import CSS
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '../common/CustomToast';
import { useMutation } from '@tanstack/react-query';
import api from '../../services/api';

// Set app element for react-modal (important for accessibility)
Modal.setAppElement('#root');

// Define available time slots (can be fetched from backend for specific courts if needed)
const ALL_TIME_SLOTS = [
  "09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM", "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"
];

function BookingModal({ isOpen, onRequestClose, court }) {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Reset form when modal opens or court changes
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(new Date()); // Default to today
      setSelectedSlots([]);
      setTotalPrice(0);
    }
  }, [isOpen, court]);

  // Calculate total price whenever selected slots or court changes
  useEffect(() => {
    if (court) {
      setTotalPrice(selectedSlots.length * court.pricePerSession);
    }
  }, [selectedSlots, court]);

  const handleSlotToggle = (slot) => {
    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((s) => s !== slot)
        : [...prevSlots, slot].sort((a, b) => {
            // Simple string sort for time slots (e.g., "09:00" before "10:00")
            const timeA = parseInt(a.substring(0, 2));
            const timeB = parseInt(b.substring(0, 2));
            return timeA - timeB;
          })
    );
  };

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData) => {
      const { data } = await api.post('/bookings', bookingData);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Booking request submitted successfully!');
      onRequestClose(); // Close modal on success
      // Invalidate courts query to reflect potential availability changes (though less direct here)
      // queryClient.invalidateQueries(['courts']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to submit booking. Please try again.';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error('Please select a booking date.');
      return;
    }
    if (selectedSlots.length === 0) {
      toast.error('Please select at least one session slot.');
      return;
    }

    const bookingData = {
      courtId: court._id,
      selectedSlots,
      bookingDate: selectedDate.toISOString().split('T')[0], // YYYY-MM-DD format for backend
    };

    createBookingMutation.mutate(bookingData);
  };

  if (!court) return null; // Don't render if no court data

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Book Court Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto my-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">Book {court.name}</h2>
          <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Court Info (Read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Court Name</label>
              <input type="text" value={court.name} className="form-input" readOnly disabled />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Court Type</label>
              <input type="text" value={court.type} className="form-input" readOnly disabled />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Price Per Session</label>
              <input type="text" value={`$${court.pricePerSession.toFixed(2)}`} className="form-input" readOnly disabled />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
              <input type="text" value={user?.email || ''} className="form-input" readOnly disabled />
            </div>
          </div>

          {/* Booking Date Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()} // Can't select past dates
              dateFormat="dd/MM/yyyy"
              className="form-input w-full"
              required
            />
          </div>

          {/* Time Slot Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Slots (multiple)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ALL_TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleSlotToggle(slot)}
                  className={`px-3 py-2 rounded-md border text-sm font-medium transition duration-200 ${
                    selectedSlots.includes(slot)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-600">Selected: {selectedSlots.join(', ') || 'None'}</p>
          </div>

          {/* Total Price */}
          <div className="mb-6 text-right">
            <h3 className="text-2xl font-bold text-gray-900">Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={createBookingMutation.status === 'pending' || selectedSlots.length === 0 || !selectedDate}
            >
              {createBookingMutation.status === 'pending' ? 'Submitting...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default BookingModal;