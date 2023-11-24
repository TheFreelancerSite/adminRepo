"use client";
import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Package } from "@/types/package";
import ServicePopup from "../ServicePopup/ServicePopup";
import DeleteConfirmationDialog from "../DeleteDialog/DeleteConfirmationDialog"; 

const ReportsTable: React.FC = () => {
  const [reportData, setReportData] = useState<Package[]>([]);
  // const [userData, setUserData] = useState<any>(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<[]>([]);
  const [searchResults, setSearchResults] = useState<[]>([]);

  const [userData, setUserData] = useState<any>(null); // Adjust the type as needed
  const [selectedService, setSelectedService] = useState<Package | null>(null);
  const [serviceInfo, setServiceInfo] = useState<{
    id: number;
    createdAt: Date;
    serviceReviews: string | null;
    job_img: string | undefined;
    title: string;
    description: string;
    totalStars: number;
    isOpen: boolean;
  } | null>(null);
  
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:3000/send/getreport");

      if (!response.data) {
        throw new Error(`Empty response data`);
      }

      setReportData(response.data);
      setUser(response.data.user);
      setUserId(response.data.id);
      // console.log(response.data[0].user, "User Data"); // Log user data
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleServiceButtonClick = async (service: Package) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/service/getServiceById/${service.serviceId}`
      );
      setUserData(response.data);
      setSelectedService(service);

      setServiceInfo(response.data);

      setPopupOpen(true);
    } catch (error) {
      console.error("Error fetching service information:", error);
    }
  };


  const deleteReport = async (reportId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/send/deleteReport/${reportId}`);

      if (response.status === 200) {
        // If the deletion is successful, fetch the updated reports
        fetchReports();
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const showDeleteConfirmation = (reportId: string) => {
    setReportToDelete(reportId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationCancel = () => {
    setDeleteConfirmationOpen(false);
    setReportToDelete(null);
  };

  const handleDeleteConfirmationConfirm = async () => {
    if (reportToDelete) {
      await deleteReport(reportToDelete);
      setDeleteConfirmationOpen(false);
      setReportToDelete(null);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
    setServiceInfo(null);
  };
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/admin/search', { search: searchQuery });
      const data = await response.data;
      if (data.status) {
        setSearchResults(data.data); // Update local search results
        setFilteredResults(data.data); // Update filtered results displayed on the table
      } else {
        setFilteredResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setFilteredResults([]);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (!Array.isArray(searchResults)) {
      // Handle the case where searchResults is not an array
      return;
    }

    const filtered = searchResults.filter((result :typeof serviceInfo) =>
      result?.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );

  };

  return (
    <>
         <form className= "flex items-center" onSubmit={handleSearch}>
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
              </svg>
            </div>
            <input type="text"  value={searchQuery} onChange={handleChange} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User name..." required></input>
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

        <div className="max-w-full overflow-x-auto">
          {isDeleteConfirmationOpen && (
            <DeleteConfirmationDialog
              onCancel={handleDeleteConfirmationCancel}
              onConfirm={handleDeleteConfirmationConfirm}
            />
          )}
          <table className="w-full table-auto">

          {isPopupOpen && serviceInfo && (
        <ServicePopup
          serviceInfo={{ ...serviceInfo, isOpen: isPopupOpen }} 
          onClose={closePopup}
        />
      )}
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Username
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Service
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Date
                </th>

                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Description
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((reportItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      <div className="user-img-container">
                        <img
                          src={reportItem.user.imgUrl}
                          alt="no image"
                          className="user-img"
                          width={48}
                          height={48}
                        />
                      </div>
                      {reportItem.user.userName}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {reportItem.serviceId.toString()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {reportItem.createdAt.toString().substring(0, 10)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium `}
                    >
                      {reportItem.description}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleServiceButtonClick(reportItem)}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>

                      <button className="hover:text-primary" onClick={() => showDeleteConfirmation(reportItem.id.toString())}>
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportsTable;
