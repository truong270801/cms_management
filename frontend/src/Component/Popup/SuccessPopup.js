
import React from 'react';

const SuccessPopup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-gray-300 p-6 rounded-lg shadow-lg">
                <div className="text-black text-center">
                    <p className="text-xl">{message}</p>
                    <button
                        className="mt-4 bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={onClose}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SuccessPopup;
