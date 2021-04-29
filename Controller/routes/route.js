const { decodeBase64 } = require('bcryptjs');
var express= require('express');
var connection=require('../../model/database.js');
const router=express.Router()


router.get('/login',function(req,res){
    console.log("WELCOME!!");
    res.render("vlogin");
})
router.post('/validate',function(req,res){
    var email=req.body.Email; 
    var pwd=req.body.password;
     try{
     connection.beginTransaction();

    connection.query('select email from voter_login where email like ?', [email], (err, results) => {
             if (err)
                 throw err;
             if (results) {
                 
                 connection.query('select password from voter_login where email like ? and password like ?)', [email, pwd], (_err, data) => {
                    function resolveAfter2Seconds() {
                        return new Promise(resolve => {
                          setTimeout(() => {
                            res.render("vlogin");
                          }, 2000);
                        });
                      }
                      
                      async function asyncCall() {
                        console.log('calling');
                        const result = await resolveAfter2Seconds();
                        console.log(result);
                      }
                     res.render("vote-reg");

                 });
             }

             else {
                
                 res.render("vlogin");
             }
         })
}
catch(err){
    connection.rollback();
}
})
// router.get('/login',function(req,res){
//     console.log("WELCOME!!");
//     res.render("vlogin");
// })
// router.post('/validate',function(req,res){
//     var email=req.body.Email; 
//     var pwd=req.body.password;
//     connection.query('select email from voter_login where email like ?',[email],(err,results)=>{
//        if (err) throw err;
       
//           if(results[0].email==email){
//             connection.query('select password from voter_login where email like ?',[email],(_err,result)=>{
//                 if(result[0].password==pwd)
//                 {
//                     console.log(result[0].password);
                    
//                         res.render("vote-reg", {userData: result });
                
//              }
            
//         })
//         } 
//     })

// })



router.post('/vali',function(req,res){
    var choice=req.body.vote;

console.log(choice);
connection.query('UPDATE vote set voteCount=voteCount+1 where userId=?',[choice],(err,results)=>{
    if(err)
    throw err;
    console.log(results);
    res.render('index');
})

})



 router.get('/adminlogin',function(req,res){
    console.log("WELCOME!!");
    res.render("alogin");
})
router.post('/advali',function(req,res){ 
    function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        res.render("vlogin");
      }, 2000);
    });
  }
  
  async function asyncCall() {
    const result = await resolveAfter2Seconds();
    console.log(result);
  }
    var email=req.body.Email; 
    var pwd=req.body.password;
     connection.query('select email from admin_login where email like ?',[email],(err,results)=>{
       if (err) throw err;
          if(results[0].email==email){
            connection.query('select password from admin_login where email like ?',[email],(_err,result)=>{
                if(result[0].password==pwd)
                {
                    console.log(result[0].password);
                    
                    connection.query('select * from vote',(err,result)=>{
                        res.render("vote-result", {userData: result });
                })
             }
            
        })
        
        } 
    })

})

router.get('/index',function(req,res){
    console.log("WELCOME!!");
    res.render("index");
})






module.exports=router;