import { Server } from "./sevrer.ts"

// console.log(environment().db_url)
let app= new Server().app


app.listen(3000)
