
const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');

// Using CORS as middleware
app.use(cors());
// Parse JSON bodies
app.use(express.json());

const port = 5000;
// Leaving here as a reference, was made before making database
// app.get('/', (req, res) => {
//     const mockUsers = [
//         { id: 1, firstName: 'user1$', lastName: 'lastname', email: "email1@email.com", action: "jump" },
//         { id: 2, firstName: 'user2$', lastName: 'lastname', email: "email2@email.com", action: "run" },
//         { id: 3, firstName: 'user3$', lastName: 'lastname', email: "email3@email.com", action: "walk" },
//         { id: 4, firstName: 'user4$', lastName: 'lastname', email: "email4@email.com", action: "jog" }
//     ];
//     res.json({ users: mockUsers });
// });

//connection to database
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "applicant-task-by-decadis"
})

// ednpoint for getting all users
app.get('/users', (req, res) => {
  const sqlQuery = "SELECT * FROM users";
  database.query(sqlQuery, (error, data) => {
    if(error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(data);
  });
});

// endpoint for creating user
app.post('/users', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const sqlQuery = "INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)";
  database.query(sqlQuery, [firstName, lastName, email], (error, result) => {
    if (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('User created successfully');
    return res.status(201).json({ message: 'User created successfully' });
  });
});

// endpoint for updating a user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email } = req.body;
  const sqlQuery = "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?";
  database.query(sqlQuery, [firstName, lastName, email, userId], (error, result) => {
    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('User updated successfully');
    return res.status(200).json({ message: 'User updated successfully' });
  });
});


// endpoint for deleting a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sqlQuery = "DELETE FROM users WHERE id = ?";
  database.query(sqlQuery, [userId], (error, result) => {
    if (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('User deleted successfully');
    return res.status(200).json({ message: 'User deleted successfully' });
  });
});

// endpoint for handling action requests
app.post('/action', (req, res) => {
  const { user, action } = req.body;

  // Check if the user is allowed to execute the action
  // This is a placeholder logic, replace it with your actual permission logic
  const isAllowed = true; // Example: Assuming all users are allowed to execute any action

  if (isAllowed) {
    // Execute the action here (you can add your logic)
    console.log(`Action '${action}' executed successfully for user '${user.firstName} ${user.lastName}'.`);
    res.status(200).json({ message: `Action '${action}' executed successfully for user '${user.firstName} ${user.lastName}'.` });
  } else {
    res.status(401).json({ error: `User '${user.firstName} ${user.lastName}' is not allowed to execute the action '${action}'.` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
