// @flow strict
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TestimonialSlider from "@/app/components/portfolio/TestimonialSlider";
import Link from 'next/link';
import { IoLogoGithub } from 'react-icons/io';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiTelegram } from 'react-icons/si';
import ContactForm from './contact-form';
import Image from 'next/image';
import Projects from '../github/Projects';
import TwitterApiSection from "@/app/components/homepage/twitter/TwitterApiSection";

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
 <>
  {/* Projects Section */}
  <section id="github" className="mt-20">
    <Projects />
  </section>

  {/* Add your Twitter API Section here */}
            <TwitterApiSection />


      {/* Contact Section */}
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

        {/* Testimonials */}
        <div className="mt-20 max-w-6xl mx-auto">
          <TestimonialSlider />
        </div>
      </div>
    </>
  );
}

export default ContactSection;
