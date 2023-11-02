import { Response } from 'express';
import moment from 'moment';

import { response_status_codes } from './model';

export function successResponse(message: string, data: any, res: Response) {
    res.status(response_status_codes.success).json(data);
}

export function failureResponse(message: string, data: any, res: Response) {
    res.status(response_status_codes.bad_request).json({
        status: 'failure',
        timestamp: moment().format(),
        message: message,
        data
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        status: 'failure',
        timestamp: moment().format(),
        message: 'Insufficient parameters',
        data: {}
    });
}

export function unauthorised(message: string, res: Response) {
    res.status(response_status_codes.unauthorized).json({
        status: 'failure',
        timestamp: moment().format(),
        message: message
    });
}

export function forbidden(message: string, res: Response) {
    res.status(response_status_codes.forbidden).json({
        status: 'failure',
        timestamp: moment().format(),
        message: message
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        status: 'failure',
        timestamp: moment().format(),
        message: 'MongoDB error',
        data: err
    });
}
