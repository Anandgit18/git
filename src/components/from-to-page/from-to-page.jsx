import { useFormik } from 'formik';
import Select from 'react-select';
// import moment from 'moment';
import * as yup from "yup";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './from-to-page.css'
import { redirect, useNavigate } from 'react-router-dom';

function FromToPage() {
  const navigate = useNavigate();

  const [fromToFields, setFromToFields] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    getFromToFields();
  }, [])

  const getFromToFields = () => {
    setLoading(true);
    axios.get("https://636499fa8a3337d9a2fa509b.mockapi.io/userReacttoolkit")
      .then(res => {
        setFromToFields(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const validationSchema = yup.object({
    from: yup
      .string()
      .required('Please select a starting location'),

    to: yup
      .string()
      .required('Please select a destination')
      .notOneOf([yup.ref('from'), 'Please select a different destination']),

    date: yup
      .date()
      .required('Please select a date')
      .min(new Date(), 'Please select a date in the future'),
  });

  const formik = useFormik({
    initialValues: {
      from: "",
      to: "",
      date: "",
    },
    validationSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      redirect(`/booking?from=$(values.from)&to=$(values.to)&date=$(values.date)`)
      // navigate("/booking")
      console.log(values)
    },
  });

  return (
    <div>
      {loading && <div>Loading....</div>}
      <form onSubmit={formik.handleSubmit} >
        <label>
          From:
          <Select
            id="from"
            name="from"
            placeholder="Select City"
            type="text"
            label="From"
            isSearchable={true}
            onChange={(option) => formik.setFieldValue("from", option.value)}
            options={fromToFields}
            value={fromToFields.filter((option) => option.value === formik.values.from)}
          />
        </label>
        <span style={{ color: "red", fontSize: "12" }}>{formik.touched.from && Boolean(formik.errors.from) && formik.errors.from}</span>
        <br /> <br />
        <label>
          To:
          <Select
            id="to"
            name="to"
            placeholder="Select City"
            type="to"
            isSearchable={true}
            onChange={(option) => formik.setFieldValue("to", option.value)}
            value={fromToFields.filter((option) => option.value === formik.values.to)}
            options={fromToFields}
          />
        </label>
        <span style={{ color: "red", fontSize: "12" }}>{formik.touched.to && Boolean(formik.errors.to) && formik.errors.to}</span>
        <br /> <br />
        <label>
          Date:
          <input
            id="date"
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
        </label>
        <span style={{ color: "red", fontSize: "12" }}>{formik.touched.date && Boolean(formik.errors.date) && formik.errors.date}</span>
        <br /> <br />
        <button type="submit" >Search</button>
      </form>
    </div>
  )
}
export default FromToPage