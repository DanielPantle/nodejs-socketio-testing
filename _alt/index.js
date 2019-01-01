
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;


app.use(express.static("public"));
/*
app.get("/", function(req, res) {
    res.send("welcome!");
});
*/
app.listen(port);
