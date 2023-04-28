import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').when('requireEmail', {
    is: true,
    then: Yup.string().required('Email is required').matches(/@gmail.com$/, 'Email must end with @gmail.com'),
  }),
  firstName: Yup.string().min(3, 'min 3 char').max(30, 'max is 30').required('FirstName is required'),
  lastName: Yup.string().min(3, 'min 3 char').max(30, 'max is 30').required('LastName is required'),
  password: Yup.string().max(12, 'max 12 code')
    .required("pw is require")
    .test('password-strength', (value) => {
      let passwordStrength = 0;
      if (value.match(/[A-Z]/)) {
        passwordStrength += 1;
      }
      if (value.match(/[a-z]/)) {
        passwordStrength += 1;
      }
      if (value.match(/\d/)) {
        passwordStrength += 1;
      }
      if (value.match(/[!@#$%^&*]/)) {
        passwordStrength += 1;
      }
      if (passwordStrength < 3) {
        return false;
      }
      return true;
    })
    .test(
      "no-name",
      "Password cannot contain name",
      function (value) {
        const name = this.parent.lastName;
        const fname = this.parent.firstName
        return !value.toLowerCase().includes(name.toLowerCase()) && !value.toLowerCase().includes(fname.toLowerCase());

      }
    ),
});


const passwordStrengthMsg = (password) => {
  let passwordStrength = 0;
  if (password.match(/[A-Z]/)) {
    passwordStrength += 1;
  }
  if (password.match(/[a-z]/)) {
    passwordStrength += 1;
  }
  if (password.match(/\d/)) {
    passwordStrength += 1;
  }
  if (password.match(/[!@#$%^&*]/)) {
    passwordStrength += 1;
  }
  switch (passwordStrength) {
    case 0:
    case 1:
      return 'Very Weak';
    case 2:
      return 'Weak';
    case 3:
      return 'not bad';
    case 4:
      return '';
    default:
      return '';
  }
};

const FormikForm = () => {

  const requireEmail = false;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const storedFormData = localStorage.getItem("login");
  const formData = JSON.parse(storedFormData);
  console.log(formData, "formdata");

  return (

    <div className="container p-2">
      <div className="row">
        <div className="col">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ isSubmitting, values, errors, touched, setFieldTouched, handleBlurur }) => (
              <Form>

                {
                  formData.data.map((data, id) => {
                    return (
                      <div key={id}>
                        {
                          data.props.name === "firstName" &&
                          <div>
                            <label>First Name</label>
                            <Field type={data.input} name={data.props.name} />
                            <ErrorMessage name={data.props.name} />
                          </div>
                        }
                        {
                          data.props.name === "lastName" &&
                          <div>
                            <label>Last Name</label>
                            <Field type={data.input} name={data.props.name} />
                            <ErrorMessage name={data.props.name} />
                          </div>
                        }
                        {
                          data.props.name === "email" &&
                          <div>
                            <label>Email</label>
                            <Field type={data.input} name={data.props.name} />
                            <ErrorMessage name={data.props.name} />

                          </div>
                        }
                        {
                          data.props.name === "password" &&
                          <div>
                            <label>Password</label>
                            <Field type={data.input} name={data.props.name} />
                           {errors.password && touched.password} <ErrorMessage name={data.props.name} />
                            {values.password && <div>{passwordStrengthMsg(values.password)}</div>}
                          </div>
                        }
                      </div>
                    )
                  })
                }

                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>

  );
};

export default FormikForm;

