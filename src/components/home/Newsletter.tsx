import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="bg-primary py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">
          {/* Logo and Newsletter Form */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-[655px] w-full">
            {/* Logo */}
            <h2 className="font-pacifico text-3xl sm:text-4xl text-white">vantela</h2>
            
            {/* Newsletter Form */}
            <div className="w-full lg:w-auto">
              <div className="flex items-center gap-4 sm:gap-8 lg:gap-20 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-[#F4F4F4] rounded-[48px]">
               
                <button className="flex shrink-0">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;