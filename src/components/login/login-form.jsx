import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "../../components/login/login-form.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
// import Box from '@mui/material/Box';

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)

  const validationSchema = yup.object({
    email: yup
      .string('Email Address')
      .email('Enter a valid email')
      .required('Email is Required'),

    password: yup
      .string("Enter your password")
      .min(6, "Password should be alteast 6 charactors")
      .required("Password is Required"),
  });

  // const { mutate, isError, isLoading, isSuccess, data, error } = useMutation(data => {
  //   console.log(data);
  // //   return axios.post(`${BASE_URL}/Login`, data)
  // return axios.post(`https://636499fa8a3337d9a2fa509b.mockapi.io/bbr`, data)
  // });
  const { mutate, isError, isLoading, isSuccess, data, error } = useMutation({
    mutationFn: (data) => axios.post(`${BASE_URL}/Login`, data),
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      navigate("/from-to-page")
    }

  });

  const formik = useFormik({

    initialValues: {
      email: "",
      password: "",

    },
    validationSchema,
    onSubmit: (values) => mutate(values),
    
    // onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));
    //   console.log(values)


  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className='split left'>
        <div className='centered'>
          {isError && <div>Something went wrong</div>}
          {isLoading && <div>Loading....</div>}
          {isSuccess && <div> Login Sucessfully </div>}
          <form onSubmit={formik.handleSubmit}
            className="form-group">
            <h3> LOGIN </h3>
            <p className="register-link">
              Don't have an account
              <Link to="/register">Register</Link>
            </p> <br />
            {/* <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' }, }} autoComplete="off" > */}


            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email "
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            /> <br/>

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}

            />

            <br />

            <Link to="/forgot-password">Forgot Password</Link>
            <br />
            <div className="btn-display">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="button-btn"
              >
                Login
              </Button>

              <br />

            </div>
            {/* </Box> */}
          </form>
        </div>
      </div>
      <div className='split right'>
        <div className='centered'>
          <img src='https://img.freepik.com/free-vector/passengers-waiting-bus-city-queue-town-road-flat-vector-illustration-public-transport-urban-lifestyle_74855-8493.jpg?w=1380&t=st=1672835730~exp=1672836330~hmac=e1dab8b770864370730b233355d91e473b3892a7dc15b20e4d43fc16696b0490' alt='' width="1000px"/>
      </div>
      </div> 
    </div>
  );
}

export default LoginForm;
