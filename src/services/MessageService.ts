import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessageRepository } from "../repositories/MessageRepository";

interface IMessageCreate{
    admin_id?: string,
    text: string,
    user_id: string
}

class MessageService{
    private messageRepository : Repository<Message>;

    constructor(){
       this.messageRepository =  getCustomRepository(MessageRepository);
    }
    async create({admin_id, user_id, text}: IMessageCreate){

        const message = this.messageRepository.create({
            admin_id,
            text,
            user_id
        })

        await this.messageRepository.save(message)
        return message
    }
    async listByUser(user_id: string){
        
        const list = await this.messageRepository.find({
            where: {user_id},
            relations: ["user"]
        })

        return list
    }
}

export { MessageService }