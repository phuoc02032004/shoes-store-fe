import React from "react";
import SearchBar from "@/components/home/SearchBar";
import ProductList from "@/components/home/ProductList";
import { getProducts,  } from "@/api/product";
import { getCategories } from "@/api/category";
import { Product, Category } from "@/types/products";

export default async function Slipon() {
    let menProducts: Product[] = [];
    let kidProducts: Product[] = [];
    let womenProducts: Product[] = [];
    let error: string | null = null;

    try {
        const categories: Category[] = await getCategories();

        const menCategoryId = categories.find(cat => cat.name === "Man Sandals")?.id;
        const kidCategoryId = categories.find(cat => cat.name === "Kid Sandals")?.id;
        const womenCategoryId = categories.find(cat => cat.name === "Women Sandals")?.id;

        const productPromises: Promise<{ data: Product[] }>[] = [];

        if (menCategoryId) {
            productPromises.push(getProducts({ category: menCategoryId }));
        } else {
             console.warn("Men Sandals category ID not found");
             productPromises.push(Promise.resolve({ data: [] }));
        }

        if (kidCategoryId) {
            productPromises.push(getProducts({ category: kidCategoryId }));
        } else {
             console.warn("Kid Sandals category ID not found");
             productPromises.push(Promise.resolve({ data: [] }));
        }

        if (womenCategoryId) {
            productPromises.push(getProducts({ category: womenCategoryId }));
        } else {
            console.warn("Women Sandals category ID not found (used for Girl section)");
             productPromises.push(Promise.resolve({ data: [] }));
        }

        const results = await Promise.all(productPromises);

        menProducts = results[0]?.data || [];
        kidProducts = results[1]?.data || [];
        womenProducts = results[2]?.data || [];

    } catch (err) {
        console.error("Failed to fetch sneaker data:", err);
        error = "Could not load products at this time. Please try again later.";
        menProducts = [];
        kidProducts = [];
        womenProducts = [];
    }

    return (
        <main className=" w-full bg-white items-center justify-center ">
            <SearchBar />

            {error && (
                <div className="text-center text-red-600 py-6 px-4">{error}</div>
            )}

            {!error && (
                <>
                    {menProducts.length > 0 && (
                        <>
                            <div className="bg-[#F1F1F1] backdrop-blur-sm flex items-center justify-center mx-auto w-4/5 rounded-full text-3xl font-medium text-[#1F3E97] p-8 mt-4 mb-4 text-center ">
                                Men Sandals
                            </div>
                            <div className="w-full flex justify-center flex-wrap mt-4 px-4 md:px-8 lg:px-12">
                                <ProductList
                                    products={menProducts}
                                />
                            </div>
                        </>
                    )}

                    {kidProducts.length > 0 && (
                        <>
                            <div className="bg-[#F1F1F1] backdrop-blur-sm flex items-center justify-center mx-auto w-4/5 rounded-full text-3xl font-medium text-[#1F3E97] p-8 mt-4 mb-4 text-center ">
                                Kid Sandals
                            </div>
                            <div className="w-full flex justify-center flex-wrap mt-4 px-4 md:px-8 lg:px-12">
                                <ProductList
                                    products={kidProducts}
                                />
                            </div>
                        </>
                    )}

                    {womenProducts.length > 0 && (
                        <>
                            <div className="bg-[#F1F1F1] backdrop-blur-sm flex items-center justify-center mx-auto w-4/5 rounded-full text-3xl font-medium text-[#1F3E97] p-8 mt-4 mb-4 text-center ">
                                Girl Sandals
                            </div>
                            <div className="w-full flex justify-center flex-wrap mt-4 px-4 md:px-8 lg:px-12">
                                <ProductList
                                    products={womenProducts}
                                />
                            </div>
                        </>
                    )}

                    {menProducts.length === 0 && kidProducts.length === 0 && womenProducts.length === 0 && !error && (
                         <div className="text-center text-gray-500 py-10">No sandals found in these categories.</div>
                    )}
                </>
            )}
        </main>
    );
}