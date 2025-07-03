
import {Router} from "express";
import {query,
      validationResult,
      checkSchema, 
      matchedData} 
    from "express-validator";
import {userData} from '../utils/constants.mjs'; // Importing user data
import {createUserValidationSchema} from '../utils/validation_schemas.mjs'; // Importing validation schema
import { resolveIndexByUserId} from '../utils/middlewares.mjs';
//importing mongoose User model
import {User} from '../mongoose/schema/user.mjs'

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
    console.log(request.session);
    console.log(request.session.id);
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
router.post('/api/users',async (request, response)=> {
    const {body} = request;
    const newUser = new User(body);
    try{
        const savedUser = await newUser.save();
        return response.status(201).send(savedUser);
    }
    catch(err){
        console.log(err);
        return response.sendStatus(400);
    }
    });
// checkSchema(createUserValidationSchema),
// (request, response)=>{

//     const result = validationResult(request);
//     console.log(result);

//     if(!result.isEmpty()) {
//         return response.status(400).json({ errors: result.array() });
//     }
//     const data = matchedData(request);
//     console.log(data);
//     const newUser = {id: userData[userData.length -1].id+1, ...data};
//     userData.push(newUser);
//     return response.status(201).send(newUser);
// });

//adding put request here

router.put("/api/users/:id",resolveIndexByUserId, (request, response)=>{
 const {
    body,
    findUserIndex,
 }= request;
 userData[findUserIndex] = {id: userData[findUserIndex].id, ...body};
 return response.sendStatus(200);
});

//adding PATCH request to update user data
router.patch("/api/users/:id", resolveIndexByUserId,(request, response)=> {
const {
    body,
    findUserIndex,
 }= request;
userData[findUserIndex]= {
    ...userData[findUserIndex], ...body
};
 return response.sendStatus(200);
});


router.delete("/api/users/:id", resolveIndexByUserId,(request, response)=>{
    const {
        findUserIndex
    }= request;

    userData.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

export default router;