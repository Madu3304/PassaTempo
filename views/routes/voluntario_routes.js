import express from 'express'
import {getVoluntario, createVoluntario, updateVoluntario, deleteVoluntario} from '../controller/voluntario_controller.js'

const router = express.Router()

router.get('/voluntario', getVoluntario)
router.post('/voluntario',createVoluntario)
router.put('/voluntario/:id', updateVoluntario)
router.delete('/voluntario/:id', deleteVoluntario)

 export default router