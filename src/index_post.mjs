
import express from 'express';

//importing for validation
import {validationResult, matchedData,checkSchema} from "express-validator";
import { createUserValidationSchema } from './utlis/validation_schemas.mjs';
const app = express();

//adding middleware to parse JSON body
app.use(express.json());

const PORT = process.env.PORT || 3000;


// user Data
const userData = [
 { id: 1, username: 'prasoon', displayName: 'Prasoon Gautam' },
 { id: 2, username: 'rijan', displayName: 'Rijan Bhat' }
]

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`);
});