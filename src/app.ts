import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from '@/presentation/server';
import { envs } from './config/plugins/envs.plugin';



(async() => {

main();

})();


async function main(){
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'app.ts',
    //     }
    // });

    // console.log('newLog', newLog);

    // //Create a collection = tables, document = log
    // const newLog = await LogModel.create({
    //     message: 'Hello World',
    //     origin: 'app.ts',
    //     level: 'critical',
    // });
    // await newLog.save();

    // console.log('newLog', newLog);

    Server.start();  
}