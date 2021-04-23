import { Connection } from "../entities/Connection"
import {io} from "../http"
import {ConnectionService} from "../services/ConnectionService"
import {UsersService} from "../services/UserService"
import {MessageService} from "../services/MessageService"

interface Iparams{
    text: string,
    email: string
}

io.on("connect", (socket) => {
    const connectionService = new ConnectionService()
    const usersService = new UsersService()
    const messageService = new MessageService()

    socket.on("client_first_acess", async params => {

        const socket_id = socket.id
        const {text, email} = params as Iparams
        let user_id = null


        const userExist = await usersService.findByEmail(email)

        if(!userExist){
            const user = await usersService.create(email)

            await connectionService.create({
                socket_id,
                user_id: user.id
            })
            user_id = user.id
        }else{
            user_id = userExist.id
            const connection = await connectionService.FindByUserId(userExist.id)
            if(!connection){
                await connectionService.create({
                    socket_id,
                    user_id: userExist.id
                })
            }else{
                connection.socket_id = socket_id
                await connectionService.create(connection)
            }
        }

        await messageService.create({
            text,
            user_id
        })
       const allMessages = await messageService.listByUser(user_id)
       socket.emit("client_list_all_messages", allMessages)
    })

    socket.on("client_send_to_admin", async params =>{
        const {text, socket_admin_id} = params
        const socket_id = socket.id
        const { user_id } = await connectionService.findBySocketId(socket_id)


        const message = await messageService.create({
            text,
            user_id,
        })

        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id
        })
    })
})