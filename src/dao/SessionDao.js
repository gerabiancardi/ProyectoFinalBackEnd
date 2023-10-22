import userModel from "./models/user.models.js";

class SessionDao {
  addUser = async (body) => {
    const newUser = await userModel.create(body);
    return newUser;
  };

  findUser = async ({ email }) => {
    const user = await userModel.findOne({ email });
    return user;
  };

  findUserById = async ( id ) => {
    const user = await userModel.findById(id);
    return user;
  };


  updateUser = async (userId, newPswHashed) => {
    const updateUser = await userModel.findByIdAndUpdate(userId, {
      password: newPswHashed,
    });
    return updateUser;
  };

  updateRol = async (userId, newRole) => {
    const updateUser = await userModel.findByIdAndUpdate(userId, {
      role: newRole,
    });
    return updateUser;
  };

  getUsers = async () => {
    const users = await userModel.find();
    return users;
  };

  updateLastLogin = async (userId) => {
    const updateUser = await userModel.findByIdAndUpdate(userId, {
      lastLogin: new Date(),
    });
    return updateUser;
  };

  deleteUsers = async () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const deletesUsers = await userModel.find({
      lastLogin: { $gt: twoDaysAgo },
    });
    await userModel.deleteMany({ lastLogin: { $gt: twoDaysAgo } });
    return deletesUsers;
  };

  deleteUserById = async (id) => {
    return await userModel.findByIdAndDelete(id);
  };
}

export const sessionDao = new SessionDao();
