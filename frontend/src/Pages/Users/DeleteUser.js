import React, { useState } from 'react';
import axios from 'axios';
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
            const token = localStorage.getItem('token'); 
            await axios.delete(`http://127.0.0.1:8000/users/${userId}`, 
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onUserDeleted(userId);
           
        } catch (error) {
            console.error('Lỗi', error);
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

export default DeleteUser;
