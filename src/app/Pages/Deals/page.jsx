"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        "✅ Message sent successfully! We'll get back to you soon.",
        {
          position: "top-center",
          theme: "dark",
        }
      );

      // Reset form
      setFormData({
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("❌ Something went wrong. Please try again later.", {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse"></div>
        <div className="absolute top-80 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <ToastContainer />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions or want to discuss a project? We'd love to hear from
            you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md mr-3">
                  <FaMapMarkerAlt />
                </span>
                Our Location
              </h2>
              <p className="text-gray-300 text-lg">
                123 Commerce Street
                <br />
                Business District
                <br />
                New York, NY 10001
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md mr-3">
                  <FaEnvelope />
                </span>
                Email Us
              </h2>
              <p className="text-gray-300 text-lg mb-2">info@yourcompany.com</p>
              <p className="text-gray-300 text-lg">support@yourcompany.com</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md mr-3">
                  <FaPhone />
                </span>
                Call Us
              </h2>
              <p className="text-gray-300 text-lg mb-2">+1 (555) 123-4567</p>
              <p className="text-gray-300 text-lg">+1 (555) 987-6543</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md mr-3">
                  <FaClock />
                </span>
                Business Hours
              </h2>
              <p className="text-gray-300 text-lg mb-2">
                Monday - Friday: 9AM - 6PM
              </p>
              <p className="text-gray-300 text-lg">Saturday: 10AM - 4PM</p>
            </motion.div>

            {/* Social Media */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30"
            >
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebook />, color: "bg-blue-600" },
                  { icon: <FaTwitter />, color: "bg-blue-400" },
                  { icon: <FaInstagram />, color: "bg-pink-500" },
                  { icon: <FaLinkedin />, color: "bg-blue-700" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`${social.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800/50 p-10 lg:h-[48%] rounded-2xl backdrop-blur-sm border border-gray-700/30"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FaPaperPlane />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </motion.div>

              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative"
              >
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly do you respond to inquiries?",
                answer:
                  "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.",
              },
              {
                question: "Do you offer custom solutions?",
                answer:
                  "Yes, we specialize in custom solutions tailored to your specific needs. Contact us to discuss your requirements.",
              },
              {
                question: "What are your payment options?",
                answer:
                  "We accept all major credit cards, bank transfers, and PayPal. Payment plans are available for larger projects.",
              },
              {
                question: "Do you provide support after project completion?",
                answer:
                  "Absolutely! We offer ongoing support and maintenance packages to ensure your project continues to perform optimally.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/30"
              >
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <FaCheckCircle className="text-cyan-400 mr-2" />{" "}
                  {faq.question}
                </h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map Section - Using a simple static map image to avoid API issues */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-4xl font-bold text-center mb-8">Find Us Here</h2>

          <div className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/30 h-96">
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <div className="text-center p-8">
                <FaMapMarkerAlt className="text-4xl text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Our Location</h3>
                <p className="text-gray-300 mb-4">
                  123 Commerce Street, New York, NY 10001
                </p>
                <p className="text-gray-400">
                  Map would be displayed here with proper API key
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
