const request = require('supertest');
const app = require('./server'); // Express app is exported from a separate file named server.js

let userId; // Variable to store the fetched user ID

// Block for user management API tests
describe('User Management API', () => {

   // Fetch existing user before tests
   beforeAll(async () => {
    const response = await request(app).get('/users');
    if (response.body.length > 0) {
      userId = response.body[0].id;
    }
  });

  // Test POST /users
  describe('POST /users', () => {
    it('creates a new user with valid data and responds with a success message', async () => {
      const userData = {
        firstName: 'post',
        lastName: 'user',
        email: 'post.user@email.com',
        actions: 'go'
      };
      
      const response = await request(app)
        .post('/users')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.userId).toBeDefined();
    });

    it('fails to create a new user with missing required fields', async () => {
      const userData = {
        firstName: 'missingFieldsUser'
      };
      
      const response = await request(app)
        .post('/users')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('All fields are required');
    });

    it('fails to create a new user with invalid email format', async () => {
      const userData = {
        firstName: 'invalidEmailUser',
        lastName: 'user',
        email: 'invalidemail.com'
      };
      
      const response = await request(app)
        .post('/users')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid email format');
    });
  });

  // Test GET /users
  describe('GET /users', () => {
    it('responds with JSON containing all users when database is not empty', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('responds with JSON containing an empty array when database is empty', async () => {
      // Since, I have currently not implemeted to delete all users, for this test to pass,
      // i am manually emptying the database. 

      // In future, I would make a function, that is called here and deletes all data. 
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);

      // and then make another function that create another user for testing, as this user should be
      // deleted by delete test later. 
    });
  });

  // Test GET /users/:id
  describe('GET /users/:id', () => {
    it('responds with JSON containing the user with the specified ID when ID exists', async () => {
      // Assuming there's at least one user in the database
      const response = await request(app).get(`/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(userId);
    });

    it('responds with 404 error when user with the specified ID does not exist', async () => {
      // Assuming there's no user with this ID in the database
      const nonExistingUserId = 9999;
      const response = await request(app).get(`/users/${nonExistingUserId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });
  });

  // Test PUT /users/:id
  describe('PUT /users/:id', () => {
    it('updates an existing user with valid data and responds with a success message', async () => {
      // Assuming there's at least one user in the database
      const updatedUserData = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        email: 'updated.email@email.com',
        actions: 'go'
      };
      
      const response = await request(app)
        .put(`/users/${userId}`)
        .send(updatedUserData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User updated successfully');
    });

    it('responds with 404 error when trying to update a user with non-existing ID', async () => {
      // Assuming there's no user with this ID in the database
      const nonExistingUserId = 999999999;
      const updatedUserData = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        email: 'updated.email@email.com',
        actions: 'go'
      };
      
      const response = await request(app)
        .put(`/users/${nonExistingUserId}`)
        .send(updatedUserData);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });

  });

  // Test DELETE /users/:id
  describe('DELETE /users/:id', () => {
    it('deletes an existing user and responds with a success message', async () => {
      // Assuming there's at least one user in the database
      const response = await request(app).delete(`/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User deleted successfully');
    });

    it('responds with 404 error when trying to delete a user with non-existing ID', async () => {
      // Assuming there's no user with this ID in the database
      const nonExistingUserId = 999999999;
      
      const response = await request(app).delete(`/users/${nonExistingUserId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });
  });
});
