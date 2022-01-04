//requirements
const express = require('express');
const mysql = require('mysql');
//!requirements

//start express app
const app = express();
//!start

//express format
app.use(express.json());
//!express format

//if you are using a custom domain the port is usualy 3000
const port = 8080;
//!port

//ready response
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
//!ready response

//this is the default route like simply 'localhost'
app.get("/", async (req, res) => {
    res.json({status: "Im working good work!!!" });
});
//!default route


//list the entire table example:
//it will be on route localhost/api/list
app.get("/api/list", async(req, res) => {
    //here we write our comand to mysql
    //the commands are the same commands as the ones you use
    //directly in the database
    const query = "SELECT * FROM <your table name>";
  
   //we send the command to the database
    pool.query(query, [], (error, results) => {
      if(!results[0]) {
            res.json({ status: "Not found!"});
        } else {
          //we list the results as a json list
          //but it will be in the format of an array
          //so its not so useful
            res.json(results);
        }
    });
});

//!list
//now for the usefull stuff:
//we will use a variable in the url
//we do it by doing :variable name
//I named it variable in this example
app.get("/api/:variable", async (req, res) => {
   //then to use it as a variable in code you get it wit req.params.variable
   //to use a variable in the mysql command we put it inside "+variable+" as below
    const query = "SELECT * FROM vechi Where <collum name> = '"+req.params.variable+"'";
    pool.query(query, [req.params.variable], (error, results) => {
        if(!results[0]) {
            res.json({ status: "Not found!"});
        } else {
           //now because we searched for a specific thing we got an array of only the ones with that variable
           //for example if we seach for all data with the collum real==true we got a array of only those wjth it true
           //but if we where clever and shearched for a more specific topic as an id we got an array of only 1 object
           //so I used [0] next to results below to get the first object in the array
            res.json(results[0]);
          
        }
    });
});

//mysql credentials

const pool = mysql.createPool({
    host: "localhost",
    user: "",
    password: "",
    database: "",
})

//mysql credentials