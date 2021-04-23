import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionRepository } from "../repositories/ConnectionRepository"

interface IconnectionCreate{
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionService{
    private connectionRepository : Repository<Connection>
    constructor(){
        this.connectionRepository = getCustomRepository(ConnectionRepository)
    }
    async create({socket_id, user_id, admin_id, id}: IconnectionCreate){
        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id,
            id,
        });
        await this.connectionRepository.save(connection)
        return connection
    }

    async FindByUserId(user_id:string){
        const connection = await this.connectionRepository.findOne({
            user_id
        })
        return connection
    }

    async findAllWithOutAdmin(){
        const connections = await this.connectionRepository.find({
            where: {admin_id: null,},
            relations: [ "user" ],
        })

        return connections
    }

    async findBySocketId(socket_id: string){
        const connection = await this.connectionRepository.findOne({
            socket_id
        })

        return connection
    }

    async updateAdminId(user_id: string, admin_id: string){
        const settings = await this.connectionRepository.createQueryBuilder().update(Connection).set({admin_id}).where("user_id = :user_id",{
            user_id
        }).execute()
    }
}

export {ConnectionService}