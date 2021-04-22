import {Router} from "express"
import { MessageController } from "./controller/MessagesController"
import { SettingsController } from "./controller/SettingsController"
import { UsersController } from "./controller/UsersController"


const routes = Router()

/**
 * Tipos de parametros
 * Routes Params => parametros de rotas
 * Query Params => filtro e busca
 * Body Params => 
 */

const settingsController = new SettingsController()
const usersController = new UsersController()
const messageController = new MessageController()

routes.post("/settings", settingsController.create)
routes.post("/users", usersController.create)
routes.post("/messages", messageController.create)
routes.get("/messages/:id", messageController.showByUser)

export {routes}