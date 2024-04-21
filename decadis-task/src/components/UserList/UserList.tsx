import React, { useEffect, useState } from 'react';
import './UserList.scss'; 
import EditUserDialog from '../Dialogs/EditUserDialog';
import CreateUserDialog from '../Dialogs/CreateUserDialog';
import DeleteUserDialog from '../Dialogs/DeleteUserDialog';
import RunActionForUserDialog from '../Dialogs/RunActionDialog';
import axios from 'axios';


export interface UserListProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const UserList: React.FC = () => {

  const [users, setUsers] = useState<UserListProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserListProps | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRunActionDialogOpen, setIsRunActionDialogOpen] = useState(false);

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    fetchUsers(); // Refetch users after closing any dialog
  };
  
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
        {users && users.map((user) => (
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
      
      <CreateUserDialog open={isCreateDialogOpen} onClose={handleCloseModal} />
      {selectedUser && (
        <>
          <EditUserDialog user={selectedUser} open={isEditDialogOpen} onClose={handleCloseModal} onEdit={handleEdit}/>
          <DeleteUserDialog user={selectedUser} open={isDeleteDialogOpen} onClose={handleCloseModal} onDelete={handleDelete}  />
          <RunActionForUserDialog user={selectedUser} open={isRunActionDialogOpen} onClose={handleCloseModal} onRunAction={handleRunAction} />
        </>
      )}
    </div>
  );
};

export default UserList;
