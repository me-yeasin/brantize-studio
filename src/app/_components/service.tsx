"use client";

import { useEffect, useState } from "react";
import { IconBaseProps } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";

// Icon library mapping
const iconLibraries = {
  Ai: AiIcons,
  Bi: BiIcons,
  Bs: BsIcons,
  Fa: FaIcons,
  Hi: HiIcons,
  Md: MdIcons,
  Si: SiIcons,
  Tb: TbIcons,
};

// Dynamic icon rendering function
const renderIcon = (iconName: string, props: IconBaseProps = { size: 40 }) => {
  try {
    if (!iconName) return <MdIcons.MdOutlineEmail {...props} />;

    // Special handling for Ai icons which have a three-character prefix
    if (iconName.startsWith("Ai")) {
      // @ts-expect-error - IconComponent is a valid React component
      const IconComponent = AiIcons[iconName];
      if (IconComponent) {
        return <IconComponent {...props} />;
      }
      return <MdIcons.MdOutlineEmail {...props} />;
    }

    // For all other icons (two-character prefix)
    const prefix = iconName.substring(0, 2);
    const library = iconLibraries[prefix as keyof typeof iconLibraries];

    if (library) {
      // @ts-expect-error - IconComponent is a valid React component
      const IconComponent = library[iconName];
      if (IconComponent) {
        return <IconComponent {...props} />;
      }
    }

    // Fallback to MdOutlineEmail if icon not found
    return <MdIcons.MdOutlineEmail {...props} />;
  } catch (error) {
    console.error(`Error rendering icon: ${iconName}`, error);
    return <MdIcons.MdOutlineEmail {...props} />;
  }
};

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      // Default services as fallback
      const defaultServices = [
        {
          _id: "1",
          icon: "MdOutlineEmail",
          title: "Auto Email Responder",
          description:
            "Intelligent email automation that understands context and crafts personalized responses, reducing response time by 80%.",
        },
        {
          _id: "2",
          icon: "HiOutlineDocumentText",
          title: "Document Summarizer",
          description:
            "Advanced AI that processes and summarizes complex documents, extracting key insights and saving hours of manual work.",
        },
        {
          _id: "3",
          icon: "BiLineChart",
          title: "Data Analysis Agent",
          description:
            "Transform raw data into actionable insights with our AI-powered analytics agents that identify trends and opportunities.",
        },
        {
          _id: "4",
          icon: "BsChatDots",
          title: "Customer Support Bot",
          description:
            "24/7 intelligent customer support that handles inquiries, resolves issues, and escalates when necessary.",
        },
        {
          _id: "5",
          icon: "MdOutlineCalendarMonth",
          title: "Scheduling Assistant",
          description:
            "Smart scheduling that coordinates with multiple calendars, finds optimal meeting times, and sends reminders.",
        },
        {
          _id: "6",
          icon: "MdCode",
          title: "Custom AI Development",
          description:
            "Tailored AI solutions designed specifically for your unique business challenges and workflow requirements.",
        },
      ];
      try {
        setLoading(true);
        const response = await fetch("/api/services");

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        // If we have services from the API, use them; otherwise use default services
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(defaultServices);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        // Fall back to default services on error
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl mb-4">
            Our <span className="brand-gradient-for-text">AI Solutions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We specialize in creating custom AI agents that solve real business
            problems and deliver measurable results.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-lime-400 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 transition-all hover:-translate-y-2 hover:shadow-xl hover:border-gray-600 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 brand-gradient-for-bg"></div>
                <div className="text-lime-400 mb-6">
                  {renderIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                {/* <button className="px-4 py-2 rounded-full font-medium border border-gray-700 text-white hover:bg-gray-800/50 hover:border-lime-400 hover:text-lime-400 transition-all">
                  Learn More
                </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
