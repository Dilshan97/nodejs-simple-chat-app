/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import axios from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login: FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: unknown) => {
    await axios
      .post("http://localhost:4000/api/v1/user/login", data)
      .then((res: any) => {
        localStorage.setItem('access_token', res.data.payload);
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          {...register("phoneNumber")}
          placeholder="Phone Number"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

      Don't have an account ? <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default Login;
