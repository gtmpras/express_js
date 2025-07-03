
import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from '../utils/constants.mjs';
import { User } from "../mongoose/schema/user.mjs";


passport.serializeUser((user, done)=> {
    console.log(`Inside serializer user`);
    console.log(user);
done(null, user.id);
});


passport.deserializeUser(async(id, done)=>{
    console.log(`Inside Deserializer with id: ${id}`);
    try{
        const findUser = await User.findById(id);
        if(!findUser) throw new Error("User not found");
        done(null, findUser);
    }catch(err){
        done(err, null);
    }
});


export default  passport.use(
    new Strategy(async(username, password, done)=>{
       
       console.log(`Username: ${username},
        Password: ${password}`);
        try{
            const findUser = await User.findOne({username});
            if(!findUser) throw new Error("User not found");
            if(findUser.password !== password) throw new Error("Invalid Password");
            done(null, findUser);
        }   catch(err){
            done(err, null);
        }
    })
);