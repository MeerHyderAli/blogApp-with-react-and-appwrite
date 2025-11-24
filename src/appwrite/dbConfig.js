import { Client, ID, TablesDB, Storage, Query } from "appwrite";
import config from "../config/config";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId);
    this.databases = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listRows(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error(error);
    }
  }

  //fileUpload
  async uploadFile(file) {
    try {
      await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      await this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const service = new Service();

export default service;
