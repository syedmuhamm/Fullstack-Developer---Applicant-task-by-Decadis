import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { UserListProps } from '../UserList/UserList';
import axios from 'axios';

interface DeleteUserDialogProps {
  user: UserListProps | null;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, open, onClose, onDelete }) => {
  // Handler for delete action
  const handleDeleteAction = async () => {
    try {
      if (!user) return;
      const response = await axios.delete(`http://localhost:5000/users/${user.id}`);
      console.log(response.data);
      onDelete(); // callback, will help rerender user table after deleting
      onClose(); // Close the dialog after deleting
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <p>Do you really want to delete user {user?.firstName} {user?.lastName}?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDeleteAction} className='delete-button'>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;