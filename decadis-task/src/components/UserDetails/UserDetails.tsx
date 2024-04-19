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
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, editable = true }) => {
  return (
    <div className="user-details-dialog">
      <div className="header">
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" defaultValue={user?.firstName} readOnly={!editable} />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" defaultValue={user?.lastName} readOnly={!editable} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" defaultValue={user?.email} readOnly={!editable} />
      </div>
      {editable && (
        <div className="actions">
          <h3>Actions</h3>
          <div>
            <label><input type="checkbox" /> Create</label>
          </div>
          <div>
            <label><input type="checkbox" /> Delete</label>
          </div>
          <div>
            <label><input type="checkbox" /> View</label>
          </div>
          <div>
            <label><input type="checkbox" /> Move</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
