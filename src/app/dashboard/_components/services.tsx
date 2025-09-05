"use client";

import { FormEvent, useEffect, useState } from "react";
import { IconBaseProps } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import { MdDelete, MdEdit } from "react-icons/md";
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
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ServicesComponent() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("MdOutlineEmail");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isModalOpen) {
      resetForm();
    }
  }, [isModalOpen]);

  // Populate form when editing a service
  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setDescription(editingService.description);
      setIcon(editingService.icon);
      setOrder(editingService.order);
      setActive(editingService.active);
      setIsEditing(true);
      setIsModalOpen(true);
    }
  }, [editingService]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/services");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch services");
      }

      setServices(data);
    } catch (err) {
      setError((err as Error).message);
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const serviceData = {
        title,
        description,
        icon,
        order,
        active,
      };

      const url = isEditing
        ? `/api/services/${editingService?._id}`
        : "/api/services/create";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save service");
      }

      // Refresh services list
      fetchServices();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError((err as Error).message);
      console.error("Error saving service:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`/api/services/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to delete service");
        }

        // Refresh services list
        fetchServices();
      } catch (err) {
        setError((err as Error).message);
        console.error("Error deleting service:", err);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIcon("MdOutlineEmail");
    setOrder(0);
    setActive(true);
    setEditingService(null);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-lime-600 hover:bg-lime-700 text-white transition-colors"
        >
          Add New Service
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-lime-400 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.length === 0 ? (
            <div className="col-span-2 text-center py-12 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400">
                No services found. Add your first service!
              </p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 brand-gradient-for-bg"></div>
                <div className="flex justify-between">
                  <div className="text-lime-400 mb-4">
                    {renderIcon(service.icon)}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingService(service)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Order: {service.order}</span>
                  <span>{service.active ? "Active" : "Inactive"}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal for adding/editing service */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">
              {isEditing ? "Edit Service" : "Add New Service"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-400 mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="icon">
                  Icon Name
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      id="icon"
                      type="text"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      placeholder="Example: MdOutlineEmail"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Format: Component name from react-icons (e.g.,
                      MdOutlineEmail, FaReact, BsChatDots)
                    </p>
                    <details className="mt-2 text-xs text-gray-400">
                      <summary className="cursor-pointer hover:text-gray-300">
                        Icon libraries available in react-icons
                      </summary>
                      <div className="p-3 mt-2 bg-gray-800 rounded-lg">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>
                            <strong>Md</strong> - Material Design icons
                            (MdOutlineEmail, MdCode)
                          </li>
                          <li>
                            <strong>Fa</strong> - Font Awesome icons (FaRobot,
                            FaCode)
                          </li>
                          <li>
                            <strong>Bs</strong> - Bootstrap icons (BsChatDots,
                            BsGraphUp)
                          </li>
                          <li>
                            <strong>Hi</strong> - Heroicons
                            (HiOutlineDocumentText)
                          </li>
                          <li>
                            <strong>Bi</strong> - Boxicons (BiLineChart)
                          </li>
                          <li>
                            <strong>Tb</strong> - Tabler icons (TbRobot)
                          </li>
                          <li>
                            <strong>Si</strong> - Simple Icons (SiOpenai)
                          </li>
                        </ul>
                        <p className="mt-2">
                          Browse all icons at:{" "}
                          <a
                            href="https://react-icons.github.io/react-icons/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lime-400 hover:underline"
                          >
                            react-icons.github.io
                          </a>
                        </p>
                      </div>
                    </details>
                  </div>
                  <div className="text-lime-400">{renderIcon(icon)}</div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="order">
                  Display Order
                </label>
                <input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-5 h-5 rounded text-lime-500 bg-gray-700 border-gray-600"
                  />
                  <span className="text-gray-400">Active</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-lime-600 hover:bg-lime-700 text-white transition-colors"
                >
                  {isEditing ? "Update Service" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
