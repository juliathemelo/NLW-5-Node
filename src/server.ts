import {http} from "./http" 
import "./websocket/client"
import "./websocket/admin"
const PORT = 3000

http.listen(PORT, () => console.log("Server is running on port:"+ PORT))
