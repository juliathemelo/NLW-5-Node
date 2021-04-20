import {Router} from "express"
import { SettingsController } from "./controller/SettingsController"


const routes = Router()

/**
 * Tipos de parametros
 * Routes Params => parametros de rotas
 * Query Params => filtro e busca
 * Body Params => 
 */

const settingsController = new SettingsController()

routes.post("/settings", settingsController.create)

export {routes}