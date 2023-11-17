"use client"
import { useEffect, useState } from "react";
import axios from 'axios';

type Service = {
  id: number;
  title: string | null;
  totalStars: number;
  category: string | null;
  price: number;
  serviceReviews: string | null;
  description: string | null;
};

const ServicesTable = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const userId = parseInt(storedUserId, 10);
          console.log(userId)
          const response = await axios.get(`http://localhost:3000/service/getServicesForSpecificUser/${userId}`);
          const fetchedServices: Service[] = response.data;
          console.log( response)
          setServices(fetchedServices);
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Services
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Title</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Total Stars</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Service Reviews</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Description</p>
        </div>
      </div>

      {services.map((service, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {service.title}
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {service.totalStars}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {service.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {service.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">
              {service.serviceReviews}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">
              {service.description}
            </p>
          </div>
        </div>
      ))}

    </div>
  );
};

export default ServicesTable;
