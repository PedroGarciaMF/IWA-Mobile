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

import {ProductController} from '../controllers/product.controller';
import {AuthenticationHandler} from "../middleware/authentication.handler";
import {AuthorizationHandler} from "../middleware/authorization.handler";

const product_controller: ProductController = new ProductController();

export const productRoutes = Router();

productRoutes.get('/api/products', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Products']
        #swagger.summary = "Find products by keyword(s)"
        #swagger.description = "Gets all existing products searching by %keyword% format"
        #swagger.parameters['keywords'] = {
            in: 'query',
            description: 'Keyword(s) search for products to be found.',
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
    product_controller.get_products(req, res);
});

productRoutes.get('/api/products/:id', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Products']
        #swagger.summary = "Get a product"
        #swagger.description = "Gets an existing product"
        #swagger.parameters['id'] = {
            description: 'Id of the product to be retrieved. Cannot be empty.'
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
            description: "Product Not Found",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
     */
    product_controller.get_product(req, res);
});

productRoutes.get('/api/products/:id/image', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Products']
        #swagger.summary = "Get product image by Id"
        #swagger.description = "Gets an existing product's image by its Id"
        #swagger.parameters['name'] = {
            description: 'Id of the product image to be retrieved. Cannot be empty.'
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
            description: "Product Not Found",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
     */
    product_controller.get_product_image_by_id(req, res);
});

productRoutes.get('/api/products/:name/image', [AuthorizationHandler.permitAll], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Products']
        #swagger.summary = "Get product image by name"
        #swagger.description = "Gets an existing product's image by its uploaded name"
        #swagger.parameters['name'] = {
            description: 'Name of the product image to be retrieved. Cannot be empty.'
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
            description: "Image Not Found",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
     */
    product_controller.get_product_image_by_name(req, res);
});


productRoutes.post('/api/products', [AuthenticationHandler.verifyJWT, AuthorizationHandler.permitAdmin], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Products']
        #swagger.summary = "Create new product"
        #swagger.description = "Creates a new product"
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/product"
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
    res.setHeader('Content-Type', 'application/json');
    product_controller.create_product(req, res);
});

productRoutes.put('/api/products/:id', [AuthenticationHandler.verifyJWT, AuthorizationHandler.permitAdmin], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Products']
        #swagger.summary = "Update a product"
        #swagger.description = "Updates an existing product"
        #swagger.parameters['id'] = {
            description: 'Id of the product to be updated. Cannot be empty.'
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
            description: "Product Not Found",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
     */
    product_controller.update_product(req, res);
});

productRoutes.delete('/api/products/:id', [AuthenticationHandler.verifyJWT, AuthorizationHandler.permitAdmin], (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Products']
        #swagger.summary = "Delete a product"
        #swagger.description = "Deletes an existing product"
        #swagger.parameters['id'] = {
            description: 'Id of the product to be deleted. Cannot be empty.'
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
            description: "Product Not Found",
            schema: { $ref: '#/components/schemas/failure' }
        }
        #swagger.responses[500] = {
            description: "Internal Server Error",
            schema: { $ref: '#/components/schemas/failure' }
        }
     */
    product_controller.delete_product(req, res);
});


