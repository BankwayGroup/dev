// @flow strict
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
import Projects from '../github/Projects';

const skills = [
  { name: 'JavaScript', percentage: 94.8 },
  { name: 'SCSS', percentage: 5.2 },
];

const barColors = {
  JavaScript: '#f1e05a', // GitHub JS yellow
  SCSS: '#c6538c',        // SCSS pink
};


function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
          <section id="projects" className="mt-20">
  <Projects />
</section>
          {/* Sleek GitHub-style skill bars */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-16 bg-[#0e0c2b] p-6 rounded-xl shadow-lg max-w-3xl mx-auto"
      >
        <h2 className="text-lg text-[#16f2b3] font-bold text-center mb-4">
          DevZahir.com
        </h2>
        <div className="flex flex-col gap-4">
          {skills.map(({ name, percentage }, i) => (
            <div key={name} className="flex items-center justify-between">
              <span className="text-sm font-semibold w-20">{name}</span>
              <div className="flex-1 mx-3 bg-[#1a1a2e] rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: barColors[name] || '#16f2b3' }}
                />
              </div>
              <span className="text-xs font-medium w-10 text-right">{percentage}%</span>
            </div>
          ))}
        </div>
      </motion.div>
        
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>



      {/* Contact Form + Socials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <ContactForm />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Image
              src="https://i.ibb.co/DXwdPKd/bmc-qr.png"
              alt="Buy Me a Coffee QR Code"
              width={130}
              height={130}
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
                className="h-10 hover:scale-105 transition-all duration-300"
              />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6">
            <Link target="_blank" href="https://github.com/devzahirx3/DevZahir">
              <IoLogoGithub className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all text-gray-800 cursor-pointer" size={42} />
            </Link>
            <Link target="_blank" href="https://t.me/devzahirbot?start=start">
              <SiTelegram className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all text-gray-800 cursor-pointer" size={42} />
            </Link>
            <Link target="_blank" href="https://www.facebook.com/share/1gjjhoY2Vn/?mibextid=wwXIfr">
              <FaFacebook className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all text-gray-800 cursor-pointer" size={42} />
            </Link>
            <Link target="_blank" href="https://x.com/devzahirjs">
              <FaXTwitter className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all text-gray-800 cursor-pointer" size={42} />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 max-w-6xl mx-auto">
        <TestimonialSlider />
      </div>
    </div>
  );
}

export default ContactSection;
