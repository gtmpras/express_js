
import {Router} from "express";
import {query,
      validationResult,
      checkSchema, 
      matchedData} 
    from "express-validator";
import {userData} from '../utils/constants.mjs'; // Importing user data
import {createUserValidationSchema} from '../utils/validation_schemas.mjs'; // Importing validation schema
import { resolveIndexByUserId} from '../utils/middlewares.mjs';

const router = Router();
 //router get
 router.get("/api/users",query("filter")
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
        }
);

router.get ("/api/users/:id", resolveIndexByUserId, (request, response)=> {
    const {findUserIndex} = request;
    const findUser = userData[findUserIndex];
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser);
})

//router post
router.post('/api/users',
checkSchema(createUserValidationSchema),
(request, response)=>{

    const result = validationResult(request);
    console.log(result);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }
    const data = matchedData(request);
    console.log(data);
    const newUser = {id: userData[userData.length -1].id+1, ...data};
    userData.push(newUser);
    return response.status(201).send(newUser);
});


export default router;