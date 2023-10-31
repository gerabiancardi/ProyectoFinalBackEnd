import userModel from "./models/user.models.js";

class SessionDao {
  addUser = async (body) => {
    try {
      const newUser = await userModel.create(body);
      return newUser;
    } catch (error) {
      console.log(error)
    }
  };

  findUser = async ({ email }) => {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(error)
    }
  };

  findUserById = async ( id ) => {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      console.log(error)
    }
  };


  updateUser = async (userId, newPswHashed) => {
    try {
      const updateUser = await userModel.findByIdAndUpdate(userId, {
        password: newPswHashed,
      });
      return updateUser;
    } catch (error) {
      console.log(error)
    }
  };

  updateRol = async (userId, newRole) => {
    try {
      const updateUser = await userModel.findByIdAndUpdate(userId, {
        role: newRole,
      });
      return updateUser;
    } catch (error) {
      console.log(error)
    }
  };

  getUsers = async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.log(error)
    }
  };

  updateLastLogin = async (userId) => {
    try {
      const updateUser = await userModel.findByIdAndUpdate(userId, {
        lastLogin: new Date(),
      });
      return updateUser;
    } catch (error) {
      console.log(error)
    }
  };

  deleteUsers = async () => {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const deletesUsers = await userModel.find({
        lastLogin: { $gt: twoDaysAgo },
      });
      await userModel.deleteMany({ lastLogin: { $gt: twoDaysAgo } });
      return deletesUsers;
    } catch (error) {
      console.log(error)
    }
  };

  deleteUserById = async (id) => {
    try {
      return await userModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error)
    }
  };
}

export const sessionDao = new SessionDao();
