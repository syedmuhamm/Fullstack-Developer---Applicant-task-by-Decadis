import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UserDetails from '../UserDetails/UserDetails';
import axios from 'axios';
import './AllDialogCommonStyling.scss';
import { IconButton } from '@mui/material';

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

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({  open, onClose }) => {

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
      const firstName = firstNameInput.value.replace(/[^A-Za-z\s]/g, '').trim();
      const lastName = lastNameInput.value.replace(/[^A-Za-z\s]/g, '').trim();
  
      // Validate if first name contains valid characters
      if (firstNameInput.value !== firstName) {
        console.error('First name contains invalid characters');
        return;
      }

    // Validate if last name contains valid characters
      if (lastNameInput.value !== lastName) {
        console.error('Last name contains invalid characters');
        return;
      }
      // Validate if first name and last name are empty
      if (!firstName) {
        console.error('First name cannot be empty');
        return;
      }
  
      if (!lastName) {
        console.error('Last name cannot be empty');
        return;
      }
  
      const userData = {
        firstName,
        lastName,
        email: emailInput.value,
      };
  
      // Validate email format
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
      if (!isValidEmail) {
        console.error('Invalid email format');
        return;
      }
  
      // Making sure all fields are filled
      if (!userData.email) {
        console.error('Email cannot be empty');
        return;
      }

      // Making the POST request to create the user
      const response = await axios.post('http://localhost:5000/users', userData);
      console.log('User created:', response.data);

      onClose(); // Close the dialog after creating
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className='create-dialog' maxWidth="md" fullWidth>
      <DialogTitle className='dialog-title'>Create User
      <IconButton className='close-button' onClick={onClose}>x</IconButton>
      </DialogTitle>
      <DialogContent>
        <UserDetails />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='cancel-button'>Cancel</Button>
        <Button onClick={handleCreateAction} className='create-button'>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
