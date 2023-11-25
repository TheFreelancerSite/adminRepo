'use client'
import { useEffect, useState, FormEvent } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import DeleteConfirmation from "../DeleteDialog/DeleteConfirmation";

type Client = {
  id: number;
  isSeller: boolean | null;
  imgUrl: string | null;
  userName: string | null;
  email: string | null;
  country: string | null;
  phone: string | null;
  description: string | null;
};

const ClientsTable = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filteredResults, setFilteredResults] = useState<Client[]>([]);
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  const router = useRouter();

  const token = localStorage.getItem('token');


  useEffect(() => {
    // Fetch clients on component mount
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
    fetchClients();
  }, [clients]);

  const deleteClient = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/delete/${userId}`);

      // if (response.status === 200) {
      //   setClients(response.data);
      // }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const showDeleteConfirmation = (userId: number) => {
    setClientToDelete(userId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationCancel = () => {
    setDeleteConfirmationOpen(false);
    setClientToDelete(null);
  };
  const handleDeleteConfirmationConfirm = async () => {
    if (clientToDelete) {
      await deleteClient(clientToDelete);
      setDeleteConfirmationOpen(false);
      setClientToDelete(null);
    }
  };

  const redirectToServicePage = (userId: number) => {
    localStorage.setItem('userId', userId.toString());
    router.push(`/pages/tables/clientstable/servicetable`);
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

    const filtered = searchResults.filter((result: Client) =>
      result.userName?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredResults(searchResults);
  };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);

  //   const filtered = clients.filter((client: Client) =>
  //     client.userName?.toLowerCase().includes(e.target.value.toLowerCase())
  //   );
  //   setFilteredResults(filtered);
  // }






  return (
    <>
      <div className="flex flex-wrap"></div>
      {isDeleteConfirmationOpen && (
        <DeleteConfirmation
          onCancel={handleDeleteConfirmationCancel}
          onConfirm={handleDeleteConfirmationConfirm}
        />
      )}
     
       
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
      
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark.bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Clients
          </h4>

          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark.bg-meta-4 sm:grid-cols-6">
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
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  delete
                </h5>
              </div>
            </div>


            {clients.map((client, key) => {
              const userNameMatches = client.userName?.toLowerCase().includes(searchQuery.toLowerCase());

              return (
                (searchQuery === '' || userNameMatches) && (
                  <div
                    className={`grid grid-cols-3 sm:grid-cols-6 ${key === clients.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
                    key={key}
                  >
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <div className="flex-shrink-0" >
                        {client.imgUrl ? (
                          <img src={client.imgUrl} alt="Client" width={48} height={48} onClick={() => { console.log("image clicekd ", client.id); }} />
                        ) : (
                          <img
                            src="https://cdn2.iconfinder.com/data/icons/basic-ui-set/100/Admin-128.png" // Replace with the actual path to your default image
                            alt="Default Client"
                            width={48}
                            height={48}
                            onClick={() => searchResults}



                          />
                        )}
                      </div>
                      <p className="hidden text-black dark:text-white sm:block" onClick={() => redirectToServicePage(client.id)}
                      >
                        {client.userName}
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

                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                      <button onClick={() => { console.log("userId:", client.id); showDeleteConfirmation(client.id); }} className="hover:text-primary">
                        <button onClick={() => showDeleteConfirmation(client.id)} className="hover:text-primary">
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
                      </button>
                    </div>
                  </div>
                ))
            })}
          </div>
        </div>
      </div >

    </>
  );
};

export default ClientsTable;
