import React from 'react';
import Facebook from "../../assets/facebook.png";
import WhatsApp from "../../assets/whatsapp.png";
import LinkedIn from "../../assets/linkedin.png";
import logo from '../../assets/solverous2.png';

function Footer() {
    return (
        <footer className='bg-[#004D8C] flex flex-col py-14 space-y-14'>
            <div className=' flex flex-col md:flex-col lg:flex-row body_margin justify-between items-start space-y-14 md:space-y-10 lg:space-y-0 '>
                {/* RIGHT SIDE */}
                <div className='space-y-8 w-fit md:w-full lg:w-fit'>
                    {/* LOGO AND DESCRIPTION */}
                    <div className=' flex flex-col md:flex-row lg:flex-col space-y-1 md:space-y-3 space-x-0 md:space-x-6 lg:space-x-0 w-full '>
                        <div className=" w-[6rem] md:w-[7.5rem] h-16 md:h-16 "><img src={logo} alt="Automation Icon" /></div>
                        <p className='text-white text-xl md:text-[1rem] w-full md:w-full lg:w-[60%]'>Empowering Your Business with Expert Solutions and Insights</p>
                    </div>
                    {/* SOCMED ICONS */}
                    <div className=" flex flex-row space-x-3 w-fit ">
                        <a href="https://www.facebook.com/profile.php?id=61573101443685" target="_blank" rel="noopener noreferrer" className=" footer_icons hover:bg-[#007EE6] hover:border-collapse transition-all ease-in-out active:scale-95 "><img src={Facebook} alt="Automation Icon" /></a>
                        <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className=" footer_icons hover:bg-[#007EE6] hover:border-collapse transition-all ease-in-out active:scale-95 "><img src={WhatsApp} alt="Automation Icon" /></a>
                        <a href="https://www.linkedin.com/company/solverous" target="_blank" rel="noopener noreferrer" className=" footer_icons hover:bg-[#007EE6] hover:border-collapse transition-all ease-in-out active:scale-95 "><img src={LinkedIn} alt="Automation Icon" /></a>
                    </div>
                </div>
                <div className='flex flex-row text-white space-x-0 md:space-x-6 '>
                    <div className=' flex flex-col md:flex-row space-y-10 md:space-y-0 space-x-0 md:space-x-14 lg:space-x-16 '>
                        {/* PRODUCTS LINK */}
                        <div className='w-fit space-y-4'>
                            <h5 className='h5_title'>Products</h5>
                            <ul className="space-y-3">
                                <li><a href="https://luna.solverous.com/" target="_blank" rel="noopener noreferrer" className="hover:underline p_blue_bg">Luna AI</a></li>
                                <li><span className='p_blue_bg'>DTR System</span></li>
                                <li><span className='p_blue_bg'>Payroll System</span></li>
                            </ul>
                        </div>
                        {/* SERVICES LINK */}
                        <div className=' w-[75%] md:w-[50%] space-y-4'>
                            <h5 className='h5_title'>Services</h5>
                            <ul className="space-y-3">
                                <li><a href="#services" className="hover:underline p_blue_bg">Modern Website Development</a></li>
                                <li><a href="#services" className="hover:underline p_blue_bg">Cloud & Infrastructure</a></li>
                                <li><a href="#services" className="hover:underline p_blue_bg">AI & Automation</a></li>
                                <li><a href="#services" className="hover:underline p_blue_bg">Digital Marketing</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='  flex flex-col md:flex-row space-y-10 md:space-y-0 space-x-0 md:space-x-16 '>
                        {/* COMPANY INFO LINK */}
                        <div className='w-fit space-y-4'>
                            <h5 className='h5_title'>Company</h5>
                            <ul className="space-y-3">
                                <li><a href="#home" className="hover:underline p_blue_bg">Home</a></li>
                                <li><a href="#services" className="hover:underline p_blue_bg">Services</a></li>
                                <li><a href="#clients" className="hover:underline p_blue_bg">Clients</a></li>
                                <li><a href="#about-us" className="hover:underline p_blue_bg">About Us</a></li>
                            </ul>
                        </div>
                        {/* INFORMATION LINK */}
                        <div className='w-fit space-y-4'>
                            <h5 className='h5_title'>Information</h5>
                            <ul className="space-y-3">
                                <li><a href="#faqs" className="hover:underline p_blue_bg">FAQs</a></li>
                                <li><a href="#contact-us" className="hover:underline p_blue_bg">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* LINE */}
            <div className='space-y-3'>
                <div className=' border-white border border-b-0 body_margin'></div>
                <div className=' body_margin flex flex-col md:flex-row justify-between space-y-4 md:space-y-0'>
                    <p className='p_blue_bg'>© Solverous 2026. All rights reserved. </p>
                    <div className='flex flex-row space-x-4'>
                        <p className='p_blue_bg'>Privacy & Policy</p>
                        <div className='border-white border border-l-0 body_margin'></div>
                        <p className='p_blue_bg'>Terms & Condition</p>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
