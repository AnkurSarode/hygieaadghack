var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var bcrypt = require('bcrypt');
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
  var collection = mongodb.collection("userCollection");
  collection.find().toArray(function(err,data){
    res.json(data);
  });
  //res.json({message: 'Home Page'});
});

router.post('/', function(req, res, next) {
  var collection = mongodb.collection("userCollection");
  collection.find().toArray(function(err,data){
    res.json(data);
  });
  //res.json({message: 'Home Page'});
});

router.post('/register',function(req,res){
  mongoClient.connect(url,function(err,db){
    var collection = db.collection("userCollection");
      bcrypt.hash(req.body.name, 2, function(err, hash){
        var str=""+hash;
        var genId="",count=0;
        for(var i=0;i<=str.length;i++){
          var code = str.charCodeAt(i);
          if ( ((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122))) {
            if(count<6){
              genId+=str.charAt(i);
              count++;
            } else{break;}
          }
        }
        var data = {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          age: req.body.age,
          address: req.body.address,
          history: [],
          id: genId.toUpperCase()
        };
        collection.insertOne(data,function(err,d){
          if(err){
            console.log(err);
          } else{
              res.redirect('/');
          }
        });
      });
  });
});

router.post('/addHistory',function(req,res){
  mongoClient.connect(url,function(err,db){
    var collection = db.collection('userCollection');
    var data = {
      name: req.body.name,
      date: req.body.date,
      doctor: req.body.doctor,
      time: req.body.time,
      ailment: req.body.ailment,
      prescription: req.body.prescription
    };
    collection.updateOne({"id": req.body.id},{$push: {'history': data}},function(err,d){
      if(err){
        console.log(err);
      } else{
        res.redirect('/');
      }
    });
  });
});

router.post('/details',function(req,res){
  mongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    } else{
      db.collection('userCollection').findOne({'id': req.body.id},function(err,data){
        if(err){
          console.log(err);
          throw err;
        }
        var sendData = {
          name: data.name,
          id: data.id,
          phone: data.phone,
          age: data.age,
          address: data.address
        };
        console.log(data);
        res.json(sendData);
      });
    }
  });
});

router.post('/history',function(req,res){
  mongoClient.connect(url,function(err,db){
    db.collection('userCollection').findOne({'id': req.body.id},function(err,data){
      var sendData = {
        history: data.history
      };
      res.json(sendData);
    });
  });
});

module.exports = router;
