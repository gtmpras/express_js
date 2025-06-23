
import {Router} from 'express';

const router = Router();

router.get("/api/products", (request, response)=>{
    response.send([{
        id: 123, name: "Coffee", price: 200
    }]);
})


export default router;
