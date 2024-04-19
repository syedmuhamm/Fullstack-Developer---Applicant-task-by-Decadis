import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UserDetails from '../UserDetails/UserDetails';
import { UserListProps } from '../UserList/UserList'; // Import UserListProps type


interface EditUserDialogProps {
  user: UserListProps | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void; 
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, open, onClose, onEdit }) => {
  // Handler for run action
  const handleEdit = () => {
    onEdit();
    onClose(); // Close the dialog after deleting
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <UserDetails user={user} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleEdit} className='update-button'>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
