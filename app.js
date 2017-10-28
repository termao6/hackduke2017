var express         = require("express"),
    app             = express();


// connect to DB
var MongoClient = require('mongodb').MongoClient;

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    MongoClient.connect("mongodb://localhost/solpan", function(err, db) {
        if(err) { return console.dir(err); }
        
        var collection = db.collection('city');
        
        collection.find({},{"lat_avg":1, "lng_avg":1, _id:0}).toArray(function(err, latFound){
            if(err)
                console.log("oops");
            else
                res.render("home", {latlng: latFound});
        });
        
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});