import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UserDetails from '../UserDetails/UserDetails';
import { UserListProps } from '../UserList/UserList'; // Import UserListProps type
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import './AllDialogCommonStyling.scss';
import { UUID } from 'crypto';

interface EditUserDialogProps {
  user: UserListProps | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
}

/**
 * Component: EditUserDialog
 * Description: Dialog for editing user details, including HTTP PUT request for updates.
 * 
 * Uses Material-UI components and axios for HTTP requests.
 */

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, open, onClose, onEdit }) => {
  const [updatedUser, setUpdatedUser] = useState<UserListProps | null>(user);
  console.log(updatedUser, "updatedUser");

  // Update the local state when the user makes changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!updatedUser) return;
    const { name, value } = event.target;
    let newValue = value;
    if (name === 'firstName' || name === 'lastName') {
      // Restrict to only small and capital letters
      newValue = value.replace(/[^A-Za-z]/g, '');
      console.error('Please only use small and capital letters.');
    } else if (name === 'email') {
      // Validate email format
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValidEmail) {
        // Optionally, we can provide feedback to the user about the invalid email format
        // For example, set an error state or display a message, I am planning to use toasts here, but later
        console.error('Invalid email format');
        return;
      }
    }
    setUpdatedUser((prevState: UserListProps | null) => {
      if (!prevState) return null; // return null if prevState is null
      return {
        ...prevState,
        [name]: newValue,
      };
    });
  };
  

  // Handler for update action
  const handleUpdate = async () => {
    try {
      if (!updatedUser) return;
      await axios.put(`http://localhost:5000/users/${updatedUser.id}`, updatedUser);
      onEdit(); // call back to refresh users table, useEffect with users dependency will cause infinite re-renders
      onClose(); // Close the dialog after updating
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Dialog className='edit-dialog' open={open} onClose={onClose} maxWidth="md" fullWidth >
      <DialogTitle className='dialog-title'>Edit user
        <IconButton className='close-button' onClick={onClose}>x</IconButton>
      </DialogTitle>
      <DialogContent>
        <UserDetails
          user={updatedUser}
          editable={true}
          onChange={handleChange} // Passing the handleChange function to handle user input changes
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='cancel-button'>Cancel</Button>
        <Button onClick={handleUpdate} className='update-button'>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
