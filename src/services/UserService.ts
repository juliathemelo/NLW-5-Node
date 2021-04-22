import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/UsersRepository"


class UsersService{
    private usersRepository : Repository<User>
    constructor(){
        this.usersRepository = getCustomRepository(UserRepository)
    }
    
    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
      
        return user;
    }

    async create(email: string){
        
        //Verificar se usuario existe
        const userExist = await this.usersRepository.findOne({
            email
        })
        if(userExist){
            return userExist
        }
        
        const user = this.usersRepository.create({
            email
        })

        await this.usersRepository.save(user)
        //Se não existir, salvar no BD

        //Se existir, retonar usuario
        return user
    }
}

export {UsersService}