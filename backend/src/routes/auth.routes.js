import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controllers.js";
import { profile, updateUser, deleteUser } from "../controllers/user.controllers.js";
import { searchMyPlans, DetailPlan, Interested, NotInterested, BeInterested } from "../controllers/plan.controllers.js";
import {statsgender, statsage} from "../controllers/stats.controllers.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.post('/profile', profile);
router.put('/updateUser', updateUser);
router.delete('/deleteUser/:id', deleteUser);

router.get('/searchMyPlans', searchMyPlans);
router.get('/DetailPlan', DetailPlan); //Datos del plan en detalle
router.get('/Interested', Interested); //Mirar si el usuario esta interesando en un plan
router.delete('/NotInterested', NotInterested) //Borrar registro si el usuario no esta interesado
router.post('/BeInterested', BeInterested) //agregar registro si el usuario  esta interesado


router.get("/statsgender",statsgender);
router.get("/statsage",statsage);

export default router; 