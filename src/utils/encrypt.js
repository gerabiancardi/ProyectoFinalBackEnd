import bcrypt from "bcrypt";

const createHashValue = async (val) => {
  const salt = await bcrypt.genSalt();
  return  bcrypt.hashSync(val, salt);
};

const isValidPasswd =  (psw, encryptedPsw) => {
  const validValue = bcrypt.compareSync(psw, encryptedPsw);
  console.log(validValue)
  return validValue;
};

export {
  createHashValue,
  isValidPasswd,
};