var express=require('express');
var app=express()
var bodyparser=require('body-parser');
const port=1109;
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname));
app.set("views","./views")
app.set("view engine","ejs");
const myRoutes=require('./Controller/routes/route');
app.use(myRoutes);
//var server=app.listen(3302,()=>{
    app.listen(port,()=>{
    console.log("Server is listening 1109");
})