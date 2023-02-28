const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'ejs')

const db = require("./models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

const createPath = (page) => path.resolve(__dirname, `public`, `${page}.ejs`)
app.use(express.static(__dirname + "/public"));


require('./routes/auth.route')(app);
require('./routes/user.route')(app);


const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use('/api/auth', function (req, res) {
  console.log("auth")
  res.render(createPath("authorization"))
})

app.use("/api/registration", function(req, res){
  res.render(createPath("registration"))
})

app.use("/recover",function(req, res){
  res.render(createPath("recover-password"))
})

app.use("/", function (req, res) {
  var token;
  if (req.body["token"]) {
      res.render(createPath("authPage"))
  }
  else {
      res.render(createPath("index"))

  }



})

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }