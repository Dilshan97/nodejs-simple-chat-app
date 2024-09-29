/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import axios from 'axios';
import { FC } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Register:FC = () => {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: unknown) => {
    await axios
      .post("http://localhost:4000/api/v1/user/register", data)
      .then((res: any) => {
        console.log(res);
        navigate(-1);
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
        type="text"
        {...register("username")}
        placeholder="User Name"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>

    Already have an account ? <Link to={"/"}>Login</Link>
  </div>
  )
}

export default Register