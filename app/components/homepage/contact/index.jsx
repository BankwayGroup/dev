// @flow strict
'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import TestimonialSlider from "@/app/components/portfolio/TestimonialSlider";
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
import Image from 'next/image';

const skills = [
  { name: 'JavaScript', level: 95 },
  { name: 'React', level: 90 },
  { name: 'Next.js', level: 88 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 80 },
];

const colors = ['#16f2b3', '#1a1443', '#facc15', '#3b82f6', '#ec4899'];

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      {/* Decorative Label */}
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>

      {/* Bar Chart Section */}
      <div className="mb-20 bg-[#0e0c2b] p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Tech Stack Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skills}>
            <XAxis dataKey="name" tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            <Tooltip />
            <Bar dataKey="level" radius={[10, 10, 0, 0]}>
              {skills.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Contact Form + Socials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />

        {/* Right column: Buy Me a Coffee + Social Icons */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* QR Code & Button */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Image
              src="https://i.ibb.co/DXwdPKd/bmc-qr.png"
              alt="Buy Me a Coffee QR Code"
              width={150}
              height={150}
              className="rounded-md shadow-md"
            />
            <a
              href="https://www.buymeacoffee.com/DevZahir"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=DevZahir&button_colour=1a1443&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00"
                alt="Buy Me a Coffee"
                className="w-auto h-12 hover:scale-105 transition-all duration-300"
              />
            </a>
          </div>

          {/* Social Icons */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-5 lg:gap-10">
            <Link target="_blank" href="https://github.com/devzahirx3/DevZahir">
              <IoLogoGithub className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer" size={48} />
            </Link>
            <Link target="_blank" href="https://t.me/devzahirbot?start=start">
              <SiTelegram className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer" size={48} />
            </Link>
            <Link target="_blank" href="https://www.facebook.com/share/1gjjhoY2Vn/?mibextid=wwXIfr">
              <FaFacebook className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer" size={48} />
            </Link>
            <Link target="_blank" href="https://x.com/devzahirjs">
              <FaXTwitter className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer" size={48} />
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials section under contact form */}
      <div className="mt-20">
        <TestimonialSlider />
      </div>
    </div>
  );
}

export default ContactSection;
