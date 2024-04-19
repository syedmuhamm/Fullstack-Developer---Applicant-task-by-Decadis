import React, { useState } from 'react';
import './UserList.scss'; 
import EditUserDialog from '../Dialogs/EditUserDialog';
import CreateUserDialog from '../Dialogs/CreateUserDialog';
import DeleteUserDialog from '../Dialogs/DeleteUserDialog';
import RunActionForUserDialog from '../Dialogs/RunActionDialog';

export interface UserListProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const UserList: React.FC = () => {
  const mockUsers: UserListProps[] = [
    { id: 1, firstName: 'user1', lastName: 'lastname', email: " email1@email.com" },
    { id: 2, firstName: 'user2', lastName: 'lastname', email: " email2@email.com" },
    { id: 3, firstName: 'user3', lastName: 'lastname', email: " email3@email.com" },
    { id: 4, firstName: 'user4', lastName: 'lastname', email: " email4@email.com" },
  ];

  const [selectedUser, setSelectedUser] = useState<UserListProps | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRunActionDialogOpen, setIsRunActionDialogOpen] = useState(false);

  const handleEditButtonClick = (user: UserListProps) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteButtonClick = (user: UserListProps) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleRunActionButtonClick = (user: UserListProps) => {
    setSelectedUser(user);
    setIsRunActionDialogOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setIsRunActionDialogOpen(false);
  };

  const handleCreate = () => {
    // EMpty for now
  }

  const handleEdit = (user: UserListProps | null) => {
    // Empty function for now
  };

  const handleDelete = (user: UserListProps | null) => {
    // Empty function for now
  };
  
  const handleRunAction = (user: UserListProps | null) => {
    // Empty function for now
  };

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>User List</h2>
        <button className="create-button" onClick={() => setIsCreateDialogOpen(true)}>Create</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEditButtonClick(user)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteButtonClick(user)} className="delete-button" >Delete</button>
                <button onClick={()=> handleRunActionButtonClick(user)} className="run-action-button">Run action</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <CreateUserDialog user={selectedUser} open={isCreateDialogOpen} onClose={handleCloseModal} onCreate={() => handleCreate()} />
      {selectedUser && (
        <>
          <EditUserDialog user={selectedUser} open={isEditDialogOpen} onClose={handleCloseModal} onEdit={() => handleEdit(selectedUser)}/>
          <DeleteUserDialog user={selectedUser} open={isDeleteDialogOpen} onClose={handleCloseModal} onDelete={() => handleDelete(selectedUser)} />
          <RunActionForUserDialog user={selectedUser} open={isRunActionDialogOpen} onClose={handleCloseModal} onRunAction={() => handleRunAction(selectedUser)} />
        </>
      )}
    </div>
  );
};

export default UserList;
