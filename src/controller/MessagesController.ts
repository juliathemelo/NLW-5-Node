import {Request, Response} from "express"
import { MessageService } from "../services/MessageService";


class MessageController{
    async create(request: Request, response: Response):Promise<Response>{
        const {admin_id,user_id,text} = request.body

        const messagesService = new MessageService();

        const message = await messagesService.create({
            admin_id,
            user_id,
            text
        })

        return response.json(message)
    }

    //localhost:3000/messages/Id
    async showByUser(request: Request, response: Response){
        const {id} = request.params
        const messagesService = new MessageService();
        const list = await messagesService.listByUser(id)

        return response.json(list)
    }
}

export {MessageController}