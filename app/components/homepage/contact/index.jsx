// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';
import { SiTelegram } from 'react-icons/si'; // Add this import if not already present

<p className="text-sm md:text-xl flex items-center gap-3">
  <a href={`mailto:${personalData.email}`} target="_blank" rel="noopener noreferrer">
    <MdAlternateEmail
      className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
      size={36}
    />
  </a>
  <span>{personalData.email}</span>
</p>


          </div>
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
};

export default ContactSection;
