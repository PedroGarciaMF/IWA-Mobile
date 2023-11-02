import { IUser } from './model';
import users from './schema';

export default class UserService {

    public filterUsers(query: any, offset: number = 0, limit: number = 50, callback: any) {
        users.find(query, callback).skip(offset).limit(limit);
    }

    public filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public createUser(user_params: IUser, callback: any) {
        const _session = new users(user_params);
        _session.save(callback);
    }

    public updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        users.findOneAndUpdate(query, user_params, callback);
    }

    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}
