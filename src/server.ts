import {http} from "./http" 
import "./websocket/client"
const PORT = 3000

http.listen(PORT, () => console.log("Server is running on port:"+ PORT))
