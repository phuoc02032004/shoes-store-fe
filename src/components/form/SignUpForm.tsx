import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Register } from '@/api/auth';
import VerifyForm from './VerifyForm';

const SignUpForm = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [, setError] = React.useState<string | null>(null);
    const [showVerifyForm, setShowVerifyForm] = React.useState(false);
    const [registeredEmail, setRegisteredEmail] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const router = useRouter();

    const [formdata, setFormdata] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (formdata.password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await Register(formdata.name, formdata.email, formdata.password);
            if (response.data.success) {
                console.log('Sign-up successful:', response.data);
                setRegisteredEmail(formdata.email);
                setShowVerifyForm(true);
                setIsLoading(false);
            } else {
                setError(response.data.message || 'Invalid credentials. Please try again.');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Sign-up error:', error);
            setError('Sign-up failed. Please try again.');
            setIsLoading(false);
        }
    }

    const handleVerificationSuccess = () => {
        router.push('/home');
    };

    return (
        <>
            {showVerifyForm && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8">
                  <VerifyForm
                    email={registeredEmail}
                    onVerificationSuccess={handleVerificationSuccess}
                    onClose={() => setShowVerifyForm(false)}
                  />
                </div>
              </div>
            )}

            {!showVerifyForm && (
                <form onSubmit={handleSubmit} className="flex flex-col  px-4 py-8 lg:px-8 w-auto">
                    <div className="w-full items-center justify-center">
                        <div className="grid w-full items-center justify-center grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
                            <div className=''>
                                <label htmlFor="name" className=" block text-[#1F3E97] text-sm font-semibold mb-2">
                                    Full Name *
                                </label>
                                <input
                                    className="appearance-none border-none rounded-lg w-full py-[16px] px-[16px] text-[#858585] font-medium text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#1F3E97] bg-[#F1F1F1] placeholder-[#858585]" // Styles from Figma: bg, border-radius, padding, text style
                                    id="name"
                                    type="text"
                                    placeholder="Nguyen Hong Phuoc"
                                    value={formdata.name}
                                    onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
                                />
                            </div>

                            <div className=''>
                                <label htmlFor="email" className=" block text-[#1F3E97] text-sm font-semibold mb-2">
                                    Email *
                                </label>
                                <input
                                    className="appearance-none border-none rounded-lg w-full py-[16px] px-[16px] text-[#858585] font-medium text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#1F3E97] bg-[#F1F1F1] placeholder-[#858585]" // Styles from Figma: bg, border-radius, padding, text style
                                    id="email"
                                    type="text"
                                    placeholder="2254810017@vaa.edu.vn"
                                    value={formdata.email}
                                    onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                                />
                            </div>

                            <div className=''>
                                <div>
                                    <label htmlFor="password" className="block text-[#1F3E97] text-sm font-semibold mb-2">
                                        Password *
                                    </label>
                                    <input
                                        className="appearance-none border-none rounded-lg w-full py-[16px] px-[16px] text-[#858585] font-medium text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#1F3E97] bg-[#F1F1F1] placeholder-[#858585]" // Styles from Figma: bg, border-radius, padding, text style
                                        id="password"
                                        type="password"
                                        placeholder="Thuthoi#143"
                                        value={formdata.password}
                                        onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className=''>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-[#1F3E97] text-sm font-semibold mb-2">
                                        Confirm Password *
                                    </label>
                                    <input
                                        className="appearance-none border-none rounded-lg w-full py-[16px] px-[16px] text-[#858585] font-medium text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#1F3E97] bg-[#F1F1F1] placeholder-[#858585]" // Styles from Figma: bg, border-radius, padding, text style
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Thuthoi#143"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            checkbox
                        </div>

                        <div className="mb-6 mt-8">
                            <button
                                className="bg-[#1F3E97] hover:bg-blue-800 text-white text-xl font-semibold py-[16px] px-[64px] rounded-lg focus:outline-none focus:shadow-outline w-full" // Styles from Figma: bg, border, text style, padding, border-radius. Using w-full instead of fixed width.
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
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
                                Don &apos;t have an account yet ?
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
            )}
        </>
    );
};

export default SignUpForm;
