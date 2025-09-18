"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPinterest,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaArrowRight
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <span className="text-2xl font-bold">SHOPMATE</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for premium products at unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <FaFacebookF /> },
                { icon: <FaTwitter /> },
                { icon: <FaInstagram /> },
                { icon: <FaLinkedinIn /> },
                { icon: <FaYoutube /> },
                { icon: <FaPinterest /> }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/Pages/product" },
                { name: "About Us", path: "/Pages/About" },
                { name: "Contact", path: "/Pages/Deals" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <FaArrowRight className="text-xs mr-2" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-white">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-white mt-1 mr-3" />
                <span className="text-gray-400">
                  123 Commerce Street, Business District, New York, NY 10001
                </span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-white mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-white mr-3" />
                <span className="text-gray-400">support@shopmate.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaCreditCard className="text-2xl" />, title: "Secure Payment", desc: "100% secure payment" },
              { icon: <FaShieldAlt className="text-2xl" />, title: "Quality Products", desc: "Authentic products" },
              { icon: <FaTruck className="text-2xl" />, title: "Free Shipping", desc: "On orders over $99" },
              { icon: <FaHeadset className="text-2xl" />, title: "24/7 Support", desc: "Dedicated support" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="text-white">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-gray-400 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment & Apps */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <span className="text-gray-400 block mb-2">We accept:</span>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((method, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300 hover:bg-gray-700"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-400 block mb-2">Download our app:</span>
              <div className="flex gap-2">
                <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition-colors duration-300">
                  App Store
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition-colors duration-300">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SHOPMATE. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Return Policy", path: "/returns" },
                { name: "Shipping Policy", path: "/shipping" }
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors duration-300 z-40"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}
