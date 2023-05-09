import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';

function createValidationSchema(data, values) {
  let schema = {};
  // console.log(values);
  data.forEach(field => {
    const validField = field.validField;
    let fieldRules = Yup.string();
    console.log(validField, "validfield");

    if (validField.require) {
      fieldRules = fieldRules.required("Field is required");
    }
    if (validField.min) {
      fieldRules = fieldRules.min(Number(validField.min), `Field must be at least ${validField.min} characters`);
    }
    if (validField.max) {
      fieldRules = fieldRules.max(Number(validField.max), `Field must be at most ${validField.max} characters`);
    }
    if (validField.alphabet) {
      fieldRules = fieldRules.matches(/^[A-Za-z\s]+$/, "Field must contain only alphabets");
    }
    if (validField.alphanum) {
      fieldRules = fieldRules.matches(/^[A-Za-z0-9@.]+$/, "alphanumeric characters required '@' '.'");
    }

    schema[field.props.name] = fieldRules;
  });

  return Yup.object().shape(schema);
}

//************password validation */
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
    default:
      return '';
  }
};


function DynamicForm() {

  const [file, setFile] = useState()

  const storedFormData = localStorage.getItem("login");
  const fields = JSON.parse(storedFormData);
  const { data, name } = fields
  // console.log(fields, "formdata");

  if (!data || data.length === 0) {
    return <div>No fields found.</div>;
  }

  const validationSchema = createValidationSchema(data);

console.log(file, "Sda");
  return (
    <Formik
      initialValues={{}}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Handle form submission
        console.log(values, "sshkjshkdshk");
      }}
    >
      {({ isValid, dirty, values }) => (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className='d-flex justify-content-center align-items-center h-100'>
                <Form>
                  {data.map(field => {
                    const { options, value } = field.props;

                    console.log(field, "field");
                    return (
                      <div>
                        {field.input &&
                          <div key={field.props.name} className='m-2'>
                            <label htmlFor={field.props.name}>{field.props.label}</label><br />
                            <Field type={field.input} name={field.props.name} />
                            <ErrorMessage name={field.props.name} component="div" className="error-message" />
                            {/* {values.password && <div>{passwordStrengthMsg(values.password)}</div>} */}
                          </div>
                        }
                        {
                          field.radio &&
                          <div>
                            <label>{field.props.name} :</label>
                            <div className='d-flex'>{
                              options.map((rad) => {
                                // console.log(field.radio);
                                return (
                                  <div key={rad.label}>
                                    <label>{rad.label}</label>
                                    <Field type={field.radio} name="radio" value={rad.label} />
                                  </div>
                                )
                              })}
                              <ErrorMessage name={field.props.name} component="div" className="error-message" />
                            </div>
                          </div>
                        }
                        {
                          field.checkbox &&
                          <div>
                            <label>{field.props.name} :</label>
                            <div className='d-flex'>{
                              options.map((check) => {
                                return (
                                  <div key={check.label} className='m-2'>
                                    <label>{check.label}</label>
                                    <Field type={field.checkbox} name="checked" value={check.label} />
                                  </div>
                                )
                              })}
                            </div>
                            
                          </div>
                        }
                        {
                          field.select &&
                          <div>
                            <label>{field.props.name} :</label>
                            <div>
                              <Field name="select" as="select">
                                <option value="">{field.props.name}</option>
                                {value.map((fruit) => (
                                  <option key={fruit} value={fruit}>
                                    {fruit}
                                  </option>
                                ))}
                              </Field>
                               <ErrorMessage name={field.props.name} component="div" className="error-message" />
                            </div>
                           
                          </div>
                        }
                        {
                          field.file &&
                          <div>
                            <label htmlFor="formFile" className="form-label">Select a file:</label>
                            <Field
                              type="file"
                              className="form-control"
                              name= {field.props.name}
                              id="formFile"
                              accept="image/*"
                              onChange={event => {
                                const file = event.target.files[0];
                                setFile(URL.createObjectURL(file));
                                // setFieldValue("file", file); // set the file value in Formik form values
                              }}
                            />
                             <ErrorMessage name={field.props.name} component="div" className="error-message" />
                          </div>
                        }
                      </div>
                    )
                  })}
                  <div className='text-center mt-4'>
                    <button className='py-1 px-3' type="submit">Submit</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <img src={""} alt="antf" />
        </div>
      )}
    </Formik>
  );
}

export default DynamicForm;
