import express from 'express';
import { RegisterUser } from '../controllers/user.js'
const router = express.Router();

router.post('/', RegisterUser)
router.get('/',(req, res)=>{

})
export default router