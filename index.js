
var express = require('express');
// var popup = require('popups')
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// set the view engine to ejs
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get("/", function(req, res) {
  res.render('youloop.ejs',{videoID:"H5v3kku4y6Q" , start : 124 , end : 150});
});
app.post("/",function(req,res){
   
    // console.log(req.body.url)
    let url = req.body.url;
    if(!url || !req.body.start || !req.body.end) res.send("please fill all fields.")
    let videoID = ""
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var match = url.match(regExp);
if (match && match[2].length == 11) {
  videoID = match[2];
} 
    let startMins = +req.body.start.split(":")[0]
    let startSeconds = +req.body.start.split(":")[1]
    let endMins = +req.body.end.split(":")[0]
    let endSeconds = +req.body.end.split(":")[1]
    let start = startMins*60+startSeconds;
    // console.log(start)
    let end = endMins*60+endSeconds;
    res.render('youloop.ejs',{videoID: videoID , start : start , end : end});

})


app.listen( process.env.PORT|| 3000,function(){
    console.log('Server is listening on port 3000');
}
);
