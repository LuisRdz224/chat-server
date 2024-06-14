import cors from 'cors';
import express, { Request, Response, Router } from 'express';
import path from 'path';

interface Options {
    port?: number,
    routes: Router
};

export class Server {
    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;
        this.middlewares();
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }

    async start() {
        this.app.use(this.routes)
        this.app.get('*', (_req: Request, res: Response) => {
            const indexPath = path.join(__dirname + '../../../public/index.html')
            res.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);

        })
    }
}