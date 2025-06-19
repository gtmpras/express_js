
import express from 'express';

const app = express();
//adding middleware to parse JSON body
app.use(express.json());

const userData = [
    { id: 1, username: 'Prasoon', displayname: "Prasoon Gautam" },
    { id: 2, username: 'Ashim', displayname: "Ashim Bhandari" }
]
const PORT = process.env.PORT || 3000;


//get request to get all users data according to id
app.get("/api/users/:id",(request,response)=>{
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
        if(isNaN(parsedId)) return response.status(400).send({msg:"Bad Request. Invalid ID"});

    const findUser = userData.find((user)=> user.id === parsedId);
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser);
    });


    //to get all the users data 
    app.get("/api/users", (request, response)=>{
    response.send(userData);
});

//adding PATCH request to update user data
app.patch("/api/users/:id",(request, response)=> {
const {
    body,
    params:{id},
 }= request;

 const parsedId = parseInt(id);

 if(isNaN(parsedId)) return response.sendStatus(400);

 const findUserIndex = userData.findIndex((user)=> user.id=== parsedId);
 if(findUserIndex === -1) return response.sendStatus(404);
 userData[findUserIndex]= {
    ...userData[findUserIndex], ...body
 };
 return response.sendStatus(200);
});



app.listen(PORT, ()=> {
console.log(`Running on PORT ${PORT}`);
});