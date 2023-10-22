import userModel from "../models/user.models.js";

class UserManager {
  addUser = async (body) => {
    const newUser = await userModel.create(body);
    return newUser;
  };

  findUser = async ({ email }) => {
    const user = await userModel.findOne({ email });
    return user;
  };
}

export const userManager = new UserManager();
