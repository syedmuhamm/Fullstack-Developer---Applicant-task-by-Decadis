import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UserDetails from '../UserDetails/UserDetails';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorProps, UserListProps } from '../UserList/UserList';
import { clearError } from '../Utils/formUtils';

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
  const [error, setError] = useState<ErrorProps>({ errors: [] });
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const nameRegex = /^[a-zA-Z\s]+$/;

  // Update the local state when the user makes changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!updatedUser) return;
    const { name, value } = event.target;
  
    // Update the state immediately
    setUpdatedUser((prevState: UserListProps | null) => {
      if (!prevState) return null;
      setChangesMade(true); // Changes made, enable the update button
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    // Check if the user details are reset to their original values
    if (user && updatedUser && JSON.stringify(user) === JSON.stringify(updatedUser)) {
      setChangesMade(false); // Reset the changes made flag
    }
  }, [user, updatedUser]);

  // Handler for update action
  const handleUpdate = () => {
    if (!updatedUser) return;
    const errors = [];
  
    // Validate user input: First Name
    if (updatedUser.firstName.trim() === '') {
      errors.push({ label: 'firstName', message: 'First name cannot be empty.' });
    } else if (!nameRegex.test(updatedUser.firstName)) {
      errors.push({ label: 'firstName', message: 'First name must contain only alphabets.' });
    }
  
    // Validate user input: Last Name
    if (updatedUser.lastName.trim() === '') {
      errors.push({ label: 'lastName', message: 'Last name cannot be empty.' });
    } else if (!nameRegex.test(updatedUser.lastName)) {
      errors.push({ label: 'lastName', message: 'Last name must contain only alphabets.' });
    }
  
    // Validate user input: Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedUser.email)) {
      errors.push({ label: 'email', message: 'Please enter a valid email address.' });
    }
  
    // Update state with errors
    setError({ errors });
  
    // If there are errors, stop further processing
    if (errors.length > 0) {
      return;
    }
  
    // If no errors, proceed with the update
    axios
      .put(`http://localhost:5000/users/${updatedUser.id}`, updatedUser)
      .then(() => {
        toast.success('User updated successfully', { autoClose: 1000 });
        console.log('User updated successfully');
        onEdit();
        onClose();
        setError({ errors: [] }); 
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        toast.error('Error updating user', { autoClose: 1000 });
      });
  };

  return (
    <>
      <Dialog className='edit-dialog' open={open} onClose={onClose} maxWidth="md" fullWidth >
        <DialogTitle className='dialog-title'>Edit user
          <IconButton className='close-button' onClick={onClose}>x</IconButton>
        </DialogTitle>
        <DialogContent>
          <UserDetails
            user={updatedUser}
            editable={true}
            onChange={handleChange}
            error={error}
            clearError={(label: string) => clearError(setError, label)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} className='cancel-button'>Cancel</Button>
          <Button onClick={handleUpdate} className='update-button' disabled={!changesMade}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditUserDialog;
