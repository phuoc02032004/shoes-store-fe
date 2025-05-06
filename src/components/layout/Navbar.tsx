"use client";

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '../ui/button'; 
import { useRouter } from 'next/navigation';

import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const Router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Sneakers', href: '/sneakers' }, 
    { name: 'Slip On', href: '/slipon' },
    { name: 'Sandals', href: '/sandals' },
    { name: 'Other', href: '/other' },
  ];

  const handleSignIn = () => {
    Router.push('/signin');
  };

  const handleSignUp = () => {
    Router.push('/signup');
  }

  const handleCart = () => {
    Router.push('/cart');
  };

  const handleMe = () => {
    Router.push('/me');
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('token');
      setIsLoggedIn(!!authToken); 
    }
  }, []); 


  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <nav className="container mx-auto px-4 h-20">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="font-pacifico text-primary text-2xl">vantela</h1>
            <div className="w-2 h-2 rounded-full bg-primary" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>

          {/* Navigation Links - Desktop */}
          <ul className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`px-2 py-2 text-sm ${
                    pathname === item.href
                      ? 'font-bold text-primary' 
                       : 'text-gray-500 hover:text-gray-900'
                   }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <button className="w-6 h-6 text-primary">
                  <User className="w-full h-full" onClick={handleMe}/>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-primary text-primary hover:bg-primary/5"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full bg-primary text-white hover:bg-primary/90"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              <button className="w-6 h-6 text-primary">
                <Heart className="w-full h-full" strokeWidth={1.5} />
              </button>
              <button onClick={handleCart} className="w-6 h-6 text-primary">
                <ShoppingBag className="w-full h-full" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-20 bg-white z-40 lg:hidden">
            <div className="container mx-auto px-4 py-6">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-2 py-3 text-lg text-center ${
                        pathname === item.href
                          ? 'font-bold text-primary' // Active link style
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Action Buttons */}
              <div className="mt-6 flex flex-col gap-4 items-center">
                {isLoggedIn ? (
                  <div className="flex justify-center">
                    <button className="w-6 h-6 text-primary">
                      <User className="w-full h-full" onClick={handleMe}/>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full rounded-full border-primary text-primary hover:bg-primary/5"
                      onClick={handleSignIn}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-primary text-white hover:bg-primary/90"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
                <button className="w-6 h-6 text-primary">
                  <Heart className="w-full h-full" strokeWidth={1.5} />
                </button>
                <button onClick={handleCart} className="w-6 h-6 text-primary">
                  <ShoppingBag className="w-full h-full" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;