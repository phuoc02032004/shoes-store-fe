import React, { useState, useEffect } from 'react';
import { Order, OrderItem } from '@/types/order';
import { getOrderById } from '@/api/order';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatVND } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface OrderDetailModalProps {
  orderId: string | null;
  onClose: () => void;
}

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ orderId, onClose }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      return;
    }

    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOrderById(orderId);
        setOrder(response.data.data);
      } catch (caughtError: unknown) { 
        console.error("Failed to fetch order details:", caughtError);
        
        let errorMessage = 'Failed to load order details.'; 

        if (typeof caughtError === 'object' && caughtError !== null) {
          const errorAsApiError = caughtError as ApiError; 

          if (errorAsApiError.response?.data?.message && typeof errorAsApiError.response.data.message === 'string') {
            errorMessage = errorAsApiError.response.data.message;
          } else if (errorAsApiError.message && typeof errorAsApiError.message === 'string') {
            errorMessage = errorAsApiError.message;
          }
          else if (caughtError instanceof Error) {
            errorMessage = caughtError.message;
          }
        } else if (caughtError instanceof Error) { 
          errorMessage = caughtError.message;
        } else if (typeof caughtError === 'string') {
          errorMessage = caughtError;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={!!orderId} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-background overflow-y-auto p-6 shadow-xl hide-scrollbar">
        <DialogHeader className="pb-3 mb-4 border-b border-border">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Order Details #{order?._id ? order._id.slice(-6).toUpperCase() : '...'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Detailed information for the selected order.
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex flex-col items-center justify-center h-60 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-3" />
            <p>Loading order details...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-md my-4" role="alert">
            <strong className="font-semibold">Error:</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        )}

        {order && !loading && !error && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 bg-muted/50 p-4 rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground">
                  Placed on: {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Last updated: {new Date(order.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <Badge variant={(order.orderStatus === 'COMPLETED' || order.orderStatus === 'DELIVERED') ? 'default' : 'secondary'} className="text-sm px-3 py-1.5 mt-2 sm:mt-0">
                {order.orderStatus?.replace('_', ' ') || 'PROCESSING'}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Items</h3>
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                  {order.orderItems?.map((item: OrderItem) => (
                    <div key={item._id} className="flex justify-between items-center text-sm py-2.5 border-b border-border/70 last:border-none">
                      <div>
                        <p className="font-medium text-foreground">{item.name} (x{item.quantity})</p>
                        <p className="text-xs text-muted-foreground">Size: {item.size || 'N/A'}</p>
                      </div>
                      <span className="font-semibold text-foreground">{formatVND(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  {(!order.orderItems || order.orderItems.length === 0) && (
                     <p className="text-sm text-muted-foreground text-center py-4">No items in this order.</p>
                  )}
                </div>
              </div>
            </div>
            
            {order.shippingAddress && (
                <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Shipping Address</h3>
                <div className="bg-muted/50 p-4 rounded-lg border border-border text-sm space-y-1.5">
                    <p><span className="font-medium text-foreground">Name:</span> <span className="text-muted-foreground">{order.shippingAddress.fullName}</span></p>
                    <p><span className="font-medium text-foreground">Address:</span> <span className="text-muted-foreground">{order.shippingAddress.address1}</span></p>
                    {order.shippingAddress.address2 && <p className="text-muted-foreground pl-2">{order.shippingAddress.address2}</p>}
                    <p><span className="font-medium text-foreground">City:</span> <span className="text-muted-foreground">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</span></p>
                    <p><span className="font-medium text-foreground">Country:</span> <span className="text-muted-foreground">{order.shippingAddress.country}</span></p>
                    <p><span className="font-medium text-foreground">Phone:</span> <span className="text-muted-foreground">{order.shippingAddress.phone}</span></p>
                </div>
                </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Payment</h3>
              <div className="bg-muted/50 p-4 rounded-lg border border-border text-sm space-y-1.5">
                <p>
                  <span className="font-medium text-foreground">Method:</span> <span className="text-muted-foreground">{order.paymentMethod}</span>
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-foreground">Status:</span>
                  {order.isPaid ?
                    <Badge variant="default" className="ml-2">Paid</Badge> :
                    <Badge variant="outline" className="ml-2">Pending</Badge>
                  }
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <div className="space-y-1.5">
                <p className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items Total:</span>
                  <span className="font-semibold text-foreground">{formatVND(order.itemsPrice)}</span>
                </p>
                <p className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-semibold text-foreground">{formatVND(order.shippingPrice)}</span>
                </p>
                {order.taxPrice > 0 && (
                  <p className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="font-semibold text-foreground">{formatVND(order.taxPrice)}</span>
                  </p>
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-border/70">
                <p className="flex justify-between text-lg font-bold">
                  <span className=" text-white">Grand Total:</span>
                  <span className="text-white text-2xl">{formatVND(order.totalPrice)}</span>
                </p>
              </div>
            </div>

          </div>
        )}

        <DialogFooter className="pt-5 mt-6 border-t border-border">
          {/* <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Close</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
