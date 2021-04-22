import express, { response } from "express"
import { createServer } from "http"
import { Server, Socket} from "socket.io"
import path from "path"

import "./database"
import { routes } from "./routes"

const app = express()

app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/pages/client", (request,response)=>{
    return response.render("html/client.html")
})

const http = createServer(app) // Criando protocolo HTTP
const io = new Server(http) //Criando o WebSocket

io.on("connection", (socket: Socket)=>{
    //console.log("Se Conectou", socket.id)
})


app.use(express.json());


app.use(routes)
/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATCH = Alterar informação especifica 
 */

export {http, io}