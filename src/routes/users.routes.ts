import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';



import ensureAuthenticated from '../middllewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

import multer from 'multer';
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta
const usersRouter = Router();

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {


try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

  return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
  return response.json({ ok: true });
  },
);

export default usersRouter;
