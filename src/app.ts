import { envs } from './config';
import { checkConnection } from './db/connection';
import { Server } from './models/server';
import miamorpreciosa from './routes'

(() => {
    main();
})();

async function main() {
    await checkConnection();
    new Server({
        port: envs.PORT,
        routes: miamorpreciosa
    })
        .start();
}