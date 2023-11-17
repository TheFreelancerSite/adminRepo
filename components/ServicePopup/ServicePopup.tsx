import React from "react";

interface ServicePopupProps {
  serviceInfo: {
    createdAt: Date;
    serviceReviews: string | null;
    job_img: string | undefined;
    title: string;
    description: string;
  };
  onClose: () => void;
}

const ServicePopup: React.FC<ServicePopupProps> = ({ serviceInfo, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      {/* Popup content with service information */}
      <div className="bg-white p-6 rounded shadow-lg max-w-md">
        {/* Display service information here */}
        <p className="mb-4">Date: {serviceInfo.createdAt.toString().substring(0, 10)}</p>
        <img className="mb-4" src={serviceInfo.job_img} alt="Service Image" />
        <p className="mb-4 text-xl font-semibold"><span className="text-danger">title</span> {serviceInfo.title}</p>
        <p className="mb-4"><span className="text-danger">description:</span>{serviceInfo.description}</p>
        <p className="mb-4"><span className="text-danger">Review:</span> {serviceInfo.serviceReviews}</p>
        {/* Add more information as needed */}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-danger font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 ease-in-out"
            onClick={onClose}
          >
            Close 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicePopup;
