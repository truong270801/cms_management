import React from 'react';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const DeleteConfirmation = ({ isOpen, onConfirm, onCancel }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            style={customStyles}
            contentLabel="Delete "
        >
            <div className="p-4">
                <h2 className="text-lg  mb-4">Confirm deletion of this item?</h2>
                <div className="flex justify-center">
                    <button
                        className="bg-red-500 text-white px-8 py-2 rounded mr-2 hover:bg-red-700 "
                        onClick={onConfirm}
                    >
                        DELETE
                    </button>
                    <button
                        className="bg-gray-500 text-black-700 px-8 py-2 rounded hover:bg-gray-400 "
                        onClick={onCancel}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmation;
