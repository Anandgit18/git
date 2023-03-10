import React from 'react'
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import "../../components/forgot-password/forgot-password.css"
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';


function ForgotPassword() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string('Email Address')
      .email('Enter a valid email')
      .required('Email is Required'),
  });
  // const { mutate, isError, isLoading, isSuccess, data, error } = useMutation(data => {
  //   console.log(data);
  //   return axios.post(`${BASE_URL}/forgetPassword?email=${data.email}`, data)
  // });
  const { mutate, isError, isLoading, isSuccess, data, error } = useMutation({
    mutationFn: (data) => axios.post(`${BASE_URL}/ForgotPassword?email=${data.email}`, data),
    onSuccess: (data) => {
      alert("Check your Email!!!")
      navigate("/login")
      console.log(data)
    }
  });
  const formik = useFormik({
    initialValues: {
      email: "",

    },
    validationSchema,
    onSubmit: (values) => mutate(values),

  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="form-group">
        <h3> FORGOT PASSWORD</h3>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' }, }} noValidate autoComplete="off" >
          {/* {isError ? <div>Something went wrong</div> : isSuccess ? <div> Check your Email!!!  {JSON.stringify(data)}</div> : isLoading ? <div> Loading.....</div> : null} */}
          {isError && <div>Something went wrong</div>}
          {isLoading && <div>Loading....</div>}
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            variant='outlined'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <br />
          <div className="btn-display">
            <Button type="submit" variant="contained" color="primary" className="button-btn">
              Submit
            </Button>
          </div>
        </Box>
      </form>
    </>
  )

}

export default ForgotPassword
