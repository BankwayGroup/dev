// @flow strict
import { personalData } from '@/utils/data/personal-data';
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';
import { FaTelegram, FaGlobe } from 'react-icons/fa'; // Fiverr icon import

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
        <div className="lg:w-3/4 ">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3">
              <MdAlternateEmail
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span>{personalData.email}</span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <FaTelegram
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span>
                <a target="_blank" href="https://t.me/astrov3" className="text-[#FAF9F6]">@DevZahir</a>
              </span>
            </p>
        <p className="text-sm md:text-xl flex items-center gap-3">
        <FaGlobe
          className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
          size={36}
        />
        <span>
          <a target="_blank" href="https://www.fiverr.com/devzahir" className="text-[#FAF9F6]">Fiverr Profile</a> {/* Replace with your Fiverr profile link */}
        </span>
      </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
