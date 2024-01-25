let fetch = require('node-fetch');
const express = require("express");
const multer = require('multer');
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
var fs = require('fs');
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

var serviceAccount = require(__dirname + "/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://sugam-clean.appspot.com'
});
const db = admin.firestore();


const app = express();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './temp_images');
    console.log('1******************************************************************************************************************');
    console.log(req);
    console.log('2******************************************************************************************************************');
    console.log(file);
    console.log('3******************************************************************************************************************');
    console.log(cb);
  },
  filename: (req, file, cb)=> {
    cb(null, Date.now() + ""+ file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine })

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



// GET REQUESTS
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");  
});

app.get("/about", function(req, res){
  res.sendFile(__dirname + "/pages/about.html");  
});

app.get("/analytics", function(req, res){
  res.sendFile(__dirname + "/pages/analytics.php");  
});

app.get("/complainform", function(req, res){
  res.sendFile(__dirname + "/pages/form.html");  
});



// POST REQUESTS
app.post("/", function(req,res){

  res.send("Thanks for posting in normal");
});

app.post("/form", upload.single('img'), async function(req,res) {
  // console.log(req.body);
  console.log(req.file);
  console.log(req.file['filename']);
  console.log(req.file.filename);
  const bucketName = 'gs://sugam-clean.appspot.com';
  const filePath ="./temp_images/"+req.file.filename;
  const destFileName = "images/"+req.file.filename;
  const options = {
    public: true,
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
        // object that does not yet exist, set the ifGenerationMatch precondition to 0
        // If the destination object already exists in your bucket, set instead a
        // generation-match precondition using its generation number.
        // preconditionOpts: {ifGenerationMatch: 0},
      };
  const storageRef = admin.storage().bucket(bucketName);
  var storage = await storageRef.upload(filePath, options).then(async () => {
    const file = storageRef.file(destFileName);
    const signedUrls = await file.getSignedUrl({
      action: 'read',
      expires: '03-25-2023'
    });
    // signedUrls[0] contains the file's public URL
    console.log(signedUrls[0]);
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
  fs.unlink(filePath, function(err) {
    if (err) throw err;
  
    console.log('file deleted');
  });
    var x = req.body;
    var current = new Date();
    var data = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+x['latitude']+','+x['longitude']+'&result_type=administrative_area_level_2&result_type=administrative_area_level_1&result_type=country&key=AIzaSyCxh5rys56-Bz4H5MInCyhg6ZjjpiBRjQU');
    var datajson = await data.json();
    var city = datajson.results[0].address_components[0].long_name;
    var state = datajson.results[0].address_components[1].long_name;
    var country = datajson.results[0].address_components[2].long_name;
    Object.assign(x, {'dateOfComplain': current.toLocaleDateString(), 'timeOfComplain':current.toLocaleTimeString(), 'Country':country, 'State':state, 'City':city});
    // x['date'] = new Date(Date.now()).toLocaleDateString();
    // x['time']
    db.collection('Compalins').add(x)
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
  res.send("Success");
});

// app.post("/form", up, async function(req,res){

//   res.send("Thanks for posting in form");
// });



// LISTEN
app.listen(8080, function(){
  console.log("Server started on port 8080");
});
