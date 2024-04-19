// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import UserDetails from '../components/UserDetails';
// // import { fetchUserById } from '../services/userService';

// // const UserDetailsPage: React.FC = () => {
// //   const { userId } = useParams<{ userId: string }>();
// //   const [user, setUser] = useState<any | null>(null);

// //   useEffect(() => {
// //     const getUser = async () => {
// //       const fetchedUser = await fetchUserById(Number(userId));
// //       setUser(fetchedUser);
// //     };
// //     getUser();
// //   }, [userId]);

// //   return (
// //     <div>
// //       {user ? <UserDetails user={user} /> : <p>Loading...</p>}
// //     </div>
// //   );
// // };

// // export default UserDetailsPage;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; 
// import UserDetails from '../../components/UserDetails/UserDetails';
// import { mockUsers } from '../../components/UserList/UserList'; 
// import './UserDetailsPage.scss'; // Import SCSS file

// const UserDetailsPage: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [user, setUser] = useState<any | null>(null);

//   useEffect(() => {
//     const selectedUser = mockUsers.find((user) => user.id === Number(userId));
//     setUser(selectedUser);
//   }, [userId]);

//   return (
//     <div className="user-details-page">
//       {user ? <UserDetails user={user} /> : <p>Loading...</p>}
//     </div>
//   );
// };


// export default UserDetailsPage;


export {}