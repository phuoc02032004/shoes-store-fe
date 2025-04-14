import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 150,
    image: "/images/products/shoe-1.png",
    category: "Running"
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 180,
    image: "/images/products/shoe-2.png",
    category: "Running"
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 120,
    image: "/images/products/shoe-3.png",
    category: "Casual"
  },
  {
    id: 4,
    name: "New Balance 574",
    price: 90,
    image: "/images/products/shoe-4.png",
    category: "Lifestyle"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground">Discover our most popular shoes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover p-4 group-hover:scale-105 transition-transform"
                  />
                  <Badge className="absolute top-4 right-4">
                    {product.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-primary font-bold">${product.price}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;