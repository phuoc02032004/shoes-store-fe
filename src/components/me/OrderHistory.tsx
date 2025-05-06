import React, { useState } from 'react'; 
import { Order } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OrderHistoryProps {
  orders: Order[];
  loading: boolean;
  error: Error | null;
}

const ORDERS_PER_PAGE = 10; 

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> Failed to load orders. {error.message}</span>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>You haven&apos;t placed any orders yet.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // --- Render Orders and Pagination ---
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3">Order History</h2>
      <div className="space-y-6">
        {currentOrders.map((order) => ( // Map over currentOrders
          <Card key={order.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="bg-gray-50 text-black p-4 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <Badge variant={order.orderStatus === 'COMPLETED' ? 'default' : 'secondary'}>
                  {order.orderStatus || 'PROCESSING'}
                </Badge>
              </div>
              <CardDescription className="text-sm text-gray-500 pt-1">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Total:</span>
                <span className="font-semibold text-gray-900 ml-2">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </p>
              {/* <Button size="sm" variant="outline" className="mt-2">View Details</Button> */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;