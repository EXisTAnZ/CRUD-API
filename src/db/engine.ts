import userDB from './db';
import User from '../types/user';
import { ERROR_MSG } from '../types/constants';

export default class DBEngine {
  private db: User[];

  constructor() {
    this.db = userDB;
  }

  public async getUsers(): Promise<User[]> {
    return this.db;
  }

  public async getUserById(id: string): Promise<User> {
    const user = this.existedUser(id);
    if (!user) {
      throw new Error(ERROR_MSG.USER_NOT_FOUND);
    } else return user;
  }

  public async addUser(user: User) {
    console.log(user, this.isValidUser(user));
    if (!this.isValidUser(user)) {
      throw new Error(ERROR_MSG.MISS_REQUIRED);
    }
    if (this.isLoginUsed(user.username)) {
      throw new Error(ERROR_MSG.LOGIN_USED);
    } else this.db.push(user);
  }

  public async updateUser(user: User) {
    console.log(user, this.isValidUser(user));
    const userDB = this.existedUser(user.id);
    if (!userDB) {
      throw new Error(ERROR_MSG.USER_NOT_FOUND);
    } else if (
      userDB.username !== user.username &&
      this.isLoginUsed(user.username)
    ) {
      throw new Error(ERROR_MSG.LOGIN_USED);
    } else if (!this.isValidUser(user)) {
      throw new Error(ERROR_MSG.MISS_REQUIRED);
    } else {
      userDB.username = user.username;
      userDB.age = user.age;
      userDB.hobbies = user.hobbies;
    }
  }

  public async removeUser(id: string) {
    if (!this.existedUser(id)) {
      throw new Error(ERROR_MSG.USER_NOT_FOUND);
    }
    this.db.filter((user) => user.id !== id);
  }

  private isLoginUsed(login: string) {
    return !!this.db.find((user) => user.username === login);
  }

  private existedUser(id?: string) {
    return this.db.find((user) => user.id == id);
  }

  private isValidUser(user: User) {
    return !(
      !user.username ||
      typeof user.username !== 'string' ||
      !user.age ||
      typeof user.age !== 'number' ||
      !user.hobbies ||
      !Array.isArray(user.hobbies)
    );
  }
}
