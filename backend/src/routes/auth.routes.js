import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controllers.js";

import { profile, updateUser, deleteUser, searchMyRole } from "../controllers/user.controllers.js";
import { searchMyPlans,searchAllPlans, DetailPlan, Interested, NotInterested, BeInterested, createMyPlan } from "../controllers/plan.controllers.js";
import {statsgender, statsage} from "../controllers/stats.controllers.js";

import { seeUsers } from "../controllers/admin.controllers.js";
import { seePlns } from "../controllers/admin.controllers.js";

const router = Router();

router.get('/seeUsers', seeUsers);
router.get('/seePlns', seePlns);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.post('/profile', profile);
router.put('/updateUser', updateUser);
router.delete('/deleteUser/:id', deleteUser);

router.get('/searchMyPlans', searchMyPlans);
router.get('/searchAllPlans', searchAllPlans);
router.get('/DetailPlan', DetailPlan); //Datos del plan en detalle
router.get('/Interested', Interested); //Mirar si el usuario esta interesando en un plan
router.delete('/NotInterested', NotInterested) //Borrar registro si el usuario no esta interesado
router.post('/BeInterested', BeInterested) //agregar registro si el usuario  esta interesado
router.post('/createplan', createMyPlan); //crear un plan


router.get("/statsgender",statsgender);//Buscar Estadisticas por Género
router.get("/statsage",statsage);//Buscar Estadísticas por Edad
router.get("/searchMyRole", searchMyRole);//Buscar el Rol de Un usuario Loggeado

export default router; 