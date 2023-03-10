import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "../../components/register/register-form.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import { Email } from "@material-ui/icons"
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import Box from '@mui/material/Box';


function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const validationSchema = yup.object({

    firstName: yup
      .string("Enter your First Name")
      .max(100, "Maximum should be alteast 100 charactors")
      .required("First Name is required"),

    lastName: yup
      .string("Enter your Last Name")
      .max(100, "Maximum should be alteast 100 charactors")
      .required("Last Name is Required"),

    email: yup
      .string('Email Address')
      .email('Enter a valid email')
      .required('Email is Required'),
     
    address: yup
      .string('Address')
      .required('Address is Required'), 

    city: yup
      .string('City')
      .required('City Name is Required'), 

    pincode: yup.number()
      // .matches(/[0-9]/, "only numbers are allowed")
      .min(6, "Pincode should be alteast 6 digits")
      .required("Pincoce is Required"),  

    mobileNumber: yup.string()
      .matches(/[0-9]/, "only numbers are allowed")
      .min(8, "Phone number should be alteast 8 digits")
      .required("Phone Number is Required"),

    password: yup
      .string("Enter your password")
      .min(6, "Password should be alteast 6 charactors")
      .required("Password is Required"),

    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required("Confirm Password is Required")

  });

  const { mutate, isError, isLoading, isSuccess, data, error } = useMutation({
    mutationFn: (data) => axios.post(`${BASE_URL}/Register`, data),
        onSuccess: (data) => {
          alert("Please check your registeration for verification")
          navigate("/login")            
          console.log(data)
        }
  });  
 
   const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address:"",
      city:"",
      pincode:"",
      mobileNumber: "",
      password: "",
      confirmPassword: "",

    },

    validationSchema,

    onSubmit: (values) => mutate(values),

  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();

  };

  return (
    <div>
      <div className='split left'>
        <div className='centered'>
            {isError && <div><h3>Something Went Wrong {error}</h3></div> }
            {isLoading && <div>Loading....</div>}
            {isSuccess && <div>Sucessfully Registered</div>}
          <form onSubmit={formik.handleSubmit} className="form-group">
             <h3> REGISTER</h3> 
             <p className="login-link">
                    Already have an acccount? <Link to="/login">Login</Link>
                  </p>
              {/* <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' }, }} autoComplete="off" >              */}
                <TextField
                  fullWidth
                  required  
                  id="firstName"
                  name="firstName"
                  type="text"
                  label="First Name"
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                /><br/>
                
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="Last Name"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                /><br/>
        
                <TextField
                  fullWidth
                  required
                  id="email"
                  name="email"
                  label="Email "
                  type="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}  
                /><br/>
                
                <TextField
                  fullWidth
                  required
                  id="address"
                  name="address"
                  type="text"
                  label="Address"
                  variant="outlined"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                /><br/>

                <TextField
                  fullWidth
                  required
                  id="city"
                  name="city"
                  type="text"
                  label="City"
                  variant="outlined"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                /><br/>

                <TextField
                  fullWidth
                  required
                  id="pincode"
                  name="pincode"
                  label="Pincode"
                  type="number"
                  variant="outlined"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                  helperText={formik.touched.pincode && formik.errors.pincode}
                /><br/>

                <TextField
                  fullWidth
                  required
                  id="mobileNumber"
                  name="mobileNumber"
                  label="Mobile Number"
                  type="text"
                  variant="outlined"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                  helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                /><br/>
        
                <TextField
                  fullWidth
                  required
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
                /><br/>
        
                <TextField
                  fullWidth
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined" 
                  type={showPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                /><br />
        
                <div className="btn-display">
                
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="button-btn"
                  >
                    Submit
                  </Button><br />

                  
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

export default RegisterForm;
