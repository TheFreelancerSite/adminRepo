import React from "react";

interface ServicePopupProps {
  serviceInfo: {
    id: number;
    createdAt: Date;
    serviceReviews: string | null;
    job_img: string | undefined;
    title: string;
    description: string;
    totalStars: number;
    isOpen: boolean;
  };
  onClose: () => void;
}

const ServicePopup: React.FC<ServicePopupProps> = ({
  serviceInfo,
  onClose,
}) => {
  return (
    <section
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        serviceInfo.isOpen ? "block" : "hidden"
      }`}
    >
      <article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-3xl group cursor-pointer transform duration-500 hover:-translate-y-1 bg-white p-6 md:p-10 antialiased">
        <img
          className="w-full max-h-[400px] object-cover md:w-52 mb-4 md:mb-0"
          src={serviceInfo.job_img}
          alt="Service Image"
        />
        <div className="flex-grow">
          <div className="p-4 md:p-5 pb-8 md:pb-10">
            <h1 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
              <span className="text-purple-500">Title: </span>{" "}
              {serviceInfo.title}
            </h1>
            <p className="text-xl text-gray-400 mt-2 leading-relaxed max-w-[600px] mx-auto">
              <span className="text-blue-500">Description: </span>{" "}
              {serviceInfo.description}
            </p>
          </div>
          <div className="bg-blue-50 p-4 md:p-5">
            <div className="sm:flex sm:justify-between">
              <div>
                <div className="text-lg text-gray-700">
                  <span className="text-gray-900 font-bold">
                    <span className="text-blue-500">Date: </span>{" "}
                    {serviceInfo.createdAt.toString().substring(0, 10)}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(serviceInfo.totalStars)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-4 h-4 mx-px fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                      >
                        <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">
                    <span className="text-indigo-500">Reviews:</span>{" "}
                    {serviceInfo.serviceReviews}
                  </div>
                </div>
              </div>
              <button
                className="absolute bottom-4 right-4 py-3 px-8 bg-purple-700 hover:bg-purple-600 font-bold text-red-500 text-lg rounded-lg shadow-md"
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ServicePopup;
