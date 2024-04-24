const request = require('supertest');
const app = require('./server'); // Express app is exported from a separate file named server.js

// Block for user management API tests
describe('User Management API', () => {
  // Test POST /users 
  describe('POST /users', () => {
    let createdUserId; // Variable to store the ID of the created user

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

      // Store the ID of the created user
      createdUserId = response.body.userId;
    });

      // Test PUT /users/:id endpoint
      describe('PUT /users/:id', () => {
        it('updates an existing user and responds with a success message', async () => {
          // Ensure the user ID from POST request is available
          expect(createdUserId).toBeDefined();
    
          // Define the updated user data to be sent in the request body
          const updatedUserData = {
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
            email: 'updated.email@email.com',
            action: 'go'
          };
    
          const endpoint = `/users/${createdUserId}`;
    
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

        // Test GET /users 
      describe('GET /users', () => {
        it('responds with JSON containing all users', async () => {
          // Send a GET request to fetch all users
          const response = await request(app)
            .get('/users');

          // Asserting the response status is 200 (OK)
          expect(response.status).toBe(200);

          // Asserting the response body is defined
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

      // Test GET /users/:id 
      describe('GET /users/:id', () => {
        it('responds with JSON containing the user with the specified ID', async () => {
          // fetch an existing user ID from the database
          // const existingUserId = await fetchExistingUserIdFromDatabase();
          expect(createdUserId).toBeDefined();

          const endpoint = `/users/${createdUserId}`;

          // Send a GET request to the constructed endpoint
          const response = await request(app).get(endpoint);

          // Assert the response status is 200 (OK)
          expect(response.status).toBe(200);

          // Assert the response body is defined
          expect(response.body).toBeDefined();

          expect(response.body.id).toBe(createdUserId);
        });
      });

      // Test DELETE /users/:id endpoint
      describe('DELETE /users/:id', () => {
        it('deletes the user created in the POST request and responds with a success message', async () => {
          // Ensure the user ID from POST request is available
          expect(createdUserId).toBeDefined();
    
          // Construct the endpoint URL using the created user ID
          const endpoint = `/users/${createdUserId}`;
    
          // Send a DELETE request to delete the user
          const response = await request(app)
            .delete(endpoint);
    
          // Assert the response status is 200 (OK)
          expect(response.status).toBe(200);
    
          // Assert the response body contains a success message
          expect(response.body.message).toBe('User deleted successfully');
        });
      });
  });
});
