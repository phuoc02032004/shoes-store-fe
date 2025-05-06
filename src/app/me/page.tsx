'use client'
import React from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import { getMyOrders } from "@/api/order";
import ProfileLayout from "@/components/me/ProfileLayout";
import { Order } from "@/types/order";

const Me = () => {
  const router = useRouter(); 
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return; 
    }

    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();
        if (response?.data?.data) {
          setOrders(response.data.data);
        } else {
          console.warn("Unexpected response structure:", response);
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err instanceof Error && err.message.includes('Unauthorized')) { 
           localStorage.removeItem('token');
           router.push('/signin');
        } else {
          setError(err instanceof Error ? err : new Error('Failed to load orders'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]); 

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem('token'); 
    router.push('/signin'); 
  };

  const handleChangePassword = () => {
    console.log("Change Password clicked");
  };



  return (
    <ProfileLayout
      orders={orders}
      loading={loading}
      error={error}
      onLogout={handleLogout}
      onChangePassword={handleChangePassword}
    />
  );
};

export default Me;