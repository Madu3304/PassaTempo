import express from 'express'
import {getParticipacao, createParticipacao, updateParticipacao, deleteParticipacao} from '../controller/participacao_controller.js'

const router = express.Router()

router.get('/participacao', getParticipacao)
router.post('/participacao',createParticipacao)
router.put('/participacao/:id', updateParticipacao)
router.delete('/participacao/:id', deleteParticipacao)

 export default router