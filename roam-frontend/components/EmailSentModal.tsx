import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";

interface ResetPasswordModalProps {
    email: string;
    onClose: () => void;
}

{/* Modal Indicating Password Reset Email has been sent */ }
const EmailSentModal: React.FC<ResetPasswordModalProps> = ({ email, onClose }) => {
    const router = useRouter();
    const handleResend = () => {
        router.push("/");
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Reset Email Sent</h2>
                <p className="mb-4">
                    A password reset email has been sent to {email}.
                    <span className="text-[#FF9A2A] cursor-pointer ml-1" onClick={handleResend}> {/* Resend Logic to be setup in A3 as part of backend */}
                        Resend or Change Email.
                    </span>
                </p>
                <div className="flex justify-end mb-4"> {/* Parent container with flex and justify-end */}
                    <button
                        onClick={onClose}
                        className="flex items-center bg-white text-[#FF9A2A] rounded-md"
                    >
                        <span className="mr-1">Sign In</span> {/* Text for the button */}
                        <ArrowRight className="h-4 w-6 text-[#FF9A2A]" /> {/* Right arrow icon */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailSentModal;