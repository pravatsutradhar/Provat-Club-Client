import React, { useState, useEffect } from 'react';
import { useAllCoupons, useAddCoupon, useUpdateCoupon, useDeleteCoupon } from '../../hooks/useAdminDashboard';
import { toast } from '../common/CustomToast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Form for adding/editing a coupon
const CouponForm = ({ initialData = null, onClose, onSave }) => {
  const [code, setCode] = useState(initialData?.code || '');
  const [discountPercentage, setDiscountPercentage] = useState(initialData?.discountPercentage || '');
  const [expirationDate, setExpirationDate] = useState(initialData?.expirationDate ? new Date(initialData.expirationDate) : null);
  const [isActive, setIsActive] = useState(initialData?.isActive !== undefined ? initialData.isActive : true);
  const [usageLimit, setUsageLimit] = useState(initialData?.usageLimit || '');

  const isEditing = !!initialData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !discountPercentage || !expirationDate) {
      toast.error('Please fill in all required fields: Code, Discount, Expiration Date.');
      return;
    }
    onSave({
      _id: initialData?._id,
      code,
      discountPercentage: Number(discountPercentage),
      expirationDate,
      isActive,
      usageLimit: usageLimit ? Number(usageLimit) : null
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto my-8 border border-blue-200">
      <h3 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 border-blue-200 pb-3 text-center tracking-tight drop-shadow-lg">
        {isEditing ? 'Edit Coupon' : 'Add New Coupon'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="couponCode">Code</label>
          <input type="text" id="couponCode" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} required />
        </div>
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="discountPercentage">Discount (%)</label>
          <input type="number" id="discountPercentage" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} required min="0" max="100" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="expirationDate">Expiration Date</label>
          <DatePicker
            selected={expirationDate}
            onChange={(date) => setExpirationDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg"
            required
            id="expirationDate"
          />
        </div>
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="usageLimit">Usage Limit (optional)</label>
          <input type="number" id="usageLimit" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={usageLimit} onChange={(e) => setUsageLimit(e.target.value)} min="0" placeholder="No limit if empty" />
        </div>
        <div className="flex items-center mt-2">
          <input type="checkbox" id="isActive" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <label htmlFor="isActive" className="ml-2 text-blue-700 text-base font-semibold">Is Active</label>
        </div>
        <div className="md:col-span-2 flex flex-col md:flex-row justify-end items-center space-y-3 md:space-y-0 md:space-x-4 mt-6">
          <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-xl shadow transition-all duration-200 text-lg">
            Cancel
          </button>
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg">
            {isEditing ? 'Update Coupon' : 'Add Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
};

function AdminManageCoupons() {
  const { data: coupons, isLoading, isError, error } = useAllCoupons();
  const addCouponMutation = useAddCoupon();
  const updateCouponMutation = useUpdateCoupon();
  const deleteCouponMutation = useDeleteCoupon();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading coupons...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load coupons.'}</div>;
  }

  const handleSaveCoupon = (couponData) => {
    if (couponData._id) {
      updateCouponMutation.mutate({ id: couponData._id, couponData });
    } else {
      addCouponMutation.mutate(couponData);
    }
    setShowAddForm(false);
    setEditingCoupon(null);
  };

  const handleDeleteCoupon = (couponId, couponCode) => {
    if (window.confirm(`Are you sure you want to delete coupon "${couponCode}"? This action cannot be undone.`)) {
      deleteCouponMutation.mutate(couponId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Manage Coupons</h2>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => { setShowAddForm(true); setEditingCoupon(null); }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add New Coupon
        </button>
      </div>

      {(showAddForm || editingCoupon) && (
        <CouponForm
          initialData={editingCoupon}
          onClose={() => { setShowAddForm(false); setEditingCoupon(null); }}
          onSave={handleSaveCoupon}
        />
      )}

      {coupons.length === 0 && !showAddForm ? (
        <p className="text-center text-gray-600 text-lg py-10">No coupons available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount (%)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active
                </th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage Limit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Used
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {coupon.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {coupon.discountPercentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(coupon.expirationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {coupon.isActive ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {coupon.usageLimit !== null ? coupon.usageLimit : 'Unlimited'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {coupon.usedCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingCoupon(coupon)}
                      className="text-blue-600 hover:text-blue-900 transition duration-200 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(coupon._id, coupon.code)}
                      className="text-red-600 hover:text-red-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={deleteCouponMutation.status === 'pending' && deleteCouponMutation.variables === coupon._id}
                    >
                      {deleteCouponMutation.variables === coupon._id && deleteCouponMutation.status === 'pending' ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminManageCoupons;