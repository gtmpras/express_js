
import express from 'express';

const app = express();

//adding middleware to parse JSON body
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/api/users',(request, response)=>{
    console.log(request.body);
    return response.send(200);
});

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`);
});