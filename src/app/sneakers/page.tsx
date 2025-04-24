import React from "react";
import SearchBar from "@/components/home/SearchBar";
import ProductList from "@/components/home/ProductList";
import { productsSandalsMock, productsKidSandalsMock } from "@/mocks/productmock";

export default function Sneakers() {

return (
    <main className=" w-full bg-white  items-center justify-center ">
        <SearchBar />   
        <div className="bg-[#F1F1F1] backdrop-blur-sm flex items-center justify-center mx-auto w-4/5 rounded-full text-3xl font-medium text-[#1F3E97] p-8 mt-4 mb-4 text-center ">
            Men Sandals
        </div>
        <div className="w-full flex justify-center flex-wrap mt-4">
            <ProductList 
            products={productsSandalsMock}
            />
        </div>
        <div className="bg-[#F1F1F1] backdrop-blur-sm flex items-center justify-center mx-auto w-4/5 rounded-full text-3xl font-medium text-[#1F3E97] p-8 mt-4 mb-4 text-center ">
            Kid Sandals
        </div>
        <div className="w-full flex justify-center flex-wrap mt-4">
            <ProductList 
            products={productsKidSandalsMock}
            />
        </div>
        <div className="bg-[#F1F1F1] backdrop-blur-sm flex items-center justify-center mx-auto w-4/5 rounded-full text-3xl font-medium text-[#1F3E97] p-8 mt-4 mb-4 text-center ">
            Girl Sandals
        </div>
        <div className="w-full flex justify-center flex-wrap mt-4">
            <ProductList 
            products={productsSandalsMock}
            />
        </div>
    </main>
    );
}