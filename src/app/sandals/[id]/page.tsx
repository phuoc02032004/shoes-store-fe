"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { getProductById } from '@/api/product'; 
import { getSizeById } from '@/api/size';       
import { Product } from '@/types/products';   
import { Size } from '@/types/sizes';         
import { addToCart } from '@/api/cart';
import { CartItem } from '@/types/cart';

const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>;
const LikeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .308-1.211A5.967 5.967 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>;
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;

const formatPrice = (amount?: number): string => {
    if (typeof amount !== 'number') return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
};

const DetailPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const [, setCart] = useState<CartItem[]>([]);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sizeDetails, setSizeDetails] = useState<Size[]>([]);

  useEffect(() => {
    const fetchProductAndSizes = async () => {
      if (!productId) {
          setError("Product ID is missing.");
          setLoading(false);
          return;
      }
      try {
        setLoading(true);
        setError(null);
        setProduct(null); 
        setSizeDetails([]); 
        setSelectedSize(null); 

        const response = await getProductById(productId);

        if (response && typeof response === 'object' && 'data' in response && response.data && typeof response.data === 'object' && 'id' in response.data) {
           const productData = response.data as Product;
           setProduct(productData);

           
           if (productData.sizes && productData.sizes.length > 0) {
               const sizeIds = productData.sizes.map(size => typeof size === 'string' ? size : null).filter(id => id !== null) as string[];

               const fetchedSizeDetailsPromises = sizeIds.map((sizeId) => getSizeById(sizeId));
               const fetchedSizeDetailsResults = await Promise.all(fetchedSizeDetailsPromises);

               const mappedAndValidSizeDetails = fetchedSizeDetailsResults
                 .map(size => {
                   if (size && typeof size === 'object' && '_id' in size && 'value' in size) {
                     return { ...size, id: size._id } as Size; 
                   }
                   return null; 
                 })
                 .filter((size): size is Size => size !== null && typeof size.id !== 'undefined' && typeof size.value !== 'undefined'); // Filter nulls and ensure id/value exist

               setSizeDetails(mappedAndValidSizeDetails);

           } else {
               setSizeDetails([]);
               setSelectedSize(null);
           }
        } else {
          console.error("Unexpected response structure or missing product data:", response);
          setError("Failed to load product details due to data structure issue.");
          setProduct(null);
          setSizeDetails([]);
        }

      } catch (err) {
        console.error("Failed to fetch product or sizes:", err);
        setError("Could not load product details or sizes. Please try again later.");
        setProduct(null); 
        setSizeDetails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndSizes();
  }, [productId]); 

  const originalPriceFormatted = formatPrice(product?.price);
  const discountedPriceFormatted = formatPrice(product?.discountedPrice);
  const hasDiscount = typeof product?.discountedPrice === 'number' && (product?.discountedPrice || 0) < (product?.price || 0);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product.id, 1, String(selectedSize))
        .then((response) => {
          setCart((prevCart) => [...prevCart, response.data]);
          setSelectedSize(null); 
          alert("Product added to cart successfully!");
        })
        .catch((error) => {
          console.error("Failed to add item to cart:", error);
          setError("Could not add item to cart. Please try again later.");
        });
        console.log("Product added to cart:", product.id, selectedSize);
    } else {
      setError("Please select a size before adding to cart.");
    }
   
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-10">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found or could not be loaded.</div>;
  }

  return (
    <div className=" bg-white mx-auto px-4 lg:px-16 py-8">
       <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2 flex-wrap">
         <Link href="/" className="hover:text-blue-600">Vantela</Link>
         <span>{'>'}</span>
         {product.category && (
           <>
             <Link href={`/${product.category.toLowerCase()}`} className="hover:text-blue-600 capitalize">{product.category.toLowerCase()}</Link>
             <span>{'>'}</span>
           </>
         )}
         <span className="text-blue-600 font-medium">{product.name}</span>
       </nav>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
         <div>
            {product.image ? (
              <div className="space-y-4 flex justify-center lg:justify-start">
                 <div className="relative aspect-square border border-gray-200 rounded-lg overflow-hidden w-full max-w-xl">
                   <Image
                     src={product.image}
                     alt={product.name || 'Product Image'}
                     fill
                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                     className="object-contain"
                     priority 
                   />
                 </div>
              </div>
            ) : (
               <div className="aspect-square border border-gray-200 rounded-lg flex items-center justify-center bg-gray-100 w-full max-w-md mx-auto lg:mx-0">
                   <span className="text-gray-500">Image not available</span>
               </div>
            )}
         </div>

         <div className="space-y-6">
           <div className="flex justify-between items-start gap-4">
             <h1 className="text-3xl text-black lg:text-4xl font-semibold leading-tight">{product.name}</h1>
             <div className="flex space-x-3 items-center mt-1 flex-shrink-0">
                <button title="Share" className="text-gray-600 hover:text-gray-900"><ShareIcon /></button>
                <button title="Add to Wishlist" className="text-gray-600 hover:text-red-500"><LikeIcon /></button>
             </div>
           </div>

           <div className="flex items-baseline space-x-3 flex-wrap">
             <span className="text-3xl font-medium text-blue-900">
               {hasDiscount ? discountedPriceFormatted : originalPriceFormatted}
             </span>
             {hasDiscount && (
               <span className="text-gray-500 line-through text-lg">
                 {originalPriceFormatted}
               </span>
             )}
             {hasDiscount && product.discount && product.discount > 0 && (
                <div className="bg-red-500 text-white rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  -{product.discount}%
                </div>
             )}
           </div>

           {sizeDetails.length > 0 && (
             <div>
               <p className="text-base font-medium text-gray-800 mb-3">Select a size</p>
               <div className="flex flex-wrap gap-2">
                 {sizeDetails.map((size) => {
                   return (
                     <button
                       key={size.id}
                       onClick={() => setSelectedSize(prevSize => prevSize === size.id ? null : size.id)}
                       aria-label={`Select size ${size.value}`}
                       className={`border rounded-md px-5 py-2 text-sm font-medium transition-all duration-150 ease-in-out ${
                         size.id === selectedSize
                           ? 'border-blue-700 bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1'
                           : 'border-gray-300 text-gray-700 bg-white hover:border-gray-500 hover:text-black'
                       }`}
                     >
                       {size.value?.toString()}
                     </button>
                   );
                 })}
               </div>
               {selectedSize === null && <p className="text-red-500 text-xs mt-2">Please select a size.</p>}
             </div>
           )}

           <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-4">
             <button
                className="flex-1 border border-blue-900 text-blue-900 rounded-full px-6 py-3 text-base font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleAddToCart} 
                disabled={sizeDetails.length > 0 && selectedSize === null}
              >
               <AddIcon />
               <span>Add to cart</span>
             </button>
             <button title="Chat with seller" className="border border-blue-900 rounded-full p-3 text-blue-900 hover:bg-blue-50 transition-colors">
                <ChatIcon />
             </button>
           </div>
        </div>
       </div>

       <div className="mt-12 lg:mt-16">
          <div className="border-b border-gray-300 mb-6">
             <div className="flex space-x-0 bg-gray-100 rounded-t-lg p-1 max-w-md">
                <button className="flex-1 bg-white text-blue-900 rounded-md shadow-sm py-2 px-4 text-sm font-medium ring-1 ring-inset ring-gray-300" aria-current="page">
                  Details
                </button>
                <button className="flex-1 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md py-2 px-4 text-sm font-medium">
                  Review
                </button>
                <button className="flex-1 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md py-2 px-4 text-sm font-medium whitespace-nowrap">
                  Similar products
                </button>
            </div>
          </div>
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              <p>{product.description || 'No description available.'}</p>
          </div>
       </div>
     </div>
   );
 };

export default DetailPage;