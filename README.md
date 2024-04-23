# Fullstack-Developer---Applicant-task-by-Decadis
Task for Decadis, as a part of hiring process. 


Guide to run this app on another machine locally: 

1. Create Folder Structure:
   - Create a new folder named `decadis-task`.
   - Open this folder in your preferred text editor or IDE (e.g., VS Code).

2. Clone Repository:
   - Open the terminal and clone the repository using the command:
     git clone https://github.com/syedmuhamm/Fullstack-Developer---Applicant-task-by-Decadis.git .

3. Install Frontend Dependencies:
   - Navigate to the `frontend` directory.
   - Run:
     npm install
   - Start the frontend ( ile. decadis-task): 
     npm start

4. Set Up Backend:
   - Install XAMPP.
   - Create a new database named `applicant-task-by-decadis`.
   - Within this database, create a table named `users` with columns: `id`, `firstName`, `lastName`, `email`, `actions`.

5. Install Backend Dependencies:
   - Navigate to the `backend` directory.
   - Run:
     npm install axios cors express mysql
   - For devDependencies, run:
     npm install --save-dev jest nodemon supertest

6. Start Backend Server:
   - Run:
     npm start dev

7. Install Node.js:
   - Download and install Node.js if not already installed.

8. Testing:
   - Open another terminal.
   - Run ( pne of two):
     npm test
     OR
     npx jest userRoutes.test.js


Guide completed! Great :)



Activity while making the app:

18.04.2024

Started the task from frontend, by creating a react app and installing dependencies for typescript, sass, material ui. The plan is to make frontend first, 
use dummy data in frontend for populution, and then make a backend later and connect it to the existing frontend components.

Made components, pages and services folder and made respective files for each folder. 

Made pages for each view, i.e viewing a user, creating a user, updating a user, but then noticed that the Mockup has been set up as a dialog.
So, I changed logic again to set up some components as a dialog, and main view i.e. viewing all users as a route to localhost/3000. 

I have decided to leave the orignal code for separate pages for each view, in the first commit. 

There were changes made during execution regarding code optimization, and there are possible places at this point to add more code optimization, clarification ( comments etc).

21.04.2024

installed dependencies for backend.

Started Node.js and express with mocked data and established a connection with frontend. Then decided to with mysql, as backend, made a database and a table and established connection via node.js.

Created endpoints for viewing, creating and deleting users. 

Implemented logic to faciliate endpoints in frontend.


22.04.2024

Code optimizations, i.e introduction of custom hooks

Code cleaning, i.e removing redundant code.

Introducing comments for better understading of each component. 

Introduced testing for backend CRUD operations with id. 

Performed testing. 


