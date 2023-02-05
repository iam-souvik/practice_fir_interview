
//import

const express = require("express")
const fs = require("fs");
const db = require("./db.json")




//create

const app= express()

app.get("",(req,res)=>{
res.send("welcome to my World")
})

app.get("/person",(req,res)=>{
    res.send(db.person)
})

app.get("/person/:id",(req,res)=>{
    const id = req.params.id 

    const post = db.person.filter((post)=> post.id==Number(id))

    if(post){
        res.send(post)
    }else{
        res.status(401).send(`post with id ${id} is not found`)
    }

})



app.post("/person",(req,res)=>{
    db.person.push({
        id:Date.now() , Name:"Souvik patra" 
        
    })

    fs.writeFile("./db,json",JSON.stringify(db),"utf-8",()=>{

        res.send(db.person)
       
    })
    
})





app.delete("/person/:id",(req,res)=>{
    const id = req.params.id;
    const posts = db.person.filter((item)=>item.id==Number(id))
    db.person= posts

    fs.writeFile("./db,json",JSON.stringify(db),"utf-8",()=>{
        res.send("delete succesfully")
    })

   
    res.send("This is My Delete API")
})


//conect/listen

app.listen(8080,(req,res)=>{
    console.log("Server start on  http://localhost:8080/")
})