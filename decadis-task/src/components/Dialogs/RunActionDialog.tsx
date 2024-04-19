import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { UserListProps } from '../UserList/UserList';

interface RunActionForUserDialogProps {
  user: UserListProps | null;
  open: boolean;
  onClose: () => void;
  onRunAction: () => void; 
}

const RunActionForUserDialog: React.FC<RunActionForUserDialogProps> = ({ user, open, onClose, onRunAction}) => {
  // Handler for run action
  const handleRunAction = () => {
    onRunAction();
    onClose(); // Close the dialog after run action complete
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Run action</DialogTitle>
      <DialogContent>
        <label htmlFor="action">Select action:</label>
        <select id="action">
            <option value="create">Create item</option>
            <option value="update">Update item</option>
        </select>
    </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRunAction} className='delete-button'>Run</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RunActionForUserDialog;
