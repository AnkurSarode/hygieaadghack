var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var bcrypt = require('bcrypt');
var requestify = require('requestify');
var mongoClient = mongo.MongoClient;
var url = "mongodb://Vishwajeet:310toyuma@ds030829.mlab.com:30829/hackathon";
var mongodb;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public" ));

mongoClient.connect(url,function(err,db){
  mongodb = db;
});
app.use(function(req,res,next){
  req.db = mongodb;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  /*mongoClient.connect(url,function(err,db){
    var collection = db.collection("userCollection");
    collection.find().toArray(function(err,data){
      res.render('index');
    });
    //res.json({message: 'Home Page'});
  });*/
  res.render('index');
});

router.post('/', function(req, res, next) {
  mongoClient.connect(url,function(err,db){
    var collection = db.collection("userCollection");
    collection.find().toArray(function(err,data){
      res.render('index');
    });
    //res.json({message: 'Home Page'});
  });
});

router.post('/register',function(req,res){
  mongoClient.connect(url,function(err,db){
    var collection = db.collection("userCollection");
      bcrypt.hash(req.body.name, 2, function(err, hash){

        //Generate 6 Digit Unique Id based on hashed name
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
            var sendData = {
              name: data.name,
              id: data.id,
              phone: data.phone,
              age: data.age,
              address: data.address
            };
              res.render('register',sendData);
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
        collection.findOne({"id": req.body.id},function(err,data){
          if(err){
            console.log(err);
            throw err;
          }
          var sendData = {
            name: data.name,
            history: data.history
          };
          res.render('history',sendData);
        });
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
        } if(data==null){
          return;
        } else{
        var sendData = {
          name: data.name,
          id: data.id,
          phone: data.phone,
          age: data.age,
          address: data.address
        };
        console.log(data);
        res.render('details',sendData);
        }
      });
    }
  });
});

router.post('/history',function(req,res){
  mongoClient.connect(url,function(err,db){
    db.collection('userCollection').findOne({'id': req.body.id},function(err,data){
      if(err){
        console.log(err);
        throw err;
      }
      var sendData = {
        name: data.name,
        history: data.history
      };
      res.render('history',sendData);
    });
  });
});

router.post('/prescription',function(req,res){
  mongoClient.connect(url,function(err,db){
    var collection = db.collection('presCollection');
    collection.findOne({'id': req.body.id},function(err,data){
      if(err){
        throw err;
      } else{
        var sendData = {
          name: data.name,
          id: data.id,
          morning: data.morning,
          noon: data.noon,
          evening: data.evening,
          night: data.night
        };
        console.log(sendData);
        res.render('prescription',sendData);
      }
    });
  });
});

router.post('/addPrescription',function(req,res){
  mongoClient.connect(url,function(err,db){
    var collection = db.collection('presCollection');
    var data = {
      name: req.body.name,
      id: req.body.id,
      morning: req.body.morning,
      noon: req.body.noon,
      evening: req.body.evening,
      night: req.body.night
    };
    console.log('Insert Data\n'+data);
    collection.insertOne(data,function(err,da){
      if(err){
        console.log(err);
        throw err;
      } else{
        res.render('prescription',data);
      }
    });
  });
});

app.post('/ocr', function (req, res) {
  requestify.post('http://example.com', {
        'img': req.body.img
    })
    .then(function(response) {
        // Get the response body
        var data = response.getBody();
        console.log(data);
    });
});


module.exports = router;
