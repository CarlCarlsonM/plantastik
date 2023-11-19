import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controllers.js";
import { profile, updateUser, deleteUser } from "../controllers/user.controllers.js";
import { searchMyPlans } from "../controllers/plan.controllers.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.post('/profile', profile);
router.put('/updateUser', updateUser);
router.delete('/deleteUser/:id', deleteUser);

router.get('/searchMyPlans', searchMyPlans);

export default router; 