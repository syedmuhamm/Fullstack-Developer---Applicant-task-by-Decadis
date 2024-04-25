import React from 'react';
import './UserDetails.scss';
import { TextField } from '@mui/material';
import { ErrorProps } from '../UserList/UserList';

interface UserDetailsProps {
  user?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  editable?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: ErrorProps;
  clearError: (label: string) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, editable = true, onChange, error, clearError }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    onChange && onChange(event);
    // Clear error when user starts typing
    clearError(name);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, checkboxName: string) => {
    const isChecked = event.target.checked;
    console.log(`Checkbox ${checkboxName} status: ${isChecked}`);
  };

  return (
    <div className="user-details-dialog">
      <div className="header"></div>
      <div className={`form-group ${error.errors.some(err => err.label === "firstName") ? "error" : "" }`}>
        <label>Firstname</label>
        <TextField 
          error={error.errors.some(err => err.label === "firstName")}
          id="firstName"
          name="firstName"
          defaultValue={user?.firstName}
          onChange={handleInputChange}
          disabled={!editable}
          variant="outlined"
          helperText={error.errors.find(err => err.label === "firstName")?.message}
          sx={{
            "& fieldset": { border: 'none' },
          }}
        />
      </div>
      <div className={`form-group ${error.errors.some(err => err.label === "lastName") ? "error" : "" }`}>
        <label>Lastname</label>
        <TextField 
          error={error.errors.some(err => err.label === "lastName")}
          id="lastName"
          name="lastName"
          defaultValue={user?.lastName}
          onChange={handleInputChange}
          disabled={!editable}
          variant="outlined"
          helperText={error.errors.find(err => err.label === "lastName")?.message}
          sx={{
            "& fieldset": { border: 'none' },
          }}
        />
      </div>
      <div className={`form-group ${error.errors.some(err => err.label === "email") ? "error" : "" }`}>
        <label>Email</label>
        <TextField 
          error={error.errors.some(err => err.label === "email")}
          id="email"
          name="email"
          defaultValue={user?.email}
          onChange={handleInputChange}
          disabled={!editable}
          variant="outlined"
          helperText={error.errors.find(err => err.label === "email")?.message}
          sx={{
            "& fieldset": { border: 'none' },
          }}
        />
      </div>
      {editable && (
        <div className="actions">
          <h3>Actions</h3>
          <div>
            <label>
              <input type="checkbox" disabled={!editable} onChange={(e) => handleCheckboxChange(e, 'Create item')} /> Create item
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" disabled={!editable} onChange={(e) => handleCheckboxChange(e, 'Delete item')} /> Delete item
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" onChange={(e) => handleCheckboxChange(e, 'View item')} /> View item
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" onChange={(e) => handleCheckboxChange(e, 'Move item')} /> Move item
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;