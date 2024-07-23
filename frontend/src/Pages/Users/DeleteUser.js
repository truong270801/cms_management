import React, { useState } from 'react';
import { deleteUser } from '../../Service/User_Service';
import DeleteConfirmation from '../../Component/Popup/DeleteConfirmation';


const DeleteUser = ({ userId, onUserDeleted }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
        
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

  

    const handleConfirm = async () => {
        try {
            await deleteUser(userId);
            onUserDeleted(userId);
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setShowConfirmation(false);
        }
    };

    return (
        <div>
            <span className="material-icons ml-3 text-red-600 cursor-pointer" onClick={handleDeleteClick}>delete</span>
            <DeleteConfirmation
                isOpen={showConfirmation}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

        </div>
    );
};

export default DeleteUser;
