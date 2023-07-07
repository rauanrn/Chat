import express, { Application } from 'express'
import http from 'http'
import {Server} from 'socket.io'
import { createModuleResolutionCache } from 'typescript'

class App{

    private app: Application
    private http: http.Server
    private io: Server

    constructor(){
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);
        this.listenSocket();
        this.setupeRoutes();
    }

    listenServer(){
        this.http.listen(3000, ()=> console.log('server is running'))
    }

    listenSocket(){
        this.io.on('connection', (socket)=>{
            console.log("user connected => ", socket.id);

            socket.on('message', (msg)=>{

                const aMsg = {
                    idUser: socket.id,
                    msg: msg
                }

                console.log(aMsg.idUser);

                this.io.emit('message', (aMsg));
            });
        });
    }

    setupeRoutes(){
        this.app.get('/', (req, res)=>{
            res.sendFile(__dirname + '/index.html');
        })
    }
}


const app = new App()

app.listenServer()