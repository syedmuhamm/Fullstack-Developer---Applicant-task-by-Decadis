
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

// endpoint for getting all users GET /users
app.get('/users', (req, res) => {
  const sqlQuery = "SELECT * FROM users";
  database.query(sqlQuery, (error, data) => {
    if(error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(data);
  });
});

// endpoint for getting a user by ID GET /user/{id}
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sqlQuery = "SELECT * FROM users WHERE id = ?";
  database.query(sqlQuery, [userId], (error, data) => {
    if (error) {
      console.error('Error fetching user by ID:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(data[0]);
  });
});

// endpoint for creating user POST /users
app.post('/users', (req, res) => {
  const { firstName, lastName, email } = req.body;
  //will put a check here
  const sqlQuery = "INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)";
  database.query(sqlQuery, [firstName, lastName, email], (error, result) => {
    if (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const userId = result.insertId; 
    console.log('User created successfully');
    return res.status(201).json({ message: 'User created successfully', userId: userId });
  });
});

// endpoint for updating a user PUT /user/{id}
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


// endpoint for deleting a user DELETE /user/{id}
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

// endpoint for handling action requests POST /action
app.post('/action', (req, res) => {
  const { user, action } = req.body;

  const isAllowed = true; // assuming all users are allowed to execute any action

  if (isAllowed) {
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

module.exports = app;
