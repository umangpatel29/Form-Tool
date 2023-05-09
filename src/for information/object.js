import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    address: {
      city: '',
      state: '',
      student: {
        firstname: '',
        age: '',
        id: '',
        gender: '',
        hobby: [],
      },
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      if (name === 'hobby') {
        const { hobby } = prevFormData.address.student;
        if (hobby.includes(value)) {
          return prevFormData;
        } else {
          return {
            ...prevFormData,
            address: {
              ...prevFormData.address,
              student: {
                ...prevFormData.address.student,
                hobby: [...hobby, value],
              },
            },
          };
        }
      } else {
        return {
          ...prevFormData,
          [name]: value,
          address: {
            ...prevFormData.address,
            student: {
              ...prevFormData.address.student,
              [name]: value,
            },
          },
        };
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Label:
        <input type="text" name="label" value={formData.label} onChange={handleChange} />
      </label>
      <br />
      <label>
        City:
        <input type="text" name="city" value={formData.address.city} onChange={handleChange} />
      </label>
      <br />
      <label>
        State:
        <input type="text" name="state" value={formData.address.state} onChange={handleChange} />
      </label>
      <br />
      <label>
        Student Firstname:
        <input type="text" name="firstname" value={formData.address.student.firstname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Student Age:
        <input type="text" name="age" value={formData.address.student.age} onChange={handleChange} />
      </label>
      <br />
      <label>
        Student ID:
        <input type="text" name="id" value={formData.address.student.id} onChange={handleChange} />
      </label>
      <br />
      <label>
        Student Gender:
        <select name="gender" value={formData.address.student.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <label>
        Hobbies:
        {formData.map(hobby => (
          <div key={hobby}>
            <label>
              {hobby}
              <input
                type="checkbox"
                name="hobby"
                value={hobby}
                checked={formData.address.student.hobby.includes(hobby)}
            
              />
            </label>
          </div>
        ))}
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};
  export default MyForm