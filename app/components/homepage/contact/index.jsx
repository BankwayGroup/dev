// @flow strict
import { personalData } from '@/utils/data/personal-data';
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';
import { FaTelegram, FaGlobe } from 'react-icons/fa';

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      {/* Vertical CONTACT label on right */}
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>

      {/* Centered container */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <ContactForm />
          <div className="lg:w-3/4 mx-auto">
            <div className="flex flex-col gap-5 lg:gap-9">
              {/* Add any extra info here if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
