import express , {RequestHandler} from 'express'
import { initDB } from './server/datastore';
import { creatPostHandler, listPostHandler } from './server/handlers/PostHandler';
import { requestErrorHandlingMiddleware } from './server/middlewares/ErrorHandlingMiddleware';
import { requestLoggerMiddleware } from './server/middlewares/LoggerMiddleware';
import asyncHandler from 'express-async-handler';
import { signInHandler, signUpHandler } from './server/handlers/userHandler';


(async () =>  {

    await initDB();
    const app = express();
    app.use(express.json());



    // logger middleware
    app.use(requestLoggerMiddleware);


    // posts endpoint
    app.get('/posts',asyncHandler(listPostHandler));
    app.post('/posts', asyncHandler(creatPostHandler));

    app.post('/signup', asyncHandler(signUpHandler));
    app.post('/signin', asyncHandler(signInHandler));
    

    // errors middleware
    app.use(requestErrorHandlingMiddleware);


    // server
    app.listen(3000);

})(); 