
import {Router} from "express";
import {query, validationResult} from "express-validator";
import {userData} from '../utlis/constants.mjs'; // Importing user data
const router = Router();

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

export default router;