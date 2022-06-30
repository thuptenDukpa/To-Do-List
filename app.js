const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")

console.log(date.getDay());

const app = express()

const items = ["Buy Food", "Cook Food", "Eat Food"]; // pushing into const arrays allowed but cannot assign another array/ object
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

    //var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // if (currentDay === 6 || currentDay === 0) {
    //     //res.write("<h1>Yay! It's a weekend.</h1>");
    //     //res.sendFile(__dirname + "/index.html");
    //     day = "weekend";    

    // } else {
    //     //res.write("<h1>Boo! I have to work</h1>");
    //     day = "weekday";
    // }
    
    //var day = days[currentDay];

    let day = date.getDate();

    res.render("list", {listTitle: day, newListTasks: items});

    // res.write to send multiple lines
    //res.send();

});

app.post("/", function(req, res) {
    let item = req.body.newTask;

    console.log(req.body);

    if (req.body.list === "Work") {
        workItems.push(item);

        res.redirect("/work");
    } else {
        items.push(item);

        res.redirect("/"); // app.get("/") gets triggered
    }
    
    // console.log(item);
});

app.get("/work", function(req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListTasks: workItems
    });
});

// app.post("/work", function(req, res) {
//     let item = req.body.newTask;
//     workItems.push(item);
//     res.redirect("/work");
// });

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function() {
    console.log("Server started on port 3000.")
});
