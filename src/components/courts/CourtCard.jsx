import React from 'react';
import { toast } from '../common/CustomToast'; // Make sure path is correct
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function CourtCard({ court }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleBookNow = () => {
    if (!isLoggedIn) {
      toast.info('Please log in to book a court.');
      navigate('/login');
    } else {
      // This will open the booking modal later
      toast.success(`Booking form for ${court.name} (Type: ${court.type}) would open here.`);
      // For now, let's just log it
      console.log(`Open booking modal for court: ${court.name}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <img
        src={court.image}
        alt={court.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{court.name}</h3>
        <p className="text-gray-700 text-lg mb-3">
          <span className="font-semibold">Type:</span> {court.type}
        </p>
        <p className="text-green-600 text-xl font-bold mb-4 flex-grow">
          Price: ${court.pricePerSession.toFixed(2)}/session
        </p>
        <p className="text-gray-600 text-sm mb-4">
            {court.description}
        </p>
        <button
          onClick={handleBookNow}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default CourtCard;