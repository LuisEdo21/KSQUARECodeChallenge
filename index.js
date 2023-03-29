const express = require('express')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
var bodyParser = require('body-parser')

const app = express()
const port = 3000

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'Proof1234',
    database: 'KSQuare'
})

dbConnection.connect(err => {
    if(err)
    {
        console.log("The connection to the MySQL KSQuare Database is not working!")
        throw err
    }
    else 
    {
        console.log("MySQL KSQuare Database Connection is working!")
    }
    
})

//Enable body-parser to receive data using the body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('KSQuare API Designer Code Challenge - Luis Eduardo Villela Zavala')
})

app.post('/login', (req, res) => {
    const userData = {
        name: "LuisEdo_21",
        email: "luisedo21@gmail.com",
        phone: 3320094442
    }

    jwt.sign({user: userData}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
})

// Authorization: Bearer <token>
const validateToken = function(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== "undefined")
    {
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    }
    else 
    {
        res.sendStatus(403)
    }
}

// POST /tasks: Create a new task and return its information.
app.post('/tasks', validateToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err)
        {
            res.sendStatus(403)
        }
        else
        {
            const {title, description, dueDate, status} = req.body

            const MySQLQuery = "INSERT INTO Tasks (title, description, dueDate, status) VALUES ('"+ title +"', '"+ description +"', '"+ dueDate +"', '"+ status +"')"
        
            dbConnection.query(MySQLQuery, function(err, result) {
                if (err) 
                {
                    console.log("Something is wrong with this query!")
                    throw err
                }
                else 
                {
                    console.log("A new task was inserted into the database: ")
                    console.log(req.body)
                }
        
                res.status(200).json(req.body)
            })        
        }
    })
})

// GET /tasks: Return a list of all tasks.
app.get('/tasks', validateToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err) 
        {
            res.sendStatus(403)
        }
        else 
        {
            const MySQLQuery = "SELECT * FROM Tasks"

            dbConnection.query(MySQLQuery, function(err, result) {
                if (err) 
                {
                    console.log("Something is wrong with this query!")
                    throw err
                }
                else 
                {
                    console.log("=== LIST OF TASKS ===")
                    console.log(result)
                }

                res.status(200).json(result)
            })
        }
    })
})

// GET /tasks/:id: Return information for a specific task by its ID.
app.get('/tasks/:id', validateToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err)
        {
            res.sendStatus(403)
        }
        else
        {
            const idToQuery = req.params.id

            const MySQLQuery = "SELECT * FROM Tasks WHERE id='"+ idToQuery +"'"

            dbConnection.query(MySQLQuery, function(err, result) {
                if (err) 
                {
                    console.log("Something is wrong with whis query!")
                    throw err
                }
                else 
                {
                    console.log("Task #", idToQuery)
                    console.log(result)
                }
        
                res.status(200).json(result)
            })
        }
    })
})

// PUT /tasks/:id: Update the information of a task by its ID.
app.put('/tasks/:id', validateToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err)
        {
            res.sendStatus(403)
        }
        else
        {
            const idToQuery = req.params.id
            const {title, description, dueDate, status} = req.body

            let parameterAdded = false

            let MySQLQuery = "UPDATE Tasks SET "

            if(title != undefined && title != '')
            {
                MySQLQuery = MySQLQuery.concat("title = '"+ title +"'")
                parameterAdded = true
            }
            if(description != undefined)
            {
                if(parameterAdded)
                    MySQLQuery = MySQLQuery.concat(", ")

                MySQLQuery = MySQLQuery.concat("description = '"+ description +"'")
                parameterAdded = true
            }

            if(dueDate != undefined)
            {
                if(parameterAdded)
                    MySQLQuery = MySQLQuery.concat(", ")

                MySQLQuery = MySQLQuery.concat("dueDate = '"+ dueDate +"'")
                parameterAdded = true
            }
            if(status != undefined && status != '')
            {
                if(parameterAdded)
                    MySQLQuery = MySQLQuery.concat(", ")

                MySQLQuery = MySQLQuery.concat("status = '"+ status +"'")
                parameterAdded = true
            }

            MySQLQuery = MySQLQuery.concat(" WHERE id='"+ idToQuery +"'")

            dbConnection.query(MySQLQuery, function(err, result) {
                if (err) 
                {
                    console.log("Something is wrong with whis query!")
                    throw err
                }
                else 
                {
                    console.log("Task #", idToQuery, " was edited!")
                    console.log(result)
                }

                res.status(200).json(result)
            })
        }
    })
})

// DELETE /tasks/:id: Delete a task by its ID.
app.delete('/tasks/:id', validateToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err)
        {
            res.sendStatus(403)
        }
        else
        {
            const idToQuery = req.params.id

            MySQLQuery = "DELETE FROM Tasks WHERE id='"+ idToQuery +"'"

            dbConnection.query(MySQLQuery, function(err, result) {
                if (err) 
                {
                    console.log("Something is wrong with whis query!")
                    throw err
                }

                res.status(200).send("Task #" + idToQuery + " was deleted!!!")
            })
        }
    })
})

app.listen(port, () => {
    console.log(`KSQuare Code Challenge - Luis Eduardo Villela Zavala. Executing on Port ${port}`)
})