
                                //********Basics of Express JS ************/

// import express from 'express';

// const app = express();

// const PORT = process.env.PORT || 3000;

// app.listen(PORT,()=> {
//     console.log(`Running on Port ${PORT}`);
// });


                            //***********Let's Dive to level 2 ************/

// import express from 'express';
// const app = express();

// const PORT = process.env.PORT || 3000;

// const mockUsers = [
//     { id:1, userName:'prasoon', displayName:"Prasoon"},
//     { id:2, userName:'prakritee', displayName: 'Prakritee'}
//  ]

// //adding GET method here To continue GET REQUEST
// app.get("/", (request, response)=> {
//     response.status(201).send({msg: "Hello, Prasoon"});
// });


// app.get("/api/users", (request, response)=>{
//     response.send(mockUsers);
// });

// app.get("/api/products",(request, response)=>{
//     response.send([{
//         id:123, name:"Coffee", price: 200
//     }]);
// });

// //using route parameters(Single User record)
// app.get("/api/users/:id",(request,response)=>{
//     console.log(request.params);
//     const parsedId = parseInt(request.params.id);
//     console.log(parsedId);
//         if(isNaN(parsedId)) return response.status(400).send({msg:"Bad Request. Invalid ID"});

//     const findUser = mockUsers.find((user)=> user.id === parsedId);
//     if(!findUser) return response.sendStatus(404);
//     return response.send(findUser);
//     });

// app.listen(PORT,()=> {
//     console.log(`Running on Port ${PORT}`);
// });


//                         //********** */ Let's Dive into Level 3 i.e Query Params////************ */
import express from 'express';
//importing for validating query params
import { query, validationResult } from "express-validator";
const app = express();

const PORT = process.env.PORT || 3000;

const userData = [
    { id: 1, userName: 'roshan', displayName: "Roshan"},
    {id: 2, userName :'ashim', displayName: "Ashim"}];

// app.get ("/api/users", (request, response)=> {
//     console.log(request.query);
//     response.send(userData);
// })

// app.listen(PORT, ()=> {
//     console.log(`Running on Port ${PORT}`);
// });

//another practice of query params.
 app.get("/api/users",query("filter")
 .isString()
 .withMessage("Filter must be a string")
 .notEmpty()
 .withMessage("Filter shouldn't be empty")
 .isLength({min:3, max:20})
 .withMessage("Filter must be a string with length between 3 and 20 characters"),
  (request, response)=>{
    const result = validationResult(request);
    console.log(result);
    //console.log(request.query);
    const {
        query: {filter,value},
    }= request;

    //If filter is present
    if(filter && value) 
        return response.send(
    userData.filter((user)=> user[filter].includes(value)));
    return response.send(userData);
});

app.listen(PORT, ()=> {
    console.log(`Running on Port ${PORT}`);
});