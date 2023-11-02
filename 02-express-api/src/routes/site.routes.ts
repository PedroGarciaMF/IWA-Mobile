import {Request, Response, Router} from 'express';

import {SiteController} from "../controllers/site.controller";
import {AuthorizationHandler} from "../middleware/authorization.handler";
import * as child_process from "child_process";
import fs from "fs";

const site_controller: SiteController = new SiteController();

export const siteRoutes = Router();

siteRoutes.get('/api/site/status', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
       #swagger.tags = ['Site']
       #swagger.summary = "Get the site status"
       #swagger.description = "Get the site message of the day"
           #swagger.responses[200] = {
               description: "Success",
               schema: { $ref: '#/components/schemas/success' }
           }
           #swagger.responses[400] = {
               description: "Bad Request",
               schema: { $ref: '#/components/schemas/failure' }
           }
           #swagger.responses[500] = {
               description: "Internal Server Error",
               schema: { $ref: '#/components/schemas/failure' }
           }
    */

    res.status(200).json({health: "OK", "motd": ""});
});


siteRoutes.get('/api/site/email-already-exists/:email',[AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
       #swagger.tags = ['Site']
       #swagger.summary = "Check if email is taken"
       #swagger.description = "Check if a user with the specified email already exists in the site"
           #swagger.parameters['email'] = {
               in: 'query',
               description: 'Email address to check. Cannot be empty.',
               type: 'string'
           }
           #swagger.responses[200] = {
               description: "Success",
               schema: { $ref: '#/components/schemas/success' }
           }
           #swagger.responses[400] = {
               description: "Bad Request",
               schema: { $ref: '#/components/schemas/failure' }
           }
           #swagger.responses[500] = {
               description: "Internal Server Error",
               schema: { $ref: '#/components/schemas/failure' }
           }
    */

    res.status(200).json({});
});


siteRoutes.post('/api/site/register-user', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
       #swagger.tags = ['Site']
       #swagger.summary = "Register a new user"
       #swagger.description = "Register a new user with the site"
             #swagger.requestBody = {
                 required: true,
                 content: {
                     "application/json": {
                         schema: {
                             $ref: "#/components/schemas/registerUser"
                         }
                     }
                 }
             }
           #swagger.responses[200] = {
               description: "Success",
               schema: { $ref: '#/components/schemas/success' }
           }
           #swagger.responses[400] = {
               description: "Bad Request",
               schema: { $ref: '#/components/schemas/failure' }
           }
           #swagger.responses[409] = {
               description: "User Already Exists",
               schema: { $ref: '#/components/schemas/failure' }
           }
           #swagger.responses[500] = {
               description: "Internal Server Error",
               schema: { $ref: '#/components/schemas/failure' }
           }
    */

    res.status(200).json({message: "Post request successfull"});
});

siteRoutes.post('/api/site/subscribe-user', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
       #swagger.tags = ['Site']
       #swagger.summary = "Subscribe a new user"
       #swagger.description = "Subscribe a new user to the newsletter"
             #swagger.requestBody = {
                 required: true,
                 content: {
                     "application/json": {
                         schema: {
                             $ref: "#/components/schemas/subscribeUser"
                         }
                     }
                 }
             }
        #swagger.responses[200] = {
            description: "Success",
            schema: { $ref: '#/components/schemas/success' }
        }
        #swagger.responses[400] = {
            description: "Bad Request",
            schema: { $ref: '#/components/schemas/failure' }
        }
           #swagger.responses[409] = {
               description: "User Already Exists",
               schema: { $ref: '#/components/schemas/failure' }
           }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
    */

    site_controller.subscribe_user(req, res);
});

siteRoutes.post('/api/site/sign-in', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
       #swagger.tags = ['Site']
       #swagger.summary = "Sign-in"
       #swagger.description = "Sign in as an authorised user"
             #swagger.requestBody = {
                 required: true,
                 content: {
                     "application/json": {
                         schema: {
                             $ref: "#/components/schemas/signInUser"
                         }
                     }
                 }
             }
        #swagger.responses[200] = {
            description: "Success",
            schema: { $ref: '#/components/schemas/success' }
        }
        #swagger.responses[400] = {
            description: "Bad Request",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
    */

    site_controller.login_user(req, res);
    res.cookie("user", req.url);

});

siteRoutes.post('/api/site/sign-out', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {

    /*
       #swagger.tags = ['Site']
       #swagger.summary = "Sign-out"
       #swagger.description = "Sign out an authorised user"
             #swagger.requestBody = {
                 required: true,
                 content: {
                     "application/json": {
                         schema: {
                             $ref: "#/components/schemas/signOutUser"
                         }
                     }
                 }
             }
       #swagger.responses[200] = {
            description: "Success",
            schema: { $ref: '#/components/schemas/success' }
        }
        #swagger.responses[400] = {
            description: "Bad Request",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
    */

    res.status(200).json({message: "Post request successfull"});
});

siteRoutes.post('/api/site/refresh-token', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
       #swagger.tags = ['Site']
       #swagger.summary = "Refresh token"
       #swagger.description = "Refresh users JwtAuthHandler access token"
             #swagger.requestBody = {
                 required: true,
                 content: {
                     "application/json": {
                         schema: {
                             $ref: "#/components/schemas/refreshUser"
                         }
                     }
                 }
             }
        #swagger.responses[200] = {
            description: "Success",
            schema: { $ref: '#/components/schemas/success' }
        }
        #swagger.responses[400] = {
            description: "Bad Request",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
    */

    res.status(200).json({message: "Post request successfull"});
});

siteRoutes.post('/api/site/backup-newsletter-db', [AuthorizationHandler.permitAdmin], (req: Request, res: Response) => {
   site_controller.backup_newsletter_db(req, res);
});

/*siteRoutes.post('/api/site/upload-image', function(request, response) {
    fs.writeFileSync(`/tmp/upload/${request.body.name}`);

    // convert the image to correct size and format
    convert({
        file: `/tmp/upload/${request.body.name}`,
        width: 600,
        height: 400,
        type: 'jpeg'
    }).then(response => {
        // Command injection example
        exec('rm /tmp/upload/${request.body.name}');
        return response.sendStatus(200);
    }).catch(error => {
        return response.sendStatus(500);
    })

});*/
