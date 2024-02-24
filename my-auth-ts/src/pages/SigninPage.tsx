import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SigninPage: React.FC = () => {
    const navigate = useNavigate()
  return (
    <div className="signup">
      <h1>Signin</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SigninSchema}
        onSubmit={async (values: { email: string; password: string }) => {
            try {
                const response = await fetch('http://localhost:3001/auth/signin', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                });
                const data = await response.json();
                console.log(data);
                // Redirect to the welcome page after successful signup
                navigate('/welcome');
              } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error here (e.g., display an error message)
              }
          // Handle form submission here
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninPage;
