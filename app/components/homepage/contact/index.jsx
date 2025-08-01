// @flow strict
'use client';

import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub, IoMdCall } from 'react-icons/io';
import { MdAlternateEmail } from 'react-icons/md';
import { SiTelegram } from 'react-icons/si';
import ContactForm from './contact-form';
import Image from 'next/image'; // Make sure this is at the top

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

<ContactForm />

<div className="lg:w-3/4">
  {/* Email Row */}
  <p className="text-sm md:text-xl flex items-center gap-3">
    <a href={`mailto:${personalData.email}`} target="_blank" rel="noopener noreferrer">
      <Image
        src="https://i.ibb.co/1Y2RRWqs/my-image.png"
        alt="Contact Icon"
        width={36}
        height={36}
        className="rounded-full hover:scale-110 transition-all duration-300 cursor-pointer"
      />
    </a>
    <span>{personalData.email}</span>
  </p>



          {/* Social Icons */}
          <div className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10">
            <Link target="_blank" href="https://github.com/devzahirx3/DevZahir">
              <IoLogoGithub
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href="https://t.me/devzahirbot?start=start">
              <SiTelegram
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href="https://www.facebook.com/share/1gjjhoY2Vn/?mibextid=wwXIfr">
              <FaFacebook
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href="https://x.com/devzahirjs">
              <FaXTwitter
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
