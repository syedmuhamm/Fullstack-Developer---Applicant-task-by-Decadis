import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UserDetails from '../UserDetails/UserDetails';
import { UserListProps } from '../UserList/UserList'; 


interface CreateUserDialogProps {
  user: UserListProps | null;
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ user, open, onClose, onCreate }) => {
  // Handler for create action
  const handleCreateAction = () => {
    onCreate();
    onClose(); // Close the dialog after creating
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <UserDetails user={user} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateAction} className='update-button'>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
