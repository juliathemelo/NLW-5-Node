import express from "express"
import "./database"
import { routes } from "./routes"

const app = express()
const PORT = 3000
app.use(express.json());


app.use(routes)
/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATCH = Alterar informação especifica 
 */



app.listen(PORT, () => console.log("Server is running on port:"+ PORT))
