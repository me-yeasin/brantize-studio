"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface ContactInfoData {
  description: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  _id?: string;
}

const ContactDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState<ContactInfoData>({
    description: "",
    email: "",
    phone: "",
    address: "",
    hours: "",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch("/api/contact");
        if (!response.ok) {
          throw new Error("Failed to fetch contact information");
        }
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error("Error loading contact data:", error);
        toast.error("Failed to load contact information");
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact information");
      }

      const updatedData = await response.json();
      setContactData(updatedData);
      toast.success("Contact information updated successfully");
    } catch (error) {
      console.error("Error updating contact information:", error);
      toast.error("Failed to update contact information");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !contactData.email) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={contactData.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            rows={4}
            placeholder="Contact description"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            placeholder="Contact email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={contactData.phone}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            placeholder="Contact phone"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-300 mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={contactData.address}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            placeholder="Contact address"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="hours" className="block text-gray-300 mb-2">
            Business Hours
          </label>
          <input
            type="text"
            id="hours"
            name="hours"
            value={contactData.hours}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            placeholder="Business hours"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded flex items-center"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactDashboard;
