import express from 'express'
// import cors from 'cors'
// import bodyParser from 'body-parser'
// import route from './routes/user.js'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './container'
// const app = express();
// app.use(bodyParser.json());
// app.use(cors())

// app.use('/',route);

export class App {
    async setup() {
        const server = new InversifyExpressServer(container)
        server.setConfig((app) => {
            app.use(express.json())
        })
        const app = server.build()
        const PORT = 4000 || 5000
        app.listen(PORT, ()=> console.log(`app listening on port ${PORT}`))
    }
}




// export default app