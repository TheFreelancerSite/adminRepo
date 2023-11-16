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

type ServicesTableProps = {
  services: Service[];
};

const ServicesTable = ({ services }: ServicesTableProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="py-6 px-4 md:px-6 xl:px-7.5">
      <h4 className="text-xl font-semibold text-black dark:text-white">
        Services
      </h4>
    </div>

    <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div className="col-span-3 flex items-center">
        <p className="font-medium">Title</p>
      </div>
      <div className="col-span-2 hidden items-center sm:flex">
        <p className="font-medium">Total Stars</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="font-medium">Category</p>
      </div>
      <div className="col-span-4 flex items-center">
        <p className="font-medium">Price</p>
      </div>
      <div className="col-span-5 flex items-center">
        <p className="font-medium">Service Reviews</p>
      </div>
      <div className="col-span-6 flex items-center">
        <p className="font-medium">Description</p>
      </div>
    </div>

    {services.map((service, key) => (
      <div
        className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        key={key}
      >
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
           
            <p className="text-sm text-black dark:text-white">
              {service.title}
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm text-black dark:text-white">
            {service.totalStars}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black dark:text-white">
            {service.category}
          </p>
        </div>
        <div className="col-span-4 flex items-center">
          <p className="text-sm text-black dark:text-white">{service.price}</p>
        </div>
        <div className="col-span-5 flex items-center">
          <p className="text-sm text-meta-3">{service.serviceReviews}</p>
        </div>
        <div className="col-span-5 flex items-center">
          <p className="text-sm text-meta-3">{service.description}</p>
        </div>
      </div>
    ))}
  </div>
);
};


export async function getServerSideProps() {
  try {
    const token = ""; // Replace with your token
    const response = await axios.get('http://localhost:3000/service/getServicesForSpecificUser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const services: Service[] = response.data;

    return {
      props: {
        services,
      },
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    return {
      props: {
        services: [],
      },
    };
  }
}

export default ServicesTable;
