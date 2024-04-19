import React from 'react';
import './UserListPage.scss'; 
import UserList from '../../components/UserList/UserList';

const UserListPage: React.FC = () => {
  return (
    <div className="user-list-page"> 
      <UserList />
    </div>
  );
};

export default UserListPage;