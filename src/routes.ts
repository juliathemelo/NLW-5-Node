import { request, response, Router} from "express"
import { getCustomRepository } from "typeorm"
import { SettingsRepository } from './repositories/SettingsRepository'

const routes = Router()

/**
 * Tipos de parametros
 * Routes Params => parametros de rotas
 * Query Params => filtro e busca
 * Body Params => 
 */

routes.post("/settings", async (request,response) => {
    const {chat, username} = request.body
    const settingsRepository = getCustomRepository(SettingsRepository);
    const settings = settingsRepository.create({
        chat,
        username,
    })

    await settingsRepository.save(settings);

    return response.json(settings)
})

export {routes}