
import { Router } from 'express'

import codigoDeBarraController from './controller/CodBarraController';

const routes = Router();

routes.get('/boleto/:cb', codigoDeBarraController.consultCDB)


export default routes