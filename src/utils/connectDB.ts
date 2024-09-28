
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import mongoose from "mongoose";
import { constants } from './../constants';

const connectDB = async () => {
    return mongoose
      .connect(constants.MONGODB_URL, { retryWrites: true, w: 'majority' })
      .then(() => {
        console.log('MONGO DB CONNECTION SUCCESSFUL!');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  export default connectDB;