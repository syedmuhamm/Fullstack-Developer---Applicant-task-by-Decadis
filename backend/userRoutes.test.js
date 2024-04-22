const request = require('supertest');
const app = require('./server'); // Express app is exported from a separate file named server.js

// Function to fetch an existing user ID from the database
async function fetchExistingUserIdFromDatabase() {
  return new Promise((resolve, reject) => {
    // Establish a connection to the MySQL database
    const database = require('mysql').createConnection({
      host: "localhost",
      user: "root",
      password: '',
      database: "applicant-task-by-decadis"
    });

    // Connect to the database
    database.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      // Query to fetch the first user ID
      const sqlQuery = "SELECT id FROM users LIMIT 1";

      // Execute the query
      database.query(sqlQuery, (error, result) => {
        // Close the database connection
        database.end();

        if (error) {
          reject(error);
        } else {
          // Check if any user ID was found
          if (result.length > 0) {
            // Resolve with the retrieved user ID
            resolve(result[0].id);
          } else {
            // Reject if no user ID was found
            reject(new Error("No user ID found in the database"));
          }
        }
      });
    });
  });
}

// Populate the database with initial data if it's empty
async function populateDatabaseIfEmpty() {
  // Check if the database has any users
  const existingUserId = await fetchExistingUserIdFromDatabase().catch(() => null);

  // If the database is empty, insert initial data
  if (!existingUserId) {
    console.log("Database is empty. Creating a new user...");

    // Define the new user data
    const newUser = {
      firstName: 'New',
      lastName: 'user',
      email: 'new.user@example.com',
      actions: 'go'
    };

    try {
      // Send a POST request to create a new user
      const response = await request(app)
        .post('/users')
        .send(newUser);

      // Check if the user creation was successful
      if (response.status === 201) {
        console.log('New user created successfully:', response.body);
      } else {
        console.error('Failed to create a new user:', response.body);
      }
    } catch (error) {
      console.error('Error creating a new user:', error);
    }
  }
}




// Block for user management API tests
describe('User Management API', () => {

  // Run this before running any tests in this describe block
  beforeAll(async () => {
    await populateDatabaseIfEmpty();
  });
  // Test POST /users endpoint
  describe('POST /users', () => {
    it('creates a new user and responds with a success message', async () => {
      // Define the user data to be sent in the request body
      const userData = {
        firstName: 'post',
        lastName: 'user',
        email: 'post.user@email.com',
        actions: 'go'
      };

      // Send a POST request to create a new user
      const response = await request(app)
        .post('/users')
        .send(userData);

      // Assert the response status is 201 (Created)
      expect(response.status).toBe(201);

      // Assert the response body contains a success message
      expect(response.body.message).toBe('User created successfully');
    });
  });

  // Test PUT /users/:id endpoint
  describe('PUT /users/:id', () => {
    it('updates an existing user and responds with a success message', async () => {
      // fetch an existing user ID from the database
      const existingUserId = await fetchExistingUserIdFromDatabase();

      // Define the updated user data to be sent in the request body
      const updatedUserData = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        email: 'updated.email@email.com',
        action: 'go'
      };

      // Construct the endpoint URL using the retrieved user ID
      const endpoint = `/users/${existingUserId}`;

      // Send a PUT request to update the user
      const response = await request(app)
        .put(endpoint)
        .send(updatedUserData);

      // Assert the response status is 200 (OK)
      expect(response.status).toBe(200);

      // Assert the response body contains a success message
      expect(response.body.message).toBe('User updated successfully');
    });
  });

  // Test GET /users endpoint
  describe('GET /users', () => {
    it('responds with JSON containing all users', async () => {
      // Send a GET request to fetch all users
      const response = await request(app)
        .get('/users');

      // Assert the response status is 200 (OK)
      expect(response.status).toBe(200);

      // Assert the response body is defined
      expect(response.body).toBeDefined();

      // Additional assertions
      // Assuming user data contains an array of users
      expect(Array.isArray(response.body)).toBe(true);
      // Assuming each user object has an "id" field, we can check if the response contains at least one user
      expect(response.body.length).toBeGreaterThan(0);
      // Assuming each user object has certain fields like "firstName", "lastName", "email", etc., we can further validate them
      response.body.forEach(user => {
        expect(user.id).toBeDefined();
        expect(user.firstName).toBeDefined();
        expect(user.lastName).toBeDefined();
        expect(user.email).toBeDefined();
      });
    });
  });

  // Test DELETE /users/:id endpoint
  describe('DELETE /users/:id', () => {
    it('deletes an existing user and responds with a success message', async () => {
      // fetch an existing user ID from the database
      const existingUserId = await fetchExistingUserIdFromDatabase();

      // Construct the endpoint URL using the retrieved user ID
      const endpoint = `/users/${existingUserId}`;

      // Send a DELETE request to delete the user
      const response = await request(app)
        .delete(endpoint);

      // Assert the response status is 200 (OK)
      expect(response.status).toBe(200);

      // Assert the response body contains a success message
      expect(response.body.message).toBe('User deleted successfully');
    });
  });

  // Test GET /users/:id endpoint
  describe('GET /users/:id', () => {
    it('responds with JSON containing the user with the specified ID', async () => {
      // fetch an existing user ID from the database
      const existingUserId = await fetchExistingUserIdFromDatabase();

      // Construct the endpoint URL using the retrieved user ID
      const endpoint = `/users/${existingUserId}`;

      // Send a GET request to the constructed endpoint
      const response = await request(app).get(endpoint);

      // Assert the response status is 200 (OK)
      expect(response.status).toBe(200);

      // Assert the response body is defined
      expect(response.body).toBeDefined();

      // Add additional assertions as needed based on the structure of our user data
      // Assuming user data contains an "id" field
      expect(response.body.id).toBe(existingUserId);
    });
  });
});
