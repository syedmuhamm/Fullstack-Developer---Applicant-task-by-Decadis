import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { UserListProps } from '../UserList/UserList';
import axios from 'axios';

interface RunActionForUserDialogProps {
  user: UserListProps | null;
  open: boolean;
  onClose: () => void;
  onRunAction: () => void; 
}

/**
 * Component: RunActionForUserDialog
 * Description: Dialog to select and execute an action for a user.
 * Performs HTTP POST request to execute the selected action.
 * 
 * Uses Material-UI components and axios for HTTP requests.
 */

const RunActionForUserDialog: React.FC<RunActionForUserDialogProps> = ({ user, open, onClose, onRunAction}) => {
  const [selectedAction, setSelectedAction] = useState<string>('create'); // Default action

  // Handler for run action
  const handleRunAction = async () => {
    try {
      const response = await axios.post('http://localhost:5000/action', { user, action: selectedAction });
      console.log(response.data.message); // Log success message
      onRunAction(); // Trigger action callback
      onClose(); // Close the dialog
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error('Error executing action:', error.response.data.error); // Log error message
      } else {
        console.error('Error executing action:', error.message); // Log error message if no specific error message is available
      }
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Run action</DialogTitle>
      <DialogContent>
        <label htmlFor="action">Select action:</label>
        <select id="action" value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
            <option value="action">Do some action</option>
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
