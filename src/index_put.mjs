
import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const userData = [
    { id: 1, username: 'roshan', displayname: "Roshan"},
    {id: 2, username :'ashim', displayname: "Ashim"}];

//using get request here to get all users data

app.get("/api/users/:id",(request,response)=>{
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
        if(isNaN(parsedId)) return response.status(400).send({msg:"Bad Request. Invalid ID"});

    const findUser = userData.find((user)=> user.id === parsedId);
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser);
    });

//adding put request here

app.put("/api/users/:id",(request, response)=>{
 const {
    body,
    params:{id},
 }= request;

 const parsedId = parseInt(id);

 if(isNaN(parsedId)) return response.sendStatus(400);

 const findUserIndex = userData.findIndex((user)=> user.id === parsedId);

 if(findUserIndex === -1) return response.sendStatus(404);

 userData[findUserIndex]= {
    id: parsedId, ...body
 };

 return response.sendStatus(200);
});


app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`);
})