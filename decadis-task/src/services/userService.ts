// import axios from 'axios';

// const API_URL = 'http://backend-url/api/users';

// export const fetchAllUsers = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// export const createUser = async (username: string) => {
//   const response = await axios.post(API_URL, { username });
//   return response.data;
// };

// // will add more functions for fetching, updating, and deleting users as needed
// src/services/userService.ts

const mockUsers = [
  { id: 1, username: 'user1' },
  { id: 2, username: 'user2' },
  { id: 3, username: 'user3' },
];

export const fetchAllUsers = async () => {
  return mockUsers;
};

export const createUser = async (username: string) => {
  // Simulate creating a user (not needed for now)
  return { id: Date.now(), username };
};

// will add more mock functions for updating and deleting users if needed

