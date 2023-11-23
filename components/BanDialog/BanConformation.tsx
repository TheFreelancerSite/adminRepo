import React from "react";

interface BandUserProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const BandUser: React.FC<BandUserProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="delete-confirmation-dialog p-4 bg-white shadow-md rounded max-w-md">
        <p className="mb-4 text-black">Are you sure you want to Ban this User?</p>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 ease-in-out mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 ease-in-out"
            onClick={onConfirm}
          >
            Ban
          </button>
        </div>
      </div>
    </div>
  );
};

export default BandUser;
