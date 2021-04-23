import {io} from "../http"
import {ConnectionService} from "../services/ConnectionService"
import { MessageService } from "../services/MessageService"

io.on("connect", async (socket)=> {
    const connectionService = new ConnectionService()
    const messagesService = new MessageService()
    const allConnectionWithOutAdmin = await connectionService.findAllWithOutAdmin()

    io.emit("admin_list_all_users", allConnectionWithOutAdmin)

    socket.on("admin_list_messeges_by_user", async (params,callback)=>{
        const { user_id } = params

        const allMessages = await messagesService.listByUser(user_id)

        callback(allMessages)
    })
   socket.on("admin_send_message", async params =>{
       const {user_id, text} = params

       await messagesService.create({
           text,
           user_id,
           admin_id: socket.id
       })                                                                

       const { socket_id } = await connectionService.FindByUserId(user_id);

        io.to(socket_id).emit('admin_send_to_client', {
            text,
            socket_id: socket.id,
       })
   })
   socket.on("admin_user_in_support", async params => {
       const { user_id } = params
       const connection = await connectionService.updateAdminId(user_id, socket.id)

       const allConnectionWithOutAdmin = await connectionService.findAllWithOutAdmin()
       io.emit("admin_list_all_users", allConnectionWithOutAdmin)
       
   })
})

