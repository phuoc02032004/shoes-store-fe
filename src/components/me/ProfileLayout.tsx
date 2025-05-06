import React from 'react';
import OrderHistory from './OrderHistory';
import ProfileActions from './ProfileActions';
import { Order } from '@/types/order';

interface ProfileLayoutProps {
  orders: Order[];
  loading: boolean;
  error: Error | null;
  onLogout: () => void;
  onChangePassword: () => void;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  orders,
  loading,
  error,
  onLogout,
  onChangePassword,
}) => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 lg:py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-800">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">User Information</h2>
            <div className="space-y-2">
              <p className='text-black'><span className="font-medium text-black">Name:</span> {user.name}</p>
              <p className='text-black'><span className="font-medium text-black">Email:</span> {user.email}</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Account Actions</h2>
            <ProfileActions onLogout={onLogout} onChangePassword={onChangePassword} />
          </div>
        </div>

        {/* Right Column (Order History) */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <OrderHistory orders={orders} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;