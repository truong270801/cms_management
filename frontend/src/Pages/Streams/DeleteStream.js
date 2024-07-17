import React, { useState } from 'react';
import { deleteStream } from "../../Service/Stream_Service";
import DeleteConfirmation from '../../Component/Popup/DeleteConfirmation';

const DeleteStream = ({ streamId, onStreamDeleted }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const handleConfirm = async () => {
        try {
            await deleteStream(streamId);
            onStreamDeleted(streamId);
        } catch (error) {          
            alert("Bạn không có quyền thực hiện thao tác này.")
        } finally {
            setShowConfirmation(false);
        }
    };

    return (
        <div>
            <span className="material-icons ml-3 text-red-600" onClick={handleDeleteClick}>delete</span>
            <DeleteConfirmation
                isOpen={showConfirmation}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default DeleteStream;
