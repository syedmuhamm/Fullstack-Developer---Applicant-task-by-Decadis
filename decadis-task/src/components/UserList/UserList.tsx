import React, { useEffect, useState } from 'react';
import './UserList.scss'; 
import EditUserDialog from '../Dialogs/EditUserDialog';
import CreateUserDialog from '../Dialogs/CreateUserDialog';
import DeleteUserDialog from '../Dialogs/DeleteUserDialog';
import RunActionForUserDialog from '../Dialogs/RunActionDialog';
import axios from 'axios';
import useManageDialogStatus from '../CustomHooks/useManageDialogStatus';

export interface UserListProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ErrorProps {
  errors: { label: string, message: string }[];
}

/**
 * Component: UserList
 * Description: Renders a list of users with options for editing, deleting, and running actions. 
 * Utilizes Axios for fetching user data and managing CRUD operations. 
 * Integrates custom dialogs for user interactions.
 */

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserListProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserListProps | null>(null);

  // Integrate custom hook for managing dialog state
  const createDialog = useManageDialogStatus();
  const editDialog = useManageDialogStatus();
  const deleteDialog = useManageDialogStatus();
  const runActionDialog = useManageDialogStatus();

// Gets user information from the server, updates what is shown on the page, and lets us know with console error.
const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // To render the dom and update users table after a change
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditButtonClick = (user: UserListProps) => {
    setSelectedUser(user);
    editDialog.openDialog();
  };
  
  const handleDeleteButtonClick = (user: UserListProps) => {
    setSelectedUser(user);
    deleteDialog.openDialog();
  };

  const handleRunActionButtonClick = (user: UserListProps) => {
    setSelectedUser(user);
    runActionDialog.openDialog();
  };

  // used to close dialogs, and fetch users after closing. 
  const handleCloseModal = () => {
    setSelectedUser(null);
    createDialog.closeDialog();
    editDialog.closeDialog(); 
    deleteDialog.closeDialog(); 
    runActionDialog.closeDialog(); 
    fetchUsers();
  };
  
  // Handlers for edit, delete, and run action
  const handleEdit = async () => {
    handleCloseModal();
  };

  const handleDelete = async () => {
    handleCloseModal();
  };

  const handleRunAction = async () => {
    handleCloseModal();
  };

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>User List</h2>
        <button className="create-button" onClick={createDialog.openDialog}>Create</button>
      </div>
      <div className="table-wrapper">
        <table className='user-table'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td className='action-buttons'>
                  <button onClick={() => handleEditButtonClick(user)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteButtonClick(user)} className="delete-button" >Delete</button>
                  <button onClick={() => handleRunActionButtonClick(user)} className="run-action-button">Run action</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Render dialogs */}
      <CreateUserDialog open={createDialog.isOpen} onClose={handleCloseModal} />
      {selectedUser && (
        <>
          <EditUserDialog user={selectedUser} open={editDialog.isOpen} onClose={handleCloseModal} onEdit={handleEdit}/>
          <DeleteUserDialog user={selectedUser} open={deleteDialog.isOpen} onClose={handleCloseModal} onDelete={handleDelete}  />
          <RunActionForUserDialog user={selectedUser} open={runActionDialog.isOpen} onClose={handleCloseModal} onRunAction={handleRunAction} />
        </>
      )}
    </div>
  );
};

export default UserList;
