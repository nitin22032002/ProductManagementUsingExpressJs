const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var express=require('express');
var router=express.Router();
var pool1=require('./mysqlconnection1');
var pool=require('./mysqlconnection');
router.get('/signUp',function(req,res){
    res.render("signup");
});
router.get('/login',function(req,res){
    res.render('login');
});
router.get('/terms',function(req,res){
    res.render("terms");
});
router.post('/signup/home',function(req,res){
   var firstname=req.body.firstname
   var lastname=req.body.lastname
   var gender=req.body.gender
   var mob=req.body.mob
   var mail=req.body.mail
   var address1=req.body.address1
   var address2=req.body.address2
   var state=req.body.state
   var city=req.body.city
   var password=req.body.passworduser
    encruptpassword=cryptr.encrypt(password);
   pool.query('insert into user (FirstName, LastName, Gender, MobileNumber, EmailId, AddressLine1, AddressLine2, State, City, userPassword) values(?,?,?,?,?,?,?,?,?,?)',[firstname,lastname,gender,mob,mail,address1,address2,state,city,encruptpassword],function(error,result){
    if(error){
        console.log(error)
    }
    else{
        var a="/product/?a=0&name="+firstname+" "+lastname+"&state="+state+"&city="+city;
        res.redirect(a)
        // res.render('home',{fname:firstname,file:filename,lname:lastname,gender:gender,dob:dob,mob:mob,mail:mail,address1:address1,address2:address2,state:state,city:city,intrest:intrest});
    }
})
});
router.get('/fillstate',function(req,res){
    pool1.query('select * from states',function(error,result){
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
 })
 router.get('/fillcity',function(req,res){

    pool1.query("select * from cities where state=?",[req.query.state],function(error,result){
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
 })
 router.get('/fetchmob',function(req,res){

    pool.query("select MobileNumber from user where MobileNumber=?",[req.query.mo],function(error,result){
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
 })
 router.get
 router.get('/fetchmail',function(req,res){

    pool.query("select * from user where EmailId= ?",[req.query.ma],function(error,result){
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
 })
 router.get('/deletedata',function(req,res){
     pool.query('delete from user where iduser=?',[req.query.id],function(error,result){
        
        res.redirect(req.get('referer'));
     })
 })
 router.get('/product',function(req,res){
     if(req.query.btn=="go"){
    res.redirect('/product/admin')}
    else{
    res.redirect('/product/adminadd')}
 })
 router.get('/login/home',function(req,res){
    if(req.query.lmail=='admin@gmail.com'){
        pool.query('select * from user',function(error,result){
            if(error){
                res.render('useradmin',{status:false})
            }
            else{
                res.render('useradmin',{status:true,file:result})
            }
        })
    }
    else{
    pool.query("select * from user where (EmailId=? && userPassword=?)",[req.query.lmail,req.query.lpass],function(error,result){ 
        if(error){
            console.log(error);
             res.render('login',{sttus:false});
            }
        else if(result==[]){
        res.render('login',{sttus:false});
         }
         else{
             var a=result[0]
             var a="/product/?b=user&a=0&name="+a.FirstName+" "+a.LastName+"&state="+a.State+"&city="+a.City
            //  res.render('',{fname:a.FirstName,lname:a.LastName,gender:a.Gender,mob:a.MobileNumber,mail:a.EmailId,address1:a.AddressLine1,address2:a.AddressLine2,state:a.State,city:a.City,sttus:true});
        res.redirect(a);    
        }
     })}
 })
 router.get('/fetchdata',function(req,res){
    pool.query('select EmailId,userPassword from user',function(error,result){
        if(error){
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
     })
 })
 router.get('/decode',function(req,res){
     var dpass=cryptr.decrypt(req.query.pass);
     res.status(200).json([{pass:dpass}])
 })
module.exports=router;