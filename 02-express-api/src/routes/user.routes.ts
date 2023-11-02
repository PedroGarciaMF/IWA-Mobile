import {Request, Response, Router} from 'express';

import {UserController} from '../controllers/user.controller';
import {AuthenticationHandler} from "../middleware/authentication.handler";
import {AuthorizationHandler} from "../middleware/authorization.handler";
import {siteRoutes} from "./site.routes";

const user_controller: UserController = new UserController();

export const userRoutes = Router();

userRoutes.param('id', function(req, res, next, id, name){
    console.log('User id parameter is: ' + id); //specified _id_ value comes from URL
    next();
});

userRoutes.get('/api/users',[AuthenticationHandler.verifyJWT, AuthorizationHandler.permitSelf], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Users']
        #swagger.summary = "Find users by keyword(s)"
        #swagger.description = "Gets all existing users searching by %keyword% format"
        #swagger.parameters['keywords'] = {
            in: 'query',
            description: 'Keyword(s) search for users to be found.',
            type: 'string'
        }
        #swagger.parameters['offset'] = {
            in: 'query',
            description: 'Offset of the starting record. 0 indicates the first record.',
            type: 'number'
        }
        #swagger.parameters['limit'] = {
            in: 'query',
            description: 'Maximum records to return. The maximum value allowed is 50.',
            type: 'number'
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

    user_controller.get_users(req, res);
});

userRoutes.get('/api/users/:id',[AuthenticationHandler.verifyJWT, AuthorizationHandler.permitSelf], (req: Request, res: Response) => {
    /*
       #swagger.tags = ['Users']
       #swagger.summary = "Get a user"
       #swagger.description = "Gets an existing user"
       #swagger.parameters['id'] = {
           description: 'Id of the user to be retrieved. Cannot be empty.'
       }
       #swagger.responses[200] = {
           description: "Success",
           schema: { $ref: '#/components/schemas/success' }
       }
       #swagger.responses[400] = {
           description: "Bad Request",
           schema: { $ref: '#/components/schemas/failure' }
       }
       #swagger.responses[404] = {
           description: "User Not Found",
           schema: { $ref: '#/components/schemas/failure' }
       }
       #swagger.responses[500] = {
           description: "Internal Server Error",
           schema: { $ref: '#/components/schemas/failure' }
       }
    */
    user_controller.get_user(req, res);
});

userRoutes.post('/api/users',[AuthenticationHandler.verifyJWT, AuthorizationHandler.permitAdmin], (req: Request, res: Response) => {
    /*
          #swagger.tags = ['Users']
          #swagger.summary = "Create new user"
          #swagger.description = "Creates a new user"
          #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/components/schemas/user"
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
    user_controller.create_user(req, res);
});

userRoutes.put('/api/users/:id', [AuthenticationHandler.verifyJWT, AuthorizationHandler.permitSelf], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Users']
        #swagger.summary = "Update a user"
        #swagger.description = "Updates an existing user"
        #swagger.parameters['id'] = {
            description: 'Id of the user to be updated. Cannot be empty.'
        }
        #swagger.responses[200] = {
            description: "Success",
            schema: { $ref: '#/components/schemas/success' }
        }
        #swagger.responses[400] = {
            description: "Bad Request",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[404] = {
            description: "User Not Found",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
     */
    user_controller.update_user(req, res);
});

userRoutes.delete('/api/users/:id', [AuthorizationHandler.permitAdmin], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Users']
        #swagger.summary = "Delete a user"
        #swagger.description = "Deletes an existing user"
        #swagger.parameters['id'] = {
            description: 'Id of the user to be deleted. Cannot be empty.'
        }
        #swagger.responses[200] = {
            description: "Success",
            schema: { $ref: '#/components/schemas/success' }
        }
        #swagger.responses[400] = {
            description: "Bad Request",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[404] = {
            description: "User Not Found",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
     */
    user_controller.delete_user(req, res);
});

