var express=require('express');
var app=express();

var path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.listen(3000,()=>{
console.log('server created and started on port 3000');
});
app.get('/',(request,response)=>{
//response.setHeader("Content-Type","text/html");
//response.end("<h1>Hello from node js<h1>");
response.render('index',{'msg':'Login Form'});

});
app.get('/createEmp',(request,response)=>{
response.render('createEmp')
});

app.get('/viewEmp',(request,response)=>{
  var sql="select * from employee";
  con.query(sql,(err,result)=>{
  console.log(result);
  if(err) throw err;
  else{
  console.log(result);
  response.render('viewEmp',{'list':result});
}
  response.render("viewEmp");
});
});




var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));


app.post('/empInsert',(request,response)=>{

var eid=request.body.empid;
var ename=request.body.ename;
var salary=request.body.salary;
console.log(eid+ename+salary);

var sql="insert into employee values("+eid+",'"+ename+"',"+salary+")";
con.query(sql,(err,result)=>{
console.log(result);
if(err) throw err;
else
response.render('createEmp',{'msg':'Data inserted successfully...'});

});
});


app.get('/deleteEmp',(request,response)=>{
  var eid=request.query.eid;
  var sql="delete from employee where eid="+eid;
  con.query(sql,(err,result)=>{

  if(err) throw err;
  else{
    var sql="select * from employee";
    con.query(sql,(err,result)=>{
    if(err) throw err;
    else{

    response.render('viewEmp',{'list':result,'msg':'Data Deleted'});
  }

  });
}

});
});

app.post('/empUpdateAction',(request,response)=>{
var eid=request.body.eid;
var ename=request.body.ename;
var salary=request.body.salary;
var sql="update Employee set ename='"+ename+"',salary="+salary+" where eid="+eid;
con.query(sql,(err,result)=>{
  console.log(result);
if(err) throw err;
else {
  var sql="select * from employee";
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else {
      console.log(result);
      response.render('viewEmp',{'list':result,'msg':'Data updated successfully'});
    }
  });
}
});
});

app.get('/updateEmp',(request,response)=>{
var eid=request.query.eid;
var sql="select * from employee where eid="+eid;
con.query(sql,(err,result)=>{
  if(err) throw err;
  else {
    console.log(result);
    response.render('viewOneEmp',{'emp':result});
  }
});
});
var con=require('./db');
app.post('/loginCheck',(request,response)=>{
var uid=request.body.uid;
var pass=request.body.pwd;

var sql="select * from login where uid='"+uid+"'and password='"+pass+"'";
con.query(sql,(err,result)=>{
  if(err) throw err;
  else if(result.length>0)
  response.render('home');
  else
  response.render('index',{'msg':'Login Fail'});
});
});

app.get('/logout',(request,response)=>{
  request.session.views=null;
response.render('index');
});
