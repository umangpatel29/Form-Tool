import { useState } from 'react';

function Form() {
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const storedFormData = localStorage.getItem('register');
    const fields = storedFormData && JSON.parse(storedFormData);
    const { data, name: fieldName } = fields || {};
    const formData = data;
    console.log(formData);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const error = validateField(name, type === 'checkbox' ? checked : value, formData);

        // Handle text inputs and checkboxes
        setFormValues((prevValues) => {
            if (type === 'checkbox') {
                return {
                    ...prevValues,
                    [name]: [...(prevValues[name] || []), value].filter((v, i, a) => a.indexOf(v) === i),
                };
            } else {
                return {
                    ...prevValues,
                    [name]: value,
                };
            }
        });

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formValues, formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            console.log(formValues);
        }
    };

    const validateField = (name, value, formData) => {
        const field = formData.find((field) => field.props.name === name);
        let error = '';

        if (field.validField.require && !value) {
            error = 'This field is required';
        } else if (field.validField.min !== '' && value.length < field.validField.min) {
            error = `Minimum length is ${field.validField.min} characters`;
        } else if (field.validField.max !== '' && value.length > field.validField.max) {
            error = `Maximum length is ${field.validField.max} characters`;
        } else if (field.validField.alphanum && !/^[a-zA-Z0-9]+$/.test(value)) {
            error = 'Only alphanumeric characters are allowed';
        }

        return error;
    };

    const validateForm = (formValues, formData) => {
        const errors = {};
        formData.forEach((field) => {
            const error = validateField(field.props.name, formValues[field.props.name], formData);
            if (error !== '') {
                errors[field.props.name] = error;
            }
        });
        return errors;
    };
    return (
        <form onSubmit={handleSubmit}>
            {formData.map((field) => (
                <div key={field.props.name}>
                    <label>{field.props.label}</label>
                    {field.input === 'text' && (
                        <input
                            type={field.input}
                            name={field.props.name}
                            onChange={handleChange}
                            error={formErrors[field.props.name]}
                        />
                    )}
                    {field.input === 'radio' && (
                        <>
                            {field.props.options.map((option, index) => (
                                <div key={`${field.props.name}-${index}`}>
                                    <input
                                        type={field.input}
                                        name={field.props.name}
                                        value={option.label}
                                        checked={field.validField.require ? null : "checked"}
                                        onChange={handleChange}
                                        error={formErrors[field.props.name]}
                                    />
                                    <label>{option.label}</label>
                                </div>
                            ))}
                        </>
                    )}
                    {field.input === 'checkbox' && (
                        <>
                            {field.props.options.map((option, index) => (
                                <div key={`${field.props.name}-${index}`}>
                                    <input
                                        type={field.input}
                                        name={field.props.name}
                                        value={option.label}
                                        onChange={handleChange}
                                        error={formErrors[field.props.name]}
                                    />
                                    <label>{option.label}</label>
                                </div>
                            ))}
                        </>
                    )}
                    {field.input === 'select' && (
                        <div>
                            <select name={field.props.name} onChange={handleChange}>
                                <option value="">{field.props.label}</option>
                                {field.props.value.map((fruit) => (
                                    <option key={fruit} value={fruit}>
                                        {fruit}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    
                    {formErrors[field.props.name] && (
                        <span style={{ color: 'red' }}>{formErrors[field.props.name]}</span>
                    )}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}
export default Form
