import axios from "axios";
import { fieldNames } from "../constants.js";
import { getRefreshToken } from "./UserService.js";

class UserService {
  async refreshToken(userId, companyId) {
    if (!userId || !companyId) {
      throw new Error("set userId and companyId");
    }

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIETN_SECRET;

    const refreshToken = getRefreshToken(userId);

    let res;
    try {
      res = await fetch("https://oauth.pipedrive.com/oauth/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      });
    } catch (error) {
      console.log(error);
    }
    let data = await res.json();
    const newAccessToken = data.access_token;
    return newAccessToken;
  }

  async updateDealFields(id, userId, companyId, newFields) {
    let res, data;

    const newAccessToken = await this.refreshToken(userId, companyId);

    const fields = await axios.get(
      `https://api.pipedrive.com/api/v1/dealFields`,
      {
        headers: { Authorization: `Bearer ${newAccessToken}` },
        responseType: "json",
      }
    );

    let nameToKey = {};
    for (let i = 0; i < fields.data.data.length; i++) {
      nameToKey[fields.data.data[i].name] = fields.data.data[i].key;
    }

    const updatedFields = {};
    for (let key in newFields) {
      updatedFields[nameToKey[key]] = newFields[key];
    }

    try {
      res = await fetch(`https://api.pipedrive.com/api/v1/deals/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });
      data = await res.json();
    } catch (error) {
      console.log(error);
    }

    return data;
  }

  async getDealFields(id, userId, companyId) {
    const newAccessToken = await this.refreshToken(userId, companyId);

    let res, data;
    let formFields = {};
    try {
      res = await fetch(`https://api.pipedrive.com/api/v1/dealFields`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
          "Content-Type": "application/json",
        },
      });
      const fields = await res.json();

      res = await fetch(`https://api.pipedrive.com/api/v1/deals/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
          "Content-Type": "application/json",
        },
      });
      data = await res.json();
      for (let i = 0; i < fields.data.length; i++) {
        if (fields.data[i].name in fieldNames)
          formFields[fields.data[i].name] = data.data[fields.data[i].key];
      }
    } catch (error) {
      console.log(error);
    }

    return formFields;
  }
}

export default new UserService();
