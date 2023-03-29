# KSQUARE - API DESIGNER
## Code Challenge
### Presented by: Luis Eduardo Villela Zavala

**Instructions:** https://alvaritokore.notion.site/KSQUARE-API-DESIGNER-e8b31f7790f64d5eaf20436f50e09c49

The API was built using Express.JS and Node.JS to build the backend. The database used for the project is MySQL. 
Also, a quick research about JSON Web Tokens (JWT) was done. Deriving of the results of this research I was able to enable the JWT Token Authentication.

The API is composed mainly by one file named "index.js". That file is composed by required libraries declarations, database connection, JWT Token validation and the required routes to complete all the API requirements. 

The database is stored into ksquare_tasks.sql file, located into the Database folder. Just import it to MySQL server to make the necessary tests. 
NOTE: At index.js file, there is an object called dbConnection. You must update login data (host, user and password) depending of your local MySQL configurations. 
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'Proof1234',
    database: 'KSQuare'
})

To execute the project, you have two ways to do it: 
1. Download the project using a Github pull, import the database to MySQL and execute the project. To execute the project follow the next steps: 
    * Open a Terminal and go to the project directory (The route depends of the directory you used to make the pull).
    * Just type 'node index.js' or 'nodemon index.js' to execute it.
2. Once you have the project under execution, open Postman, import the workspace using the Test.postman_collection.json file and proceed to execute each endpoint.
    * NOTE: If you get a "Forbidden" as an answer when you are executing the tests, you will need to create a new token. To do it, go to the endpoint named "Login with JSON Web Tokens (JWT)", execute it and copy the new token value. Paste the new token into each other endpoints (Headers --> Authorization --> Value, delete old token and paste it after Bearer). The Authotization value must be "Bearer 'token'".

### List of Postman parameters for each endpoint (Other than Headers --> Authorization)

#### Login with JSON Web Tokens (JWT)
None

#### GET /tasks: Return a list of all tasks
None

#### POST /tasks: Create a new task and return its information.
At Body, choose the option "raw" and select "JSON" to write a JSON object with this structure: 
{
    "title: "",
    "description": "",
    "dueDate": "", (A value in DATE datatype, with structure "2023-03-29" (YEAR/MONTH/DAY))
    "status": "In Progress" / "Pending" / "Complete" (Only one of this options)
}

An example can be seen directly in Postman.

#### GET /tasks/:id: Return information for a specific task by its ID.
At Params, go to Path Variables.
id --> Numeric id value 

#### PUT /tasks/:id: Update the information of a task by its ID.
For this test case, you need to send a task ID and the specific parameters to update it.

At Params, go to Path Variables.
id --> Numeric id value 

At Body, choose the option "raw" and select "JSON" to write a JSON object with this structure: 
{
    "title: "",
    "description": "",
    "dueDate": "", 
    "status": "In Progress" / "Pending" / "Complete" 
}

The endpoint is configured to receive any parameters combination, you can send just one, two or three parameters to update a task if you want to.
{
    "title: ""
}

{
    "description": ""
}

{
    "dueDate": ""
}

{
    "status": "In Progress" / "Pending" / "Complete" 
}

{
    "title: "",
    "description": ""
}

{
    "title: "",
    "dueDate": ""
}

{
    "title: "",
    "status": "In Progress" / "Pending" / "Complete" 
}

{
    "description": "",
    "dueDate": ""
}

{
    "description": "",
    "status": "In Progress" / "Pending" / "Complete" 
}

{
    "dueDate": "", 
    "status": "In Progress" / "Pending" / "Complete" 
}

{
    "title: "",
    "description": "",
    "dueDate": ""
}

{
    "title: "",
    "description": "",
    "status": "In Progress" / "Pending" / "Complete" 
}

{
    "title: "",
    "dueDate": "", 
    "status": "In Progress" / "Pending" / "Complete" 
}

{
    "description": "",
    "dueDate": "", 
    "status": "In Progress" / "Pending" / "Complete" 
}

An example can be seen directly in Postman.

#### DELETE /tasks/:id: Delete a task by its ID.
At Params, go to Path Variables.
id --> Numeric id value 