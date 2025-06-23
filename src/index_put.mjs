
import express from 'express';

const app = express();
//adding middleware to parse JSON body
app.use(express.json());

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

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`);
})