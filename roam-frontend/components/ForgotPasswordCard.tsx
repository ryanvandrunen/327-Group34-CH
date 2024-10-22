import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ForgotPasswordCardProps {
    onSubmit: (email: string) => void; // Prop to handle form submission
}

const ForgotPasswordCard: React.FC<ForgotPasswordCardProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState(''); // State for email input
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit(email); // Call the onSubmit prop with the email
    };
    const handleCancel = () => {
        router.back();
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-300">
            <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-5 ">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    className="mt-2 block w-full rounded-lg shadow-md py-2 px-4 border border-gray-200"
                    placeholder="Enter your email"
                />
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    type="button" // Change type to "button" for the cancel button
                    className="bg-white text-gray-400 py-2 px-4  rounded-lg"
                    onClick={handleCancel} // Add a handler for the cancel action
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-[#FF9A2A] text-white  py-2 px-4 shadow-lg rounded-lg"
                >
                    Reset Password
                </button>
            </div>
        </form>
    );
};

export default ForgotPasswordCard;