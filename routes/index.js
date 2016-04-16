var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
//var bcrypt = require('bcrypt');
var mongoClient = mongo.MongoClient;
var url = "mongodb://Vishwajeet:310toyuma@ds030829.mlab.com:30829/hackathon";
var mongodb;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoClient.connect(url,function(err,db){
  mongodb = db;
});
app.use(function(req,res,next){
  req.db = mongodb;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var collection = mongodb.collection("userColection");
  collection.find().toArray(function(err,data){
    res.json(data);
  });
  //res.json({message: 'Home Page'});
});

router.post('/register',function(req,res){
  var collection = mongodb.collection("userColection");
    //bcrypt.hash(req.body.pass, 2, function(err, hash) {
      var data = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        age: req.body.age,
        address: req.body.address,
        history: [],
      };
      collection.insertOne(data,function(err,data){
        if(err){
          console.log(err);
        } else{
            res.redirect('/');
        }
      });
    //});
});

router.post('/addHistory',function(req,res){
  console.log("First"+mongodb);
  mongoClient.connect(url,function(err,db){
    var collection = db.collection('userColection');
    var data = {
      name: req.body.name,
      date: req.body.date,
      doctor: req.body.doctor,
      time: req.body.time,
      ailment: req.body.ailment,
      prescription: req.body.prescription
    };
    collection.findOne({"name": data.name},function(err,d){
      if(err){
        console.log(err);
      } else{
        res.json(d);
      }
    });
  });
});

module.exports = router;
