import express from "express"
const app = express()
const PORT = 3000
/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATCH = Alterar informação especifica 
 */

app.get("/", (req,res) =>{
    return res.json({message: "OLA NLW 05"})
})

app.post("/", (req,res) => {
    return res.json({message: "Usuario salvo com sucesso!"})
})

app.listen(PORT, () => console.log("Server is running on port:"+ PORT))
