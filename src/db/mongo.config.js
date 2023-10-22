import { connect } from "mongoose";
import {DB_URL,DB_NAME} from "../config/config.js"

const configConnection = {
  url: DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME
  },
};

const mongoDBConnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options);
    console.log(`connection succesfull`);

  } catch (err) {
    console.log("Erorr al conectar db", err);
  }
};

export default mongoDBConnection;