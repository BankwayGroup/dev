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
import { motion } from 'framer-motion';

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

        <motion.div
          className="lg:w-3/4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Email Row */}
          <p className="text-sm md:text-xl flex items-center gap-3">
            <a
              href={`mailto:${personalData.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdAlternateEmail
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
            </a>
            <span>{personalData.email}</span>
          </p>

          {/* Social Icons */}
          <motion.div
            className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            viewport={{ once: true }}
          >
            {[
              {
                href: 'https://github.com/devzahirx3/DevZahir',
                icon: <IoLogoGithub size={48} />,
              },
              {
                href: 'https://t.me/devzahirbot?start=start',
                icon: <SiTelegram size={48} />,
              },
              {
                href: 'https://www.facebook.com/share/1gjjhoY2Vn/?mibextid=wwXIfr',
                icon: <FaFacebook size={48} />,
              },
              {
                href: 'https://x.com/devzahirjs',
                icon: <FaXTwitter size={48} />,
              },
            ].map(({ href, icon }, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Link target="_blank" href={href}>
                  <span className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer">
                    {icon}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactSection;
