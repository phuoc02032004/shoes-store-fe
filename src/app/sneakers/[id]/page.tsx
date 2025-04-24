"use client";

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { productsSandalsMock, productsKidSandalsMock } from '@/mocks/productmock';
import { Product } from '@/types/products';
import Link from 'next/link'; // Import Link for breadcrumbs
import { useCart } from '@/context/CartContext'; // Import useCart hook

// Placeholder icons - replace with actual icons if available
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>;
const LikeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .308-1.211A5.967 5.967 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>;
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>; // Placeholder for teenyicons:right-outline

const DetailPage = () => {
  const params = useParams();
  const productId = params.id;
  const cart = useCart(); // Use the hook to access cart context
  const allProducts = [...productsSandalsMock, ...productsKidSandalsMock];
  const product = allProducts.find((p: Product) => p.id === Number(productId));

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">Product not found.</div>;
  }

  // --- Figma Specific Data (Replace with dynamic data if needed) ---
  const figmaProductName = "Vantela Ethnic Low Black Natural";
  const figmaOriginalPrice = "Rp 319.600";
  const figmaDiscountedPrice = "Rp 159.800";
  const figmaDiscountPercent = 50;
  const figmaSizes = ["38", "39", "40", "41", "42", "43"]; // Example sizes from Figma
  const figmaSelectedSize = "41"; // Example selected size
  const figmaDescription = `Condition: New\r\nMin. Order: 1 Piece\r\nShowcase: All Showcase\r\nRepublic Series\r\nGENERAL SPECIFICATIONS\r\n​color : Black Natural\r\nsize : 36 - 45 (UNISEX)\r\n\r\nMATERIALS:\r\n\r\nUPPER: 12 oz canvas\r\nTHREAD : nylon\r\nEYELETS: silver aluminum + ring\r\nINSOLE: ultralite foam\r\nFOXING : rubber\r\nOUTSOLE: rubber\r\nSTRIPE: semi-leather\r\n\r\n100% ORIGINAL BNIB item (Brand New in Box).\r\nNOT ORIGINAL GUARANTEED Money Back.\r\n\r\nSize variants are always updated, if the size can be clicked/selected it means READY.\r\nUsing good quality material, very soft, and has strong durability so it is suitable for use every day.\r\nThe insole is soft and safe so that your feet don't get sore easily.\r\nGood stitching makes shoes look good, strong, safe and durable.\r\n\r\nCHART SIZE:\r\nSIZE 36= 23.3 cm\r\nSIZE 37= 23.9 cm\r\nSIZE 38= 24.7 cm\r\nSIZE 39= 25.2 cm\r\nSIZE 40= 26.1 cm\r\nSIZE 41= 26.5 cm\r\nSIZE 42= 27.4 cm\r\nSIZE 43= 28.3 cm\r\nSIZE 44= 28.8 cm\r\nSIZE 45= 29.3 cm\r\nMEASUREMENT Method:\r\n\r\nFoot length (Hump to Toe) then adjust to the size chart above.\r\nNot Accepting Change Size,\r\nTHANK YOU for always loving DOMESTIC PRODUCTS.`;
  // --- End Figma Specific Data ---

  return (
    <div className=" bg-white mx-auto px-4 lg:px-16 py-8">
       {/* Breadcrumbs - Adjusted based on Figma */}
       <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
         <Link href="/" className="hover:text-blue-600">Vantela</Link>
         <span>&gt;</span>
         <Link href="/sneakers" className="hover:text-blue-600">Sneakers</Link>
         <span>&gt;</span>
         {/* Add category if available */}
         {/* <Link href="#" className="hover:text-blue-600">Men’s Sneakers</Link>
         <span>></span> */}
         <span className="text-blue-600 font-medium">{product.name}</span>
       </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
           <div className="relative aspect-square border border-gray-200 rounded-lg overflow-hidden">
             <Image
               src={product.image}
               alt={product.name}
               fill // Use fill for aspect ratio
               className="object-contain" // Use contain to show the whole image
             />
             {/* Carousel Indicator Dots - Placeholder */}
             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
                <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
                <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
             </div>
             {/* Arrow Button - Placeholder */}
             <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                <ArrowRightIcon />
             </button>
           </div>
           {/* Thumbnail Images - Placeholder */}
           <div className="grid grid-cols-5 gap-2">
             <div className="aspect-square border border-gray-400 rounded-md overflow-hidden">
                <Image src={product.image} alt="thumbnail" width={80} height={80} className="object-cover w-full h-full"/>
             </div>
             <div className="aspect-square border border-gray-200 rounded-md overflow-hidden opacity-60">
                 <Image src={product.image} alt="thumbnail" width={80} height={80} className="object-cover w-full h-full"/>
             </div>
              {/* Add more thumbnails */}
           </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="space-y-4">
           <div className="flex justify-between items-start">
             <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">{figmaProductName.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}</h1>
             <div className="flex space-x-3 items-center mt-1">
                <button className="text-gray-600 hover:text-gray-900"><ShareIcon /></button>
                <button className="text-gray-600 hover:text-red-500"><LikeIcon /></button>
             </div>
           </div>

           <div className="flex items-center space-x-3">
             {figmaDiscountPercent > 0 && (
                <div className="bg-yellow-500 text-black rounded-full px-3 py-1 text-sm font-medium">Disc {figmaDiscountPercent}%</div>
             )}
             <span className="text-gray-400 line-through text-lg">{figmaOriginalPrice}</span>
             <span className="text-3xl font-medium text-blue-900">{figmaDiscountedPrice}</span>
           </div>

           <div>
             <p className="text-base font-medium text-gray-800 mb-2">Select a size</p>
             <div className="flex flex-wrap gap-2">
               {figmaSizes.map((size) => (
                 <button
                   key={size}
                   className={`border rounded px-5 py-2 text-sm font-medium ${
                     size === figmaSelectedSize
                       ? 'border-black bg-gray-100 text-black' // Figma selected style
                       : 'border-gray-400 text-gray-500 hover:border-black hover:text-black'
                   }`}
                 >
                   {size}
                 </button>
               ))}
             </div>
           </div>

           <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-4">
             <button className="flex-1 bg-blue-900 text-white rounded-full px-6 py-3 text-base font-semibold hover:bg-blue-800 transition-colors text-center">
               Buy now
             </button>
             <button
                className="flex-1 border border-blue-900 text-blue-900 rounded-full px-6 py-3 text-base font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                onClick={() => cart.addToCart(product)} // Add to cart logic here
              >
               <AddIcon />
               <span>Add to cart</span>
             </button>
             {/* Chat Button - Figma Style */}
             <button className="border border-blue-900 rounded-full p-3 text-blue-900 hover:bg-blue-50 transition-colors">
                <ChatIcon />
             </button>
           </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12 lg:mt-16">
         <div className="border-b border-gray-300 flex space-x-0 bg-gray-100 rounded-full p-1 max-w-md">
             {/* Adjust tab styling to match Figma */}
             <button className="flex-1 bg-blue-900 text-white rounded-full py-2 px-4 text-sm font-medium" aria-current="page">
               Details
             </button>
             <button className="flex-1 text-gray-600 hover:text-black rounded-full py-2 px-4 text-sm font-medium">
               Review
             </button>
             <button className="flex-1 text-gray-600 hover:text-black rounded-full py-2 px-4 text-sm font-medium whitespace-nowrap">
               Similar products
             </button>
         </div>
         <div className="mt-6 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
           {/* Use Figma description */}
           <p>{figmaDescription}</p>
         </div>
      </div>
    </div>
  );
};

export default DetailPage;