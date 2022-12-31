const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require("node:https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  console.log(req.body);
  const firstname=req.body.FirstName;
  const lastname=req.body.LastName;
  const email=req.body.Email;
  console.log(firstname+" "+lastname+" "+email);

  const data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME:lastname
      }
    }
  ]
};

const jsondata=JSON.stringify(data);

const url="https://us11.api.mailchimp.com/3.0/lists/2b7d7fb968";
const options={
  method:"POST",
  auth: "shivang1:6ef199867b50bf0070c70c5ff91fccfa-us11"
}
const request=https.request(url,options,function(response){

  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }else{
    res.sendFile(__dirname+"/Failure.html");
  }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
});

request.write(jsondata);
request.end();

});


app.post("/Failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT ||  3000 ,function(){
  console.log("Server is Running on port 3000");
})


















  // API Key
  // 6ef199867b50bf0070c70c5ff91fccfa-us11

  // List
  // ID 2b7d7fb968
