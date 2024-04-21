import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UserDetails from '../UserDetails/UserDetails';
import { UserListProps } from '../UserList/UserList'; 
import axios from 'axios';

interface CreateUserDialogProps {
  // user: UserListProps | null;
  open: boolean;
  onClose: () => void;
}

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

      const userData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
      };

      // Making sure all fields are filled
      if (!userData.firstName || !userData.lastName || !userData.email) {
        console.error('All fields are required');
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <UserDetails />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateAction} className='update-button'>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
