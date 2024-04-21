import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UserDetails from '../UserDetails/UserDetails';
import { UserListProps } from '../UserList/UserList'; // Import UserListProps type
import axios from 'axios';

interface EditUserDialogProps {
  user: UserListProps | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, open, onClose, onEdit }) => {
  const [updatedUser, setUpdatedUser] = useState<UserListProps | null>(user);

  // Update the local state when the user makes changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!updatedUser) return;
    const { name, value } = event.target;
    setUpdatedUser((prevState: UserListProps | null) => ({
      id: prevState?.id || 0, // defaulting to 0 if it's undefined
      firstName: prevState?.firstName || '', //defaulting to an empty string if it's undefined
      lastName: prevState?.lastName || '', //defaulting to an empty string if it's undefined
      email: prevState?.email || '', //defaulting to an empty string if it's undefined
      [name]: value,
    }));
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <UserDetails
          user={updatedUser}
          editable={true}
          onChange={handleChange} // Passing the handleChange function to handle user input changes
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} className='update-button'>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
