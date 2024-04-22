import React from 'react';
import './UserDetails.scss';

interface UserDetailsProps {
  user?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  editable?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Component: UserDetails
 * Description: Displays user details with options for editing. 
 * Allows toggling of checkboxes for various user actions. 
 * 
 * Utilizes custom styling with UserDetails.scss.
 */

const UserDetails: React.FC<UserDetailsProps> = ({ user, editable = true, onChange }) => {
  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="user-details-dialog">
      <div className="header"></div>
      <div className="form-group">
      <div className="form-field"></div>
        <label>Firstname</label>
        <input className='text-input' type="text" id='firstName' name='firstName' defaultValue={user?.firstName} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Lastname</label>
        <input type="text" id='lastName' name='lastName' defaultValue={user?.lastName} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="text" id='email' name='email' defaultValue={user?.email} onChange={onChange} />
      </div>
      {editable && (
        <div className="actions">
          <h3>Actions</h3>
          <div>
            <label>
              <input type="checkbox" disabled={!editable} onChange={handleCheckboxChange} /> Create item
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" disabled={!editable} onChange={handleCheckboxChange} /> Delete item
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" onChange={handleCheckboxChange} /> View item
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" onChange={handleCheckboxChange} /> Move item
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
