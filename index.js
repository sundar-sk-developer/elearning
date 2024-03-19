var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://127.0.0.1:27017/elearning',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db =mongoose.connection;

db.on('error',()=>console.log('Error in connection to the database'));
db.once('open',()=>console.log('connected to the database'));





app.post("/send",(req,res)=>{
    var nameVal =req.body.nameVal;
    var emailVal = req.body.emailVal;
    var subjectVal = req.body.subjectVal;
    var textareaVal = req.body.textareaVal;
 

    var data ={
        "name": nameVal,
        "email": emailVal,
        "subject": subjectVal,
        "textarea": textareaVal,
    };

    db.collection('elearn-details').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log('Record Inserted Successfully');

    });
    return res.redirect('./confirm.html');
});

app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Orign": "*"
    });
    return res.redirect('index.html');
});

app.listen(3005,()=>{
    console.log('listening on PORT 3005');
});

