/*
        IWA-Express - Insecure Express JS REST API

        Copyright 2023 Open Text or one of its affiliates.

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

        You should have received a copy of the GNU General Public License
        along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import {Request, Response, Router} from 'express';

import {UserController} from '../controllers/user.controller';
import {AuthenticationHandler} from "../middleware/authentication.handler";
import {AuthorizationHandler} from "../middleware/authorization.handler";
import Logger from "../middleware/logger";
import {IUser} from "../modules/users/model";
import {mongoError, successResponse} from "../modules/common/service";
import {EncryptUtils} from "../utils/encrypt.utils";

import users from '../modules/users/schema';

const user_controller: UserController = new UserController();

export const userRoutes = Router();

userRoutes.param('id', function (req, res, next, id, name) {
    Logger.debug('User id parameter is: ' + id); //specified _id_ value comes from URL
    next();
});

userRoutes.get('/api/users', [AuthenticationHandler.verifyJWT, AuthorizationHandler.permitSelf], (req: Request, res: Response) => {
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

userRoutes.get('/api/users/:id', [AuthenticationHandler.verifyJWT, AuthorizationHandler.permitSelf], (req: Request, res: Response) => {
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

userRoutes.get('/api/user/', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
       #swagger.tags = ['Users']
       #swagger.summary = "Get a user using query"
       #swagger.description = "Gets an existing user using a MongoDb Query"
       #swagger.parameters['q'] = {
           description: 'MongoDb query'
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

    Logger.debug(`Retrieving user using query: ${JSON.stringify(req.query)}`);
    const userQuery = req.query.q;
    users.findOne({ userQuery }, (err: any, user_data: IUser) => {
        if (err) {
            mongoError(err, res);
        } else {
            successResponse('Successfully retrieved user', user_data, res);
        }
    });
});

userRoutes.post('/api/users', [AuthenticationHandler.verifyJWT, AuthorizationHandler.permitAdmin], (req: Request, res: Response) => {
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

