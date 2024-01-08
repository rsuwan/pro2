import  'dotenv/config'
import express from 'express'
const app= express();
    const port = process.env.port|| 3000;
    app.get('/', (req,res)=>{
return res.json("Welcome..");

    })
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });