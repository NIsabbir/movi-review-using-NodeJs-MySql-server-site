const express=require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser')
const app=express();
const PORT=5001;



app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'curd'
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  /* app.get('/', (req,res)=>{
    var sql = "INSERT INTO movilist (moviname, movireview	) VALUES ('RRR', 'ipressing')";
    db.query(sql,(err,result)=>{
      res.send("sabbir")
    })
      
  }) */

  app.get('/api/get',(req,res)=>{
   
    var sql = "SELECT * FROM movilist";
    db.query(sql,(err,result)=>{
      console.log(result);
      res.send(result)
    })
  })
  app.post('/api/movi',(req,res)=>{
    const moviName=req.body.moviName;
    const moviReview=req.body.moviReview;
    var sql = "INSERT INTO movilist (moviname, movireview	) VALUES (?,?)";
    db.query(sql,[moviName,moviReview],(err,result)=>{
      res.send("sabbir")
    })
  })

  app.delete('/api/:moviName',(req,res)=>{

    const name=req.params.moviName;
    /* console.log("delete") */
    console.log(name)
    const sqldlt="DELETE FROM `movilist` WHERE moviname=?"
    db.query(sqldlt,name,(err,result)=>{
      if(err)console.log(err)
    })
  })

  app.put('/api/update',(req,res)=>{

    console.log("Upadet Sabbir")
    const name=req.body.moviName;
    const review=req.body.moviReview;
    console.log(name)
    console.log(review)
    const sqlupdate="UPDATE movilist SET movireview=? WHERE moviname=?"
    db.query(sqlupdate,[review,name],(err,result)=>{
      if(err)console.log(err)
    })
  })


app.listen(PORT,()=>{
   console.log(`server is running at http://localhost:${PORT}`)
})