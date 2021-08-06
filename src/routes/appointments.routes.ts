import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middllewares/ensureAuthenticated';
const appointmentsRouter = Router();

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user)

  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {

try {
  const { provider_id, date } = request.body;



  const parseDate = parseISO(date);
  const createAppointment = new CreateAppointmentService()


  const appointment = await createAppointment.execute({
  date: parseDate,
  provider_id,
});


  return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});



export default appointmentsRouter;
