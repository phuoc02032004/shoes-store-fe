"use client";

import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const footerColumns = [
    {
      title: 'Company',
      links: [
        { name: 'About us', href: '/about' },
        { name: 'Our store', href: '/store' },
        { name: 'News', href: '/news' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Help', href: '/help' },
        { name: 'Terms', href: '/terms' },
      ],
    },
    {
      title: 'Social Media',
      links: [
        {
          name: 'Facebook',
          href: '#',
          icon: <Facebook className="w-4 sm:w-5 h-4 sm:h-5" />,
        },
        {
          name: 'Tiktok',
          href: '#',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 sm:w-5 h-4 sm:h-5">
              <path d="M16.6 5C16.4 5 16.2 4.9 16.2 4.8C16 4.3 15.8 3.8 15.7 3.4C15.6 3 15.5 2.6 15.5 2.1H12.8V12.5C12.8 13.3 12.6 14 12.1 14.6C11.6 15.2 11 15.5 10.2 15.5C9.5 15.5 8.9 15.3 8.3 14.8C7.8 14.3 7.5 13.7 7.5 13C7.5 12.3 7.7 11.7 8.2 11.2C8.7 10.7 9.3 10.4 10 10.4C10.3 10.4 10.5 10.4 10.7 10.5V7.8C10.5 7.7 10.2 7.7 10 7.7C8.7 7.7 7.6 8.2 6.6 9.1C5.6 10 5.2 11.1 5.2 12.5C5.2 13.8 5.6 15 6.5 15.9C7.4 16.9 8.5 17.4 9.9 17.4C11.3 17.4 12.5 16.9 13.4 15.8C14.3 14.7 14.8 13.5 14.8 12V7.3C15.4 7.7 16.1 8.1 16.9 8.4C17.7 8.7 18.5 8.9 19.4 8.9V6.2C18.7 6.2 18 6 17.3 5.6C16.9 5.3 16.7 5.1 16.6 5Z" fill="currentColor"/>
            </svg>
          ),
        },
        {
          name: 'Instagram',
          href: '#',
          icon: <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />,
        },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: 'Sukaasih, Kota Tangerang, Banten 15111', href: '#' },
        { name: 'Phone : 0976444677', href: 'tel:0976444677' },
        { name: 'Mail : adminvantela@domain.com', href: 'mailto:adminvantela@domain.com' },
      ],
    },
  ];

  return (
    <footer className="bg-[#1F3E97] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="py-12 sm:py-16 lg:py-20">
          {/* Logo and Newsletter */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-12 lg:mb-16">
            {/* Logo */}
            <h2 className="font-pacifico text-2xl bg-[#1F3E97] sm:text-3xl lg:text-[40px] leading-[1.756]">vantela</h2>
            
            {/* Newsletter Form */}
            <div className="w-full lg:w-auto">
              <div className="flex items-center gap-4 sm:gap-20 px-4 sm:px-8 py-3 sm:py-4 bg-[#F4F4F4] rounded-[48px]">
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter ..."
                  className="w-full lg:w-[320px] bg-transparent text-xs sm:text-sm text-[#464646] outline-none"
                />
                <button className="flex shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" stroke="#1F3E97" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className=" bg-[#1F3E97] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-40">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-6 sm:space-y-8">
                <h3 className="text-xl sm:text-2xl font-medium">{column.title}</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="flex items-center gap-2 text-sm sm:text-base hover:opacity-80 transition-opacity"
                      >
                        {'icon' in link && link.icon}
                        <span className="leading-[1.21]">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#18378F] py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <p className="text-xs sm:text-sm text-center leading-[1.21]">Copyright 2023. All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;