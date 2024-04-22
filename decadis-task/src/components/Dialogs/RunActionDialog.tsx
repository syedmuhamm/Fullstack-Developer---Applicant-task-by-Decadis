import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { UserListProps } from '../UserList/UserList';
import axios from 'axios';
import './AllDialogCommonStyling.scss';

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
    <Dialog open={open} onClose={onClose} className='run-action-dialog' maxWidth="md" fullWidth>
      <DialogTitle className='dialog-title'>Run action</DialogTitle>
      <DialogContent className='run-action-dialog-content'>
        <label htmlFor="action" className='run-action-dialog-label'>Select action</label>
        <select id="action" className='run-action-dialog-select' value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
            <option value="action">Create item</option>
        </select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='cancel-button'>Cancel</Button>
        <Button onClick={handleRunAction} className='run-action-run-button'>Run</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RunActionForUserDialog;
