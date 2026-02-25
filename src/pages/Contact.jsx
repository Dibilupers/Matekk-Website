import emailjs from 'emailjs-com';
import { useState } from 'react';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('clikced')
        setLoading(true);
        setStatus('');

        const serviceID = 'service_dyfx6bh';
        const templateID = 'template_eks2zfp';
        const userID = 'G6UMIDUlrYExt7MqJ';

        emailjs.sendForm(serviceID, templateID, e.target, userID)
            .then((result) => {
                console.log('Success:', result.text);
                setStatus('Message sent successfully! 🎉');
                setLoading(false);
                e.target.reset();
            })
            .catch((error) => {
                console.error('Error:', error.text);
                setStatus('Failed to send message. Please try again.');
                setLoading(false);
            });
    };

    return (
        <form onSubmit={sendMessage} className="bg-gradient-to-b from-[#004D8C] to-[#027FE5] space-y-6 md:space-y-4 h-full w-full md:w-full lg:w-[50%] flex flex-col p-8 rounded-2xl">

            {/* Full Name */}
            <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                    <label htmlFor="name" className="label_style">
                        Full Name
                    </label>
                    <span className="text-red-400">*</span>
                </div>
                <input
                    id="name"
                    name="user_name"
                    type="text"
                    className="input_style"
                    required
                />
            </div>

            {/* Email & Phone */}
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex flex-col space-y-1 w-full">
                    <div className="flex items-center space-x-1">
                        <label htmlFor="email" className="label_style">
                            Email
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <input
                        id="email"
                        name="user_email"
                        type="email"
                        className="input_style"
                        required
                    />
                </div>

                <div className="flex flex-col space-y-1 w-full">
                    <div className="flex items-center space-x-1">
                        <label htmlFor="phone" className="label_style">
                            Mobile Number
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <input
                        id="phone"
                        name="user_phone"
                        type="tel"
                        className="input_style"
                        required
                    />
                </div>
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                    <label htmlFor="message" className="label_style">
                        Message
                    </label>
                    <span className="text-red-400">*</span>
                </div>
                <textarea
                    id="message"
                    name="message"
                    className="input_style h-[8rem] resize-none"
                    required
                />
            </div>

            {/* Status Message */}
            {status && (
                <p className={`text-center font-medium ${status.includes('Success') ? 'text-green-300' : 'text-red-300'}`}>
                    {status}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="bg-white text-[#007EE6] hover:bg-[#DDE7EF] py-3 px-[42.5%] md:py-2 md:px-[46%] rounded shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Sending..." : "Send"}
            </button>
        </form>
    );
}
