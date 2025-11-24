import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId)

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async login({ email, password }) {
    try {
      const loginAccount = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return loginAccount;
    } catch (error) {
      console.error(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async logoutAccount() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error(error);
    }
  }
}

const authService = new AuthService();

export default authService;
