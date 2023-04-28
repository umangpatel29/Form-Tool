import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

function Form() {

    const [namevalue, setNameValue] = useState()
    const [inputvalue, setInputValue] = useState()

    const handleSelectChange = () =>{

    }

    return (
        <div className='p-5'>
            <div>
                <label htmlFor="input-text">Text:</label>
                <input
                    type="text"
                    id="input-text"
                    value=""
                    onChange={(event) => setNameValue(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="input-type">Input Type:</label>
                <select id="input-type" value="" onChange={handleSelectChange}>
                    <option value="">Select an input type</option>
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">checkbox</option>
                </select>
            </div>
            <div>
            <label htmlFor="input-text">options:</label>
                <input
                    type="text"
                    id="input-text"
                    value=""
                    onChange={(event) => setInputValue(event.target.value)}
                />
            </div>

            <Button>Save</Button>
        </div>
    )
}

export default Form