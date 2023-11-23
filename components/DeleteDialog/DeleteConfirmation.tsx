import React from "react";

interface DeleteConfirmationDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationDialogProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="delete-confirmation-dialog p-4 bg-white shadow-md rounded max-w-md">
        <p className="mb-4 text-white-500">Are you sure you want to delete this User?</p>
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
