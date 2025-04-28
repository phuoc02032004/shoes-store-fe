import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Login } from '@/api/auth';

const SignInForm = () => {
  const [, setIsLoading] = React.useState(false);
  const [, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const [formdateta, setFormdateta] = React.useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate an API call
    try {
      // Replace with your actual sign-in logic
      const response = await Login(formdateta.email, formdateta.password);
      if (response.status === 200) {
        // Handle successful sign-in (e.g., redirect to dashboard)
        console.log('Sign-in successful:', response.data);
        router.push('/home'); // Redirect to dashboard or home page
        setIsLoading(false);
      }
      else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('Sign-in failed. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col  px-4 py-8 lg:px-8 w-auto">
      <div className="w-full items-center justify-center">
        <div className="grid w-full items-center justify-center grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
          <div className=''>
            <label htmlFor="email" className=" block text-[#1F3E97] text-sm font-semibold mb-2">
              Username or Email *
            </label>
            {/* Input Style: Frame 152:15 */}
            <input
              className="appearance-none border-none rounded-lg w-full py-[16px] px-[16px] text-[#858585] font-medium text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#1F3E97] bg-[#F1F1F1] placeholder-[#858585]" // Styles from Figma: bg, border-radius, padding, text style
              id="email"
              type="text"
              placeholder="Aziz sultan" // Placeholder from Figma Frame 152:15
              onChange={(e) => setFormdateta({...formdateta, email: e.target.value})}
            />
          </div>
          {/* Password Input */}
          <div>
            {/* Label Style: style_8OQPQO */}
            <label htmlFor="password" className="block text-[#1F3E97] text-sm font-semibold mb-2">
              Password *
            </label>
            {/* Input Style: Frame 152:8 */}
            <input
              className="appearance-none border-none rounded-lg w-full py-[16px] px-[16px] text-[#858585] font-medium text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#1F3E97] bg-[#F1F1F1] placeholder-[#858585]" // Styles from Figma: bg, border-radius, padding, text style
              id="password"
              type="password"
              placeholder="Inimail@mail.com" // Placeholder from Figma Frame 152:8
              onChange={(e) => setFormdateta({...formdateta, password: e.target.value})}
            />
          </div>
        </div>

        {/* Sign In Button - Frame 156:201 */}
        <div className="mb-6 mt-8"> {/* Adjusted margins */}

          <button
            className="bg-[#1F3E97] hover:bg-blue-800 text-white text-xl font-semibold py-[16px] px-[64px] rounded-lg focus:outline-none focus:shadow-outline w-full" // Styles from Figma: bg, text style, padding, border-radius. Using w-full instead of fixed width.
            type="submit"
          >
            Sign In
          </button>
        </div>

        {/* Links Row - Combined elements 160:1585 and 160:1586 */}
        <div className="flex justify-between items-center mb-10 text-xs font-semibold"> {/* Adjusted mb and text size */}
            {/* Forgot Password: style_JJ6U6A */}
            <Link
                className="text-[#1F3E97] hover:text-blue-800"
                href="#"
            >
                Forgot Password ?
            </Link>
            {/* Don't have account: style_TRK9RZ */}
            <p className="text-[#000000]">
                Don &apos; t have an account yet ?
                {/* Sign Up link kept from previous context, styled like Forgot Password */}
                <Link href="/signup" className="font-semibold text-[#1F3E97] hover:text-blue-800 ml-1">
                Sign Up
                </Link>
            </p>
        </div>


        {/* "Or" Separator - Frame 163:34 */}
        <div className="my-10 flex items-center justify-center"> {/* Adjusted margins */}
             {/* Or Text: style_TRK9RZ (adjusted alignment) */}
            <span className="text-xs font-semibold text-[#000000]">Or</span>
        </div>

        {/* Social Sign In Buttons - Frame 163:35, 163:44, 163:50 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"> {/* Adjusted gap */}
            {/* Google Button: Group 163:35 */}
            <button className="w-full sm:w-auto flex items-center justify-center bg-white border border-[#1F3E97] text-[#1F3E97] font-semibold text-[15px] py-2.5 px-5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1F3E97] whitespace-nowrap"> {/* Styles from Figma: bg, border, text style, border-radius */}
                <Image src="/images/auth/signin/google.svg" alt="Google" width={20} height={20} className="mr-2" /> {/* Icon from Figma */}
                Sign Up with Google
            </button>
            {/* Facebook Button: Frame 163:44 */}
            <button className="w-full sm:w-auto flex items-center justify-center bg-white border border-[#1F3E97] text-[#1F3E97] font-semibold text-[15px] py-2.5 px-5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1F3E97] whitespace-nowrap"> {/* Styles from Figma: bg, border, text style, border-radius */}
                <Image src="/images/auth/signin/facebook.svg" alt="Facebook" width={20} height={20} className="mr-2" /> {/* Icon from Figma */}
                Sign Up with Facebook
            </button>
            {/* Phone Button: Frame 163:50 */}
             <button className="w-full sm:w-auto flex items-center justify-center bg-white border border-[#1F3E97] text-[#1F3E97] font-semibold text-[15px] py-2.5 px-5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1F3E97] whitespace-nowrap"> {/* Styles from Figma: bg, border, text style, border-radius */}
                <Image src="/images/auth/signin/phone.svg" alt="Phone" width={20} height={20} className="mr-2" /> {/* Icon from Figma */}
                Sign In with Number
            </button>
        </div>

      </div>
  </form>
    );
};

export default SignInForm;
