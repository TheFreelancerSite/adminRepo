"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from 'axios';

type Client = {
  id: number | null; // Accepts null values
  isSeller: boolean | null; // Accepts null values
  imgUrl: string | null; // Accepts null values
  username: string | null; // Accepts null values
  email: string | null; // Accepts null values
  country: string | null; // Accepts null values
  phone: string | null; // Accepts null values
  description: string | null; // Accepts null values
};

type Freelancer = {
  id: number | null; // Accepts null values
  isSeller: boolean | null; // Accepts null values
  imgUrl: string | null; // Accepts null values
  username: string | null; // Accepts null values
  email: string | null; // Accepts null values
  country: string | null; // Accepts null values
  phone: string | null; // Accepts null values
  description: string | null; // Accepts null values
};


const TablesPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/clients", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClients(response.data);

      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    const fetchFreelancers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/freelancers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFreelancers(response.data);
      } catch (error) {
        console.error("Error fetching freelancer details:", error);
      }
    };

    fetchClients();
    fetchFreelancers();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark.bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Clients
          </h4>

          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark.bg-meta-4 sm:grid-cols-5">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  username
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  email
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  country
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  phone
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  description
                </h5>
              </div>
            </div>

            {clients.map((client, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-5 ${key === clients.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    {client.imgUrl ? (
                      <Image src={client.imgUrl} alt="Client" width={48} height={48} />
                    ) : (
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/basic-ui-set/100/Admin-128.png" // Replace with the actual path to your default image
                        alt="Default Client"
                        width={48}
                        height={48}
                      />
                    )}
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {client.username}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{client.email}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{client.country}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{client.phone || 'N/A'}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-meta-5">{client.description || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark.bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Freelancers
          </h4>

          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark.bg-meta-4 sm:grid-cols-5">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  username
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  email
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  country
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  phone
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  description
                </h5>
              </div>
            </div>

            {freelancers.map((freelancer, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-5 ${key === freelancers.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    {freelancer.imgUrl ? (
                      <Image src={freelancer.imgUrl} alt="freelancer" width={48} height={48} />
                    ) : (
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/basic-ui-set/100/Admin-128.png"
                        alt="Default freelancer"
                        width={48}
                        height={48}
                      />
                    )}
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {freelancer.username}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{freelancer.email}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{freelancer.country}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{freelancer.phone || 'N/A'}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-meta-5">{freelancer.description || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TablesPage;
