import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import dotenv from "dotenv";
const app = express();
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
// app.get('/',(req,res)=>{
//     res.send('server is live')
// })
app.use(express.static(__dirname + "/frontend"));


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hcrecform",
});
db.connect((error) => {
  if (error) throw error;
  else console.log("database connection does sucessfully");
});

// console.log(__dirname)

// landingpage 
app.get("/", function (req, res) {
 
  res.sendFile("index.html");
});

//checking verification status
app.get("/verification_status", function (req, res) {
  var form_id=req.body.application_id
  console.log(form_id)
});




// submit page for admin
app.post("/submit", (req, res) => {
//   console.log(req.body);
// const name = req.body.application_id;
// const email = req.body.email;
// console.log(name+ " " +email)
//   try {
    
//     res.send("server is on submit ");
//   } catch (error) {}

console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  var pdf = req.body.pdfUpload;
  
  try {
    db.query(
      "INSERT into hcrecform (name,email) values(?,?)",  //2. saving in database
      [name, email],
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // res.json({ result });
          // filePath=app.use(express.static(__dirname + "/varification_status"));
          // console.log(filePath)
          res.redirect("/");  //3. Redirect user to the new page
        console.log(req.body)
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});

// app.get('/submit',(req,res)=>{
//         res.send("server listning on submit page ")
// })




//verification stage

app.post("/verification.html", (req, res) => {
    res.redirect("/verification.html");
});




app.listen(process.env.PORT, () => {
  console.log(`server is running on port no ${process.env.PORT}`);
});



