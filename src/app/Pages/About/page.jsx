"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  FaShoppingBag, FaUsers, FaAward, FaRocket, 
  FaHeart, FaShieldAlt, FaRecycle, FaGlobe,
  FaStore, FaQuoteLeft
} from "react-icons/fa";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all section elements
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Team members data (Unsplash images)
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
      bio: "10+ years of experience in e-commerce and retail management."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1633625763717-045645e9e739?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Award-winning designer with a passion for user experience."
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      bio: "Digital marketing expert focused on brand growth strategies."
    },
    {
      id: 4,
      name: "David Martinez",
      role: "CTO",
      image: "https://plus.unsplash.com/premium_photo-1689562473471-6e736b8afe15?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Technology innovator with expertise in e-commerce platforms."
    }
  ];

  // Stats data
  const stats = [
    { id: 1, value: "50K+", label: "Happy Customers", icon: <FaUsers /> },
    { id: 2, value: "100K+", label: "Products Sold", icon: <FaShoppingBag /> },
    { id: 3, value: "15+", label: "Industry Awards", icon: <FaAward /> },
    { id: 4, value: "10M+", label: "Global Reach", icon: <FaGlobe /> }
  ];

  // Values data
  const values = [
    {
      id: 1,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above all else.",
      icon: <FaHeart />
    },
    {
      id: 2,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality checks before reaching you.",
      icon: <FaShieldAlt />
    },
    {
      id: 3,
      title: "Sustainable Practices",
      description: "We're committed to eco-friendly packaging and ethical sourcing.",
      icon: <FaRecycle />
    },
    {
      id: 4,
      title: "Innovation",
      description: "We continuously evolve to bring you the latest trends and technologies.",
      icon: <FaRocket />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
              Founded in 2015, we started with a simple mission: to make quality products accessible to everyone without compromising on style or ethics.
            </p>
            <div className="w-24 h-1 bg-black mx-auto mb-12"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div 
              ref={el => sectionRefs.current[0] = el}
              className="opacity-0 transition-transform duration-700"
            >
              <div className="relative">
                <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" 
                    alt="Our store" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-black rounded-lg"></div>
              </div>
            </div>
            <div 
              ref={el => sectionRefs.current[1] = el}
              className="opacity-0 transition-transform duration-700"
            >
              <h2 className="text-3xl font-bold mb-6">From a Small Idea to a Global Brand</h2>
              <p className="text-gray-700 mb-6">
                What began as a small boutique in New York has grown into an international e-commerce destination 
                serving customers across 30 countries. Our journey has been fueled by passion, innovation, and an 
                unwavering commitment to excellence.
              </p>
              <p className="text-gray-700">
                Today, we offer a curated selection of fashion, accessories, and lifestyle products that reflect 
                our core values of sustainability, quality, and timeless design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div 
            ref={el => sectionRefs.current[2] = el}
            className="text-center mb-16 opacity-0"
          >
            <h2 className="text-4xl font-bold mb-4">By The Numbers</h2>
            <p className="text-gray-300">Our impact and reach in the e-commerce world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.id}
                ref={el => sectionRefs.current[3 + index] = el}
                className="text-center p-6 bg-gray-900 rounded-lg opacity-0 transition-transform duration-700 hover:transform hover:scale-105 hover:bg-gray-800"
              >
                <div className="text-4xl mb-4 text-white flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div 
            ref={el => sectionRefs.current[7] = el}
            className="text-center mb-16 opacity-0"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-700">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.id}
                ref={el => sectionRefs.current[8 + index] = el}
                className="p-6 border border-gray-200 rounded-lg text-center opacity-0 transition-transform duration-700 hover:shadow-lg hover:border-black"
              >
                <div className="text-3xl mb-4 text-black flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div 
            ref={el => sectionRefs.current[12] = el}
            className="text-center mb-16 opacity-0"
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-700">The passionate people behind our success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                ref={el => sectionRefs.current[13 + index] = el}
                className="bg-white rounded-lg overflow-hidden shadow-md opacity-0 transition-transform duration-700 hover:shadow-xl"
              >
                <div className="h-64 bg-gray-300 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div 
            ref={el => sectionRefs.current[17] = el}
            className="text-center mb-16 opacity-0"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-300">Hear from shoppers who love our products</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div 
              ref={el => sectionRefs.current[18] = el}
              className="bg-gray-900 p-10 rounded-lg relative opacity-0"
            >
              <FaQuoteLeft className="text-4xl text-gray-700 absolute top-6 left-6" />
              <p className="text-xl italic mb-6 relative z-10">
                "I've been shopping with StyleStore for over three years now, and I'm consistently impressed with 
                their quality, customer service, and ethical practices. Their products stand the test of time, 
                and I always receive compliments on my purchases."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=100&q=80" 
                    alt="Emily Rodriguez" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Emily Rodriguez</h4>
                  <p className="text-gray-400">Loyal Customer since 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div 
            ref={el => sectionRefs.current[19] = el}
            className="max-w-3xl mx-auto opacity-0"
          >
            <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-700 mb-10">
              Experience the difference of shopping with a brand that cares about quality, style, and sustainability.
            </p>
            <Link 
              href="/Pages/product" 
              className="inline-flex items-center bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              <FaStore className="mr-2" /> Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;
