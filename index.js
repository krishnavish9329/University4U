const express=require("express");
const bodyParser=require("body-parser");
const mysql=require('mysql')

const con =mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"1234",
    database:"information_school_college",
    port:"3306"
})

let app=express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded());

app.set('view engine','ejs');

app.use(express.static(__dirname+"/wed page"))


app.use('/login',express.static(__dirname+"/wed page/login releted"))

app.get("/Home",(request ,response)=>{
    response.sendFile(__dirname+"/wed page/home.html");
})

//---------------------------------------login releted------------------------------------------------------------------



app.get('/Home/login/input_page',(request,response)=>{


    con.connect((error)=>{
        try{
        if(error) throw error;
        console.log("connected 11...")
        let sql=`select * from college_And_university`;
        con.query(sql,(error,results)=>{
            if (error) {
                console.log(error);
                response.status(500).send('Internal Server Error');
            } else {
                response.render(__dirname + '/wed page/inputformain', { data: results });
                console.log("hello i am one error")
            }
            // response.render(__dirname+"/wed page/inputformain",{data:results});
            // console.log("data inserted ")
        })
        }catch(e){
            console.log(e);
            response.write("<h1>indelid url kkk</h1>")
        }
    })
})

/*app.get('/update',(request,response)=>{
   let NAME=request.query.NAME;
   let CITY=request.query.CITY;
   let COURSES=request.query.COURSES;
   let EXAM=request.query.EXAM;
   let CATEGORY=request.query.CATEGORY;

   console.log(NAME + CITY + COURSES + EXAM + CATEGORY);

   con.connect((error)=>{
    try{
        if(error) throw error
    console.log("connected 1...")

    let sql=`INSERT INTO college_And_university  (u_NAME,CITY,COURSES,EXAM,CATEGORY) VALUES(?,?,?,?,?)`;
    con.query(sql,[NAME,CITY,COURSES,EXAM,CATEGORY],(error,result)=>{
        if (error) {
            console.log(error);
            response.status(500).send('Internal Server Error');
        } 
        // else {
        //     console.log(result);
        //     response.redirect('/Home/login/input_page');
        // }
        // console.log(result);
        // response.redirect("/Home/login/input_page");
        // console.log("data inserted ")

        con.query(sql,(error,results)=>{
            if (error) {
                console.log(error);
                response.status(500).send('Internal Server Error');
            } else {
                response.render(__dirname + '/wed page/inputformain', { data: results });
            }
        })
    })
    }catch(e){
        console.log(e);
        response.write("<h1>indelid url</h1>")
    }
})
})
*/
//some error in above code so it not work 

// all code write by krishna kumar Vishwakarma

//-----------------------------reteted below
app.get('/Home/login',(request,response)=>{
    response.sendFile(__dirname+"/wed page/login releted/login.html");
})

app.post("/Home/login",(request,response)=>{
    let Gmail=request.body.Gmail;
    let Password=request.body.Password;
    console.log(Gmail+" "+Password);

    con.connect((error)=>{
        if(error) console.log(error);
        
        let sql="SELECT * FROM login where Gmail=? ";
        
        con.query(sql,[Gmail],(error,result)=>{

            try{
            if(Password==result[0].Password)
            {
                response.redirect('/Home/login/input_page');
                // response.write("<h1>ok</h1>");  // it's line for check the responce the server
            }
            else{
                response.write("<h1>invail password</h1>");
            }
            }
            catch(e)
            {
                console.log(e);
                response.write("<h1>invail email</h1>");
            }
            })
    })

    
    // con.end()//(err)//=>{  // check to some error but resolve
    //     if(err){
    //         console.error("Error"+err.stack);
    //     }
    //     console.log("conn&& dis");
    // });
})

app.get("/Home/register",(request,response)=>{
    response.sendFile(__dirname+"/wed page/login releted/Register.html");
})

app.post('/Home/register',(request,response)=>{
    let Name =request.body.Name;
    let Gender =request.body.Gender;
    let Gmail=request.body.Gmail;
    let Password= request.body.Password;

    con.connect((error)=>{
        try{
            if(error) console.log(error);
        console.log("connected 1...")

        let sql=`INSERT INTO login  (Name,Gmail,Gender,Password) VALUES(?,?,?,?)`;
        con.query(sql,[Name,Gmail,Gender,Password],(error,result)=>{
            //console.log(sql); //check the sql qurry
            response.redirect('/Home/login');
            console.log("data inserted ")
        })
        }catch(e){
            console.log(e);
            response.write("<h1>indelid url</h1>")
        }
    })
})

app.get("/Home/ForgotPass",(request,response)=>{
    response.sendFile(__dirname+"/wed page/login releted/ForgotPass.html");
})

app.post('/Home/ForgotPass',(request,response)=>{
    let email=request.body.Gmail;
    let Name=request.body.Name;
    con.connect((err)=>{
        if(err) console.log(err);

        let sql =`select * from login where Gmail=? OR Name=?`;

        con.query(sql,[email,Name],(err,result)=>{
            if(err) throw err;
           try{
            if(result[0].email=email)
            {
                response.write("<h1>update</h1>")
            }
            }catch(e){
            console.log(e);
            response.write("<h1>invaild email</h1>")
            }

        })
    })
})


//-------------------------------------------------------------------------------------------------------------------------
//                                                  releted to cource
//---------------------------------------------------------------------------------------------------------
app.get("/Home/Courses",(request,response)=>{
    response.sendFile(__dirname+"/wed page/courses.html")
})

app.get("/Home/University",(request,response)=>{
    con.connect((error)=>{
        try{
        if(error) throw error;
        console.log("connected 999..")
        let sql=`select * from college_And_university`;
        con.query(sql,(error,results)=>{
            if (error) {
                console.log(error);
                response.status(500).send('Internal Server Error');
            } else {
                response.render(__dirname + '/wed page/university', { data: results });
            }
        })
        }catch(e){
            console.log(e);
            response.write("<h1>indelid url kkk</h1>")
        }
    })
})

app.get('/Home/University-search',(request,response)=>{
    let NAME=request.query.NAME;
    let CITY=request.query.CITY;
    let COURSES=request.query.COURSES;
    let EXAM=request.query.EXAM;
    let CATEGORY=request.query.CATEGORY;
 
    console.log(NAME + CITY + COURSES + EXAM + CATEGORY);
 
    con.connect((error)=>{
     try{
         if(error) throw error
        console.log("connected 999...")
        const sql = `SELECT * FROM college_And_university WHERE u_NAME=? OR CITY=? OR COURSES=? OR EXAM=? OR CATEGORY=?`;
        const values = [NAME, CITY, COURSES, EXAM, CATEGORY];
        con.query(sql, values ,(error,result)=>{
         if (error) {
             console.log(error);
             response.status(500).send('Internal Server Error');
         } 
         else {
            response.render(__dirname + '/wed page/university', { data: result});
        }
     })
     }catch(e){
         console.log(e);
         response.write("<h1>indelid url</h1>")
     }
 })
 })


app.listen(5000,()=>{
    console.log("server start in 5000")
});