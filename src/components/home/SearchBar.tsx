import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-[280px] sm:max-w-lg lg:max-w-3xl">
            <div className="flex items-center gap-4 sm:gap-8 lg:gap-[320px] px-4 sm:px-6 lg:px-10 py-3 sm:py-4 bg-[#F4F4F4] rounded-[48px]">
              <input
                type="text"
                placeholder="Search ..."
                className="w-full bg-transparent text-xs sm:text-sm text-gray-500 outline-none"
              />
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;