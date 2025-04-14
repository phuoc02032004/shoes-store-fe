import Hero from '@/components/home/Hero';
import PopularProducts from '@/components/home/PopularProducts';
import OnSaleProducts from '@/components/home/OnSaleProducts';

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularProducts />
      <OnSaleProducts />
    </main>
  );
}
