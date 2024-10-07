'use client'
import React, { useEffect } from 'react';
import Link from "next/link"
import Image from "next/image"
import Logo from "../assests/image/Logo.png"
import { usePathname } from 'next/navigation'; // Use this hook for getting the current pathname

export default function Footer() {
    const pathname = usePathname(); // Get the current pathname
    const isActive = (path) => pathname === path ? 'text-[#FFDE7C]' : 'text-white';

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = () => {
            if (typeof Tally !== 'undefined') {
                Tally.loadEmbeds();
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <>
            <div className='bg-[#ECEFFE] px-4 z-[111]'>
                <div className='container pb-10'>
                    <i><p className='text-3xl md:text-5xl pt-8 md:pt-16 font-medium text-center'>
                        Ink in your Inbox
                    </p></i>
                    <p className='w-full lg:w-[55%]  mx-auto text-center pt-5 md:pt-10 pb-6 md:pb-10 text-lg md:text-lg'>
                        Would you be interested in updates about upcoming books, events, and other news
                        from us? We are a lean startup and don’t have the bandwidth to spam your inbox.
                        And you can always easily unsubscribe.
                    </p>

                    <div className='w-[50%] max-w-[405px] flex justify-center mx-auto '>
                        <iframe
                            data-tally-src="https://tally.so/embed/n9vA8X?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                            loading="lazy"
                            width="100%"
                            height="200"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                            title="Ink in your Inbox"
                        ></iframe>
                    </div>
                </div>
            </div>

            <nav className="relative bg-[#241b6d] text-white flex flex-col items-center justify-center py-10 footer-bg-image z-[111]">
                {/* PNG Wave Background */}
                <div className="absolute inset-0 footer-bg"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                    <Link href="/">
                    <Image src={Logo} alt="Logo" width={150} height={100} className="mb-5" />
                     </Link>
                    <h3 className="text-xl md:text-2xl font-medium mb-6 text-center">
                        Publishing, <i className="font-light">with a difference.</i>
                    </h3>

                    <ul className="flex flex-wrap space-x-4 md:space-x-6 justify-center text-sm md:text-xl pt-5 pb-6 font-light">
                        <li><a href="https://www.instagram.com/bluone.ink/" target="blank">INSTAGRAM</a></li>
                        <li><a href="https://x.com/BluOneInk" target="blank">X (TWITTER)</a></li>
                        <li><a href="https://www.linkedin.com/company/bluoneink/" target="blank">LINKEDIN</a></li>
                        <li><a href="https://www.youtube.com/channel/UC2hOgss9-N9Yx5c3DuyIU0Q" target="blank">YOUTUBE</a></li>
                    </ul>

                    <ul className="flex flex-wrap gap-2 justify-center text-sm md:text-2xl space-x-4 md:space-x-8 pt-1 font-normal">
                        <li className="hover:underline"><Link href="/comingsoon">ABOUT</Link></li>
                        <li className="hover:underline list-disc"><Link href="/comingsoon">EVENTS</Link></li>
                        <li className="hover:underline list-disc"><Link href="/comingsoon">BLOGS</Link></li>
                        <li className="hover:underline list-disc"><Link href="/comingsoon">GALLERY</Link></li>
                        <li className="hover:underline list-disc"><Link href="/comingsoon">MEDIA KIT</Link></li>
                        <li className="hover:underline list-disc"><Link href="/comingsoon">CATALOGUE</Link></li>
                        <li className="hover:underline list-disc"><Link href="/comingsoon">CONTACT</Link></li>
                    </ul>

                    <ul className="  flex flex-wrap justify-center text-xs md:text-base font-light pt-8 mb-3 space-x-4 md:space-x-6">
                        <li className={`hover:text-[#FFDE7C] ${isActive('#')} text-xs`}><Link href="/comingsoon">SITEMAP</Link></li>
                        <li className={`hover:text-[#FFDE7C] ${isActive('/termsandcondition')} text-xs`}><Link href="/termsandcondition">TERMS & CONDITIONS</Link></li>
                        <li className={`hover:text-[#FFDE7C] ${isActive('/privacypolicy')} text-xs`}><Link href="/privacypolicy">PRIVACY POLICY</Link></li>
                        <li className={`hover:text-[#FFDE7C] ${isActive('/disclaimer')} text-xs`}><Link href="/disclaimer">DISCLAIMER</Link></li>
                    </ul>

                    <span className="text-md md:text-base font-light pb-4 text-center">
                        ©️ 2024. All Rights Reserved. BluOne Ink Pvt. Ltd.
                    </span>
                </div>
            </nav>
        </>
    )
}
