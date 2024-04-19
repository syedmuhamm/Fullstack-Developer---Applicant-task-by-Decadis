import React, { useState } from 'react';
import './CreateUserForm.scss';
import { createUser } from '../../services/userService';

const CreateUserForm: React.FC = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(username);
      alert('User created successfully');
    } catch (error) {
      alert('Error creating user');
    }
  };

  return (
    <form className="create-user-form" onSubmit={handleSubmit}> 
      <div className="input-field"> 
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      <button className="submit-button" type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
