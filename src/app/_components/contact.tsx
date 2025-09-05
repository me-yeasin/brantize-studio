"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface ContactInfoData {
  description: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfoData>({
    description:
      "Our team of AI experts is ready to help you identify opportunities for AI integration in your business and develop custom solutions that deliver real value.",
    email: "hello@neuralforge.ai",
    phone: "+1 (555) 123-4567",
    address: "123 AI Boulevard, Tech City, TC 12345",
    hours: "Mon-Fri: 9am-6pm EST",
  });
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch("/api/contact");
        if (response.ok) {
          const data = await response.json();
          setContactInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get the email configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing");
      }

      // Send the email
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      // Show success message
      toast.success("Thank you for your message! We will contact you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4">
            Start Your{" "}
            <span className="brand-gradient-for-text">AI Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to transform your business with AI? Get in touch with our team
            today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="company" className="block text-gray-400 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full font-medium brand-gradient-for-bg text-gray-900 hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-l-2 border-gray-900 mr-2"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-start">
            <h2 className="font-orbitron font-bold text-4xl mb-6">
              Let&apos;s Connect
            </h2>

            {loading ? (
              <div className="space-y-4">
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
              </div>
            ) : (
              <p className="text-gray-400 mb-8">{contactInfo.description}</p>
            )}

            <div className="space-y-6">
              <div className="flex items-center">
                <i className="fas fa-envelope text-2xl text-lime-400 w-10 text-center"></i>
                <span>{loading ? "Loading..." : contactInfo.email}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-2xl text-lime-400 w-10 text-center"></i>
                <span>{loading ? "Loading..." : contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-2xl text-lime-400 w-10 text-center"></i>
                <span>{loading ? "Loading..." : contactInfo.address}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock text-2xl text-lime-400 w-10 text-center"></i>
                <span>{loading ? "Loading..." : contactInfo.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
