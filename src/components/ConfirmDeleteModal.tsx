// src/components/ConfirmDeleteModal.tsx
import React from "react";

interface ConfirmDeleteModalProps {
    productName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ productName, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-[#141414] p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                <p className="mb-4">
                    Are you sure you want to delete <span className="font-semibold">{productName}</span>?
                </p>
                <div className="flex justify-end space-x-4">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors cursor-pointer">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
