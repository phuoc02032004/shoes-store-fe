import React, { useState, FormEvent } from "react";
import { ShippingAddress } from "@/types/order";
import { createOrder, createZaloPay } from "@/api/order";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ModalCheckoutProps {
  show: boolean;
  onClose: () => void;
  onCheckout: (data: CheckoutData) => void;
}

interface CheckoutData {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

const ModalCheckout: React.FC<ModalCheckoutProps> = ({ show, onClose, onCheckout }) => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    address1: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("COD");
  const [zalopayLink, setZalopayLink] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const router = useRouter();

  if (!show) {
    return null;
  }

  const resetModal = () => {
    setShippingAddress({
      fullName: "",
      phone: "",
      address1: "",
      city: "",
      postalCode: "",
      country: "",
    });
    setPaymentMethod("COD");
    setZalopayLink(null);
    setShowThankYou(false);
    onClose();
    router.push("/home"); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in shippingAddress) {
      setShippingAddress({ ...shippingAddress, [name]: value });
    } else if (name === "paymentMethod") {
      setPaymentMethod(value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    console.log("Form submitted with values:", shippingAddress, paymentMethod);
    e.preventDefault();
    const orderData = { shippingAddress, paymentMethod };
    onCheckout(orderData);
    createOrder(orderData).then((response) => {
      console.log("Create order response:", response); 
      console.log("orderid:", response.data.data.order._id);
      if (paymentMethod === 'ZaloPay' && response.data.data.order._id) {
        createZaloPay(response.data.data.order._id).then((zalopayResponse) => {
          console.log("ZaloPay response:", zalopayResponse.data.data);
          if (zalopayResponse.data && zalopayResponse.data.data.payUrl) {
            setZalopayLink(zalopayResponse.data.data.payUrl);
          } else {
            console.error("ZaloPay payUrl not found in response.");
            resetModal();
          }
        }).catch((zalopayError) => {
          console.error("Error creating ZaloPay link:", zalopayError);
          resetModal(); // Close on error
        });
      } else if (paymentMethod === 'COD') {
        console.log("COD payment method selected.");
         setShowThankYou(true); // Show thank you for COD success
      }
    }).catch((error) => {
      console.error("Error creating order:", error);
      resetModal(); // Close on error
    });
  };

  const inputBaseClasses = "block w-full border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <form
        className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={resetModal}
          aria-label="Close checkout modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl text-center font-semibold text-gray-800 mb-5">Shipping & Payment</h2>

        {showThankYou ? ( // Render thank you section if showThankYou is true
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-green-600">Thank you for your order!</p>
            <p className="text-sm text-gray-700">Your order has been placed successfully.</p>
            <button
              type="button"
              className="w-full bg-gray-300 text-gray-800 px-4 py-2.5 rounded-md font-medium hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={resetModal}
            >
              Close
            </button>
          </div>
        ) : zalopayLink ? ( // Else if zalopayLink exists, show ZaloPay link section
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-green-600">Order created successfully!</p>
            <p className="text-sm text-gray-700">Please click the button below to complete payment via ZaloPay.</p>
            <Link href={zalopayLink} passHref legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-green-500 text-white px-4 py-2.5 rounded-md font-medium hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={() => setShowThankYou(true)} // Set showThankYou to true after clicking ZaloPay link
              >
                Pay with ZaloPay
              </a>
            </Link>
            <button
              type="button"
              className="w-full bg-gray-300 text-gray-800 px-4 py-2.5 rounded-md font-medium hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={resetModal}
            >
              Close
            </button>
          </div>
        ) : ( // Else, show the form
          <>
            <div className="space-y-4 mb-5">
                <div>
                    <label htmlFor="fullName" className="block text-xs font-medium text-gray-600 mb-1">Full name</label>
                    <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={inputBaseClasses}
                    placeholder="Your full name"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={inputBaseClasses}
                    placeholder="Contact phone number"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="address1" className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                    <input
                    type="text"
                    id="address1"
                    name="address1"
                    className={inputBaseClasses}
                    placeholder="Street address, P.O. box, etc."
                    value={shippingAddress.address1}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-xs font-medium text-gray-600 mb-1">City</label>
                        <input
                        type="text"
                        id="city"
                        name="city"
                        className={inputBaseClasses}
                        placeholder="City"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-xs font-medium text-gray-600 mb-1">Postal Code</label>
                        <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        className={inputBaseClasses}
                        placeholder="Postal code"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="country" className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                    <input
                    type="text"
                    id="country"
                    name="country"
                    className={inputBaseClasses}
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            </div>

            <div className="mb-6">
              <label htmlFor="paymentMethod" className="block text-xs font-medium text-gray-600 mb-1">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className={`${inputBaseClasses} appearance-none`}
                value={paymentMethod}
                onChange={handleInputChange}
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="ZaloPay">ZaloPay</option>
              </select>
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-md font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-auto"
            >
                Complete
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ModalCheckout;