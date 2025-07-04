
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

import routes from "./routes/index.mjs";
//importing cookie parser
import cookieParser from 'cookie-parser';
//importing session
import session from "express-session";

//importing passport for authentication
import passport from "passport";

//importing mongodb
import mongoose from 'mongoose';

import './strategies/local-strategy.mjs';


import { mockUsers } from './utils/constants.mjs';

const app = express();
mongoose.connect('mongodb://localhost/express_db').then(()=> console.log("Connected to Database")).catch((err)=> console.log(`Error: ${err}`));

app.use(express.json()); // Middleware to parse JSON body
app.use(cookieParser("Hello world"));
app.use(session(
    {
        secret:'gtmPras',
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: 60000 * 60, //1 hour 

        }
    }
));

//enabling passport after session middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.post('/api/auth', passport.authenticate("local"), (request, response)=>{
response.sendStatus(200);
});

app.get('/api/auth/status', (request, response)=>{
    console.log("Inside /auth/status endpoint");
    console.log(request.user);
    console.log(request.session);
    return request.user ? response.send(request.user) : response.sendStatus(401);
});


const PORT = process.env.PORT || 3000;

// app.get ("/api/users", (request, response)=> {
//     console.log(request.query);
//     response.send(userData);
// })

// app.listen(PORT, ()=> {
//     console.log(`Running on Port ${PORT}`);
// });

app.listen(PORT, ()=> {
    console.log(`Running on Port ${PORT}`);
});

app.get("/", (request,response)=>{
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;
    response.cookie('hello','world',{maxAge : 60000, signed:true });
    response.status(201).send({msg:"Hello"});
});

app.post('/api/auth', (request, response)=>{
    const {body:{
        username, password
    }} = request;
 const findUser = mockUsers.find((user)=> user.username === username);
if(!findUser || findUser.password !== password) 
    return response.status(401).send({msg:'Bad Credentials'});

request.session.user = findUser;
return response.status(200).send(findUser);
});

app.get('/api/auth/status', (request, response)=>{
    request.sessionStore.get(request.sessionID, (err, session)=> {
        console.log(session);
    });
    return request.session.user ? response.status(200).send(request.session.user):
    response.status(401).send({msg: "Not Authenticated"});
});

app.post('/api/auth/logout', (request, response)=> {
  if(!request.user) return response.sendStatus(401);

  request.logout((err)=> {
    if(err) return response.sendStatus(400);
    response.send(200);
  });
});

app.post('/api/cart',(request, response)=>{
    if(!request.session.user) return response.sendStatus(401);
    const {body: item} = request;

    const { cart}= request.session;

    if(cart){
        cart.push(item);
    }else{
        request.session.cart = [item];
    }
    return response.status(201).send(item);
});

app.get('/api/cart', (request, response)=> {
    if(!request.session.user )return response.sendStatus(401);
    return response.send(request.session.cart ?? []);
}); 