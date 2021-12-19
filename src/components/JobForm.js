import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  company: yup.string().required("Company name is required"),
  site: yup.string().required("Job site is required"),
  salary: yup.string(),
  location: yup.string(),
  link: yup.string(),
  resume: yup.string(),
  coverLetter: yup.string(),
  status: yup.string().required("You must choose a status"),
});

const JobForm = ({ currentJob, updateJob, createJob, listType, error }) => {
  const updateMode = Object.keys(currentJob).length > 0;
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        if (updateMode) {
          updateJob(currentJob._id, values);
        } else {
          createJob(values);
        }
      }}
      initialValues={
        updateMode > 0
          ? currentJob
          : {
              title: "",
              company: "",
              site: "",
              salary: "",
              location: "",
              link: "",
              resume: "",
              coverLetter: "",
              status: listType ? listType : "Applied",
            }
      }
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Job Title</Form.Label>
            <Form.Control name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
            {touched.title && errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control name="company" onChange={handleChange} onBlur={handleBlur} value={values.company} />
            {touched.company && errors.company && <div style={{ color: "red" }}>{errors.company}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="site">
            <Form.Label>Job Site</Form.Label>
            <Form.Control
              name="site"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.site}
              placeholder="Ex. LinkedIn, Indeed ..."
            />
            {touched.site && errors.site && <div style={{ color: "red" }}>{errors.site}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control name="salary" onChange={handleChange} onBlur={handleBlur} value={values.salary} />
            {touched.salary && errors.salary && <div style={{ color: "red" }}>{errors.salary}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control name="location" onChange={handleChange} onBlur={handleBlur} value={values.location} />
            {touched.location && errors.location && <div style={{ color: "red" }}>{errors.location}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="link">
            <Form.Label>Job Link</Form.Label>
            <Form.Control
              name="link"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.link}
              placeholder="Enter Link"
            />
            {touched.link && errors.link && <div style={{ color: "red" }}>{errors.link}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="resume">
            <Form.Label>Resume</Form.Label>
            <Form.Control
              name="resume"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.resume}
              placeholder="Enter Link"
            />
            {touched.resume && errors.resume && <div style={{ color: "red" }}>{errors.resume}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="coverLetter">
            <Form.Label>Cover Letter</Form.Label>
            <Form.Control
              name="coverLetter"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.coverLetter}
              placeholder="Enter Link"
            />
            {touched.coverLetter && errors.coverLetter && <div style={{ color: "red" }}>{errors.coverLetter}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select id="status" name="status" onChange={handleChange} onBlur={handleBlur} value={values.status}>
              <option>Applied</option>
              <option>Wishlist</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
              <option>Accepted</option>
            </Form.Select>
            {touched.status && errors.status && <div style={{ color: "red" }}>{errors.status}</div>}
          </Form.Group>

          <Button variant="success" type="submit">
            Save Job
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default JobForm;
