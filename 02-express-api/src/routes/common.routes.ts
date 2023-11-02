import {Request, Response, Router} from 'express';
import {AuthorizationHandler} from "../middleware/authorization.handler";

export const commonRoutes = Router();

// redirect root to api-docs
commonRoutes.get('/', [AuthorizationHandler.permitAll], function (req: Request, res: Response) {
    res.redirect('/api-docs');
});

// URL not found
commonRoutes.all('*', [AuthorizationHandler.permitAll], function (req: Request, res: Response) {
    res.status(404).send({error: true, message: 'Please check your URL.'});
});
