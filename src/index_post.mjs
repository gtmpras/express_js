
import express from 'express';

const app = express();

//adding middleware to parse JSON body
app.use(express.json());

const PORT = process.env.PORT || 3000;


// user Data
const userData = [
 { id: 1, username: 'prasoon', displayName: 'Prasoon Gautam' },
 { id: 2, username: 'rijan', displayName: 'Rijan Bhat' }
]
app.post('/api/users',(request, response)=>{
    console.log(request.body);
    const {body} = request;
    const newUser = {id: userData[userData.length -1].id+1, ...body};
    userData.push(newUser);
    return response.status(201).send(newUser);
});

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`);
});