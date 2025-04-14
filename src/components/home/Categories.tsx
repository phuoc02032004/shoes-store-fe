import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../ui/card';

interface Category {
  id: number;
  name: string;
  image: string;
  itemCount: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Running",
    image: "/images/categories/running.png",
    itemCount: 42
  },
  {
    id: 2,
    name: "Casual",
    image: "/images/categories/casual.png",
    itemCount: 36
  },
  {
    id: 3,
    name: "Sport",
    image: "/images/categories/sport.png",
    itemCount: 28
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground">Find the perfect shoes for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link href={`/category/${category.name.toLowerCase()}`} key={category.id}>
              <Card className="group cursor-pointer overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.itemCount} items</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;