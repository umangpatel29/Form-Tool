import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Test() {

  const [inputType, setInputType] = useState('');
  const [inputValue, setInputValue] = useState();
  const [options, setOptions] = useState([]);
  const [formdata, setFormData] = useState([]);
  const [formname, setFormname] = useState()
  const [isDisabled, setIsDisabled] = useState(false);

  console.log(inputValue, "value");
  const handleInputChange = (index, key, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][key] = value;
    setOptions(updatedOptions);
  };

  const [label, setLabel] = useState('');
  const [type, setType] = useState('');

  const inputdata = {
    label: label,
    type: type
  }
  console.log(inputdata, "sadfdsfs");
  function handleLabelChange(event) {
    setLabel(event.target.value);
  }
  function handleInputTypeChange(event) {
    setType(event.target.value);
  }

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setInputType(value);
    setInputValue('');
    setOptions([]);
  };

  const handleAddOption = () => {
    const updatedOptions = [...options, { label: "", value: "" }];
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const addFormData = (args) => {
    const abc = formdata;
    abc.push(args);
    setFormData(abc)
  }
  const removeData = (id) => {
    const removedata = [...formdata];
    removedata.splice(id, 1);
    setFormData(removedata);
    localStorage.setItem("final", JSON.stringify(removedata))
  }



  const submit = () => {

    if (inputType === 'text') {
      addFormData({ "input": type, "props": { "name": label.replace(/\s+/g, ''), "label": label, "value": "" } });
    } else if (inputType === 'lastname') {
      addFormData({ "input": "text", "props": { "name": "lastName", "value": "" } });
    } else if (inputType === 'email') {
      addFormData({ "input": inputType, "props": { "name": "email", "value": "" } });
    } else if (inputType === 'password') {
      addFormData({ "input": inputType, "props": { "name": "password", "value": "" } });
    } else if (inputType === 'number') {
      addFormData({ "input": inputType, "props": { "name": "contact", "value": "" } });
    } else if (inputType === 'checkbox') {
      addFormData({ "input": inputType, "props": { "name": inputValue, "options": options } });
    } else if (inputType === 'radio') {
      addFormData({ "input": inputType, "props": { "name": inputValue, "options": options } });
    } else if (inputType === 'date') {
      addFormData({ "input": inputType });
    } else if (inputType === "textarea") {
      addFormData({ "input": inputType, "props": { "name": "Textarea", "value": inputValue } });
    } else if (inputType === "select") {
      addFormData({ "input": inputType, "props": { "name": "select", "value": inputValue } })
    } else if (inputType === "file") {
      addFormData({ "input": inputType, "props": { "name": "file", "value": inputValue } })
    }
    setInputType("")
    setOptions([]);
    setIsDisabled(true);
    setType("")
    setLabel("")

    console.log("here", inputValue);
  };

  const Data = {
    name: formname,
    data: formdata,
  }
  const handlefinalSubmit = () => {

    localStorage.setItem(formname, JSON.stringify(Data))
  }

  const renderInputField = () => {
    switch (inputType) {
      case 'text':
        return (
          <div className='d-flex justify-content-around'>
            <div>
              <label htmlFor="label">Label Name</label>
              <input
                type="text"
                name="label"
                value={label}
                onChange={handleLabelChange}
              />

              <label htmlFor="type">Select Field:</label>
              <select name="type" id="type" value={type} onChange={handleInputTypeChange}>
                <option value="">Select Type</option>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="tel">Contact</option>
                <option value="button">Button</option>
              </select>
            </div>
          </div>
        );
      case "file":
        const handleFileChange = (event) => {
          const file = event.target.files[0];
          setInputValue(URL.createObjectURL(file));
        };
        return (
          <div>
            <label htmlFor="formFile" className="form-label">Select a file:</label>
            <input
              type="file"
              className="form-control"
              id="formFile"
              accept="image/*"
              onChange={handleFileChange}
            />

          </div>
        );
      case 'textarea':
        return (
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}>
            </textarea>
          </div>
        );
      case 'date':
        return (
          <div>
            <label htmlFor="input-text">Date:</label>
            <input
              type="date"
              id="input-date"
              value={inputValue}
              disabled
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
        );
      case "select":
        return (
          <div>
            <label for="cars">Choose a car:</label>
            <select name="cars" id="cars" value={inputValue} onChange={(event) => setInputValue(event.target.value)}>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        );
      case 'radio':
        return (
          <div>
            <label htmlFor="input-radio-name">Radio Name:</label>
            <div className='d-flex'>
              <input
                type="text"
                id="input-radio-name"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <Button onClick={handleAddOption} className='btn-secondary fw-bold'>+</Button>
            </div>
            <br />
            <label>Options:</label>
            {options.length}
            {options.map((option, index) => (
              <div key={index}>
                <label htmlFor="">label</label>
                <input
                  type="text"
                  value={option.label}
                  onChange={(event) =>
                    handleInputChange(index, "label", event.target.value)
                  }

                />
                <label htmlFor="">value</label>
                <input
                  type="text"
                  value={option.value}
                  onChange={(event) =>
                    handleInputChange(index, "value", event.target.value)
                  }
                />
                <Button onClick={() => handleRemoveOption(index)} className='btn-warning fw-bold'>-</Button>
              </div>
            ))}

          </div>
        );
      case 'checkbox':
        return (
          <div>
            <div>
              <label htmlFor="input-radio-name">Check box:</label>
              <div className='d-flex'>
                <input
                  type="text"
                  id="input-checkbox"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <Button onClick={handleAddOption} className='btn-secondary fw-bold'>+</Button>
              </div>
              <br />
              <label>Options:</label>
              {options.map((option, index) => (
                <div key={index}>
                  <label htmlFor="">label</label>
                  <input
                    type="text"
                    value={option.label}
                    onChange={(event) =>
                      handleInputChange(index, "label", event.target.value)
                    }
                  />
                  <Button onClick={() => handleRemoveOption(index)} className='btn-warning fw-bold'>-</Button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <>
      <div className="container border">
        <div className="row">
          <div className="col border">
            <div className=' p-4'>
              <div>
                <label htmlFor="">Your Form Name:</label><br />
                <input type="text" value={formname} onChange={(event) => setFormname(event.target.value)} disabled={isDisabled} />
              </div>
              <div className='my-3'>
                <label htmlFor="input-type">Input Type:</label><br />
                <select id="input-type" value={inputType} onChange={handleSelectChange} className='p-1'>
                  <option value="">Select an input type</option>
                  <option value="text">Text</option>
                  <option value="radio">Radio</option>
                  <option value="checkbox">checkbox</option>
                  <option value="password">Password</option>
                  <option value="date">date</option>
                  <option value="textarea">textarea</option>
                  <option value="select">Select</option>
                  <option value="file">file</option>
                </select>
                <br />
                <div className='mt-3'>
                  {renderInputField()}
                  <div className='mt-3'>
                    <input type="checkbox" id="required" />
                    <label for="required">Required</label>
                  </div>
                  <Button onClick={submit} className='m-3'>submit</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col border d-flex justify-content-center align-items-center">
            <div>
              <h3 className='text-center'>{formname}</h3>
              {
                formdata && formdata.map((item, id) => {
                  console.log(item, "dsd");
                  return (
                    <div>
                      <div key={id}>
                        <label>{item.props.label}</label><br />
                        <input type={item.input} name={item.props.name} />
                        <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                      </div>
                      {/* {item.input === "text" &&
                        <div>
                          <label htmlFor="">{item.props.name}</label><br />
                          <input type={item.input} value={item.props.value} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      } */}

                      {item.input === "textarea" &&
                        <div>
                          <label htmlFor="exampleFormControlTextarea1">{item.props.name}</label>
                          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                            value={item.props.value}>
                          </textarea>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "file" &&
                        <div>
                          <div style={{ overflow: "hidden" }}>
                            <img src={item.props.value} alt="dd" style={{ width: "100px", height: " 100px" }} />
                          </div>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "select" &&
                        <div>
                          <label htmlFor="cars">Choose a car:</label>
                          <select value={item.props.value} name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                          </select>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "radio" &&
                        <div>
                          <h5>{item.props.name}</h5>
                          {item.props.options.map((opt, ids) => {
                            return (
                              <div key={ids} className='form-check form-check-inline'>
                                <label htmlFor="" className='form-check-label'>{opt.label}</label>
                                <input type="radio" value={opt.value} className='form-check-input' />
                              </div>
                            )
                          })}
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "checkbox" &&
                        <div>
                          <h5>{item.props.name}</h5>
                          {item.props.options.map((opt, ids) => {
                            return (
                              <div key={ids} className='form-check form-check-inline'>
                                <label htmlFor="" className='form-check-label'>{opt.label}</label>
                                <input type="checkbox" value={opt.value} className='form-check-input' />
                              </div>
                            )
                          })}
                        </div>
                      }
                      {item.input === "date" &&
                        <div>
                          <label htmlFor="">{item.input}</label><br />
                          <input type="date" value={item.input} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                    </div>
                  )
                })
              }
              <button onClick={handlefinalSubmit} className='btn btn-primary m-3'>submit all your data</button>

            </div>
          </div>
        </div>
      </div>
      {/* <div className="Container">
        <div className="Row">
          <div className="col-lg-6">
            <div className=' p-4'>
              <div>
                <label htmlFor="">Your Form Name:</label><br />
                <input type="text" value={formname} onChange={(event) => setFormname(event.target.value)} disabled={isDisabled} />
              </div>
              <div className='my-3'>
                <label htmlFor="input-type">Input Type:</label><br />
                <select id="input-type" value={inputType} onChange={handleSelectChange} className='p-1'>
                  <option value="">Select an input type</option>
                  <option value="firstname">First name</option>
                  <option value="lastname">Last name</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                  <option value="number">Contact</option>
                  <option value="radio">Radio</option>
                  <option value="checkbox">checkbox</option>
                  <option value="date">date</option>
                  <option value="textarea">textarea</option>
                  <option value="select">Select</option>
                  <option value="file">file</option>
                </select>
                <br />
                <div className='mt-3'>
                  {renderInputField()}
                  <div className='d-flex mt-3'>
                    <input type="checkbox" />
                    <label>Register</label>
                  </div>
                  <Button onClick={submit} className='m-3'>submit</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div>
              <h3 className='text-center'>{formname}</h3>
              {
                formdata && formdata.map((item, id) => {
                  console.log(item, "dsd");
                  return (
                    <div key={id}>
                      {item.input === "text" &&
                        <div>
                          <label htmlFor="">{item.props.name}</label><br />
                          <input type="text" value={item.props.value} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "lastname" &&
                        <div>
                          <label htmlFor="">{item.props.name}</label><br />
                          <input type="text" value={item.props.value} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "email" &&
                        <div>
                          <label htmlFor="">{item.props.name}</label><br />
                          <input type="email" value={item.props.value} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "password" &&
                        <div>
                          <label htmlFor="">{item.props.name}</label><br />
                          <input type="password" value={item.props.value} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "number" &&
                        <div>
                          <label htmlFor="">{item.props.name}</label><br />
                          <input type="number" value={item.props.value} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "textarea" &&
                        <div>
                          <label htmlFor="exampleFormControlTextarea1">{item.props.name}</label>
                          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                            value={item.props.value}>
                          </textarea>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "file" &&
                        <div>
                          <div style={{ overflow: "hidden" }}>
                            <img src={item.props.value} alt="dd" style={{ width: "100px", height: " 100px" }} />
                          </div>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "select" &&
                        <div>
                          <label htmlFor="cars">Choose a car:</label>
                          <select value={item.props.value} name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                          </select>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "radio" &&
                        <div>
                          <h5>{item.props.name}</h5>
                          {item.props.options.map((opt, ids) => {
                            return (
                              <div key={ids} className='form-check form-check-inline'>
                                <label htmlFor="" className='form-check-label'>{opt.label}</label>
                                <input type="radio" value={opt.value} className='form-check-input' />
                              </div>
                            )
                          })}
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "checkbox" &&
                        <div>
                          <h5>{item.props.name}</h5>
                          {item.props.options.map((opt, ids) => {
                            return (
                              <div key={ids} className='form-check form-check-inline'>
                                <label htmlFor="" className='form-check-label'>{opt.label}</label>
                                <input type="checkbox" value={opt.value} className='form-check-input' />
                              </div>
                            )
                          })}
                        </div>
                      }
                      {item.input === "date" &&
                        <div>
                          <label htmlFor="">{item.input}</label><br />
                          <input type="date" value={item.input} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                    </div>
                  )
                })
              }
              <button onClick={handlefinalSubmit} className='btn btn-primary m-3'>submit all your data</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Test;
