import CredentialsDto from "../dto/credentialsDto.js";
import { ServiceSession } from "../services/SessionServices.js";

const logout = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  const response = ServiceSession.logout(req.session);
  if (response) return res.redirect("/login");
  return res.send({ message: `logout Error`, body: err });
};

const login = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  try {
    const credentials = new CredentialsDto(req.body);
    const findUser = await ServiceSession.login(credentials);
    if (!findUser) {
      return res
        .status(401)
        .json({ message: "usuario no registrado/existente" });
    }
    req.session.user = findUser;
    return res.redirect("/products");
  } catch (error) {
    res.status(500).send({ error: "Error interno" });
  }
};

const register = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  try {
    const { role, email, password, first_name, last_name, age } = req.body;
    const response = await ServiceSession.register({
      role,
      email,
      password,
      first_name,
      last_name,
      age,
    });
    req.session.user = { ...response };
    return res.redirect("/login");
  } catch (error) {
    res.status(500).send({ error: "Error interno" });
  }
};

const cambioContraseña = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  try {
    const { password, email } = req.body;
    const response = ServiceSession.cambioContraseña({ password, email });
    if (response?.message) {
      return res.status(401).json(response.message);
    }
    return res.redirect("/login");
  } catch (error) {
    res.status(500).send({ error: "Error interno" });
  }
};

const cambiarRol = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  return await ServiceSession.cambiarRol(req.params._id, req.params.role);
};

const gitHubCallback = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  try {
    req.session.user = req.user;
    console.log(req.user)
    res.render("profile", {user:req.user});
  } catch (error) {
    res.status(500).send({ error: "Error interno" });
  }
};

const getUsers = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  try {
    return await ServiceSession.getUsers();
  } catch (error) {}
};

const deleteUsers = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  try {
    return await ServiceSession.deleteUsers();
  } catch (error) {
    error;
  }
};

const deleteUsersById = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl);
  try {
    return await ServiceSession.deleteUserById(req.params.uid);
  } catch (error) {
    error;
  }
};

export {
  login,
  logout,
  register,
  cambioContraseña,
  gitHubCallback,
  cambiarRol,
  getUsers,
  deleteUsers,
  deleteUsersById,
};
