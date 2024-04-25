import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UserDetails from '../UserDetails/UserDetails';
import axios from 'axios';
import './AllDialogCommonStyling.scss';
import { IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorProps } from '../UserList/UserList';
import { clearError } from '../Utils/formUtils';

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Component: CreateUserDialog
 * Description: This component creates a dialog for adding a new user. It allows users to input first name,
 * last name, and email, validates the input, and sends a POST request to the server to create the user. 
 * 
 * It uses Material-UI components for dialog layout and axios for making HTTP requests.
 */

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ open, onClose }) => {
  const [error, setError] = useState<ErrorProps>({ errors: [] });

   // Reset error state when dialog is opened
   useEffect(() => {
    if (open) {
      setError({ errors: [] });
    }
  }, [open]);
  // Handler for create action
  const handleCreateAction = async () => {
    try {
      // Constructing the user object with data from the form fields
      const firstNameInput = document.getElementById('firstName') as HTMLInputElement | null;
      const lastNameInput = document.getElementById('lastName') as HTMLInputElement | null;
      const emailInput = document.getElementById('email') as HTMLInputElement | null;

      if (!firstNameInput || !lastNameInput || !emailInput) {
        console.error('Form elements not found');
        return;
      }

      // Removing invalid characters and trimming white spaces
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();

      // Collect all validation errors
      const errors = [];

      // Validate if first name contains valid characters
      if (!/^[a-zA-Z\s]+$/.test(firstName) || !firstName ) {
        errors.push({ label: 'firstName', message: 'Please enter valid first name' });
      }

      // Validate if last name contains valid characters
      if (!/^[a-zA-Z\s]+$/.test(lastName) || !lastName) {
        errors.push({ label: 'lastName', message: 'Please enter valid last name' });
      }

      // Validate email format
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
      if (!isValidEmail) {
        errors.push({ label: 'email', message: 'Please enter valid email address' });
      }

      // Update state with all errors
      setError({ errors });

      // If there are errors, stop further processing
      if (errors.length > 0) {
        return;
      }

      const userData = {
        firstName,
        lastName,
        email: emailInput.value,
      };

      // Making the POST request to create the user
      const response = await axios.post('http://localhost:5000/users', userData);
      console.log('User created:', response.data);
      toast.success("User created successfully.", { autoClose: 1000 })

      onClose();
      setError({ errors: [] });
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error("Error creating a user", { autoClose: 1000 });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className='create-dialog' maxWidth="md" fullWidth>
      <DialogTitle className='dialog-title'>Create User
      <IconButton className='close-button' onClick={onClose}>x</IconButton>
      </DialogTitle>
      <DialogContent>
        <UserDetails error={error} clearError={(label: string) => clearError(setError, label)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='cancel-button'>Cancel</Button>
        <Button onClick={handleCreateAction} className='create-button'>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
