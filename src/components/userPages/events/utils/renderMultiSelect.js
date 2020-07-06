import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';

const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});



const RenderSelect = ({defaultOptions, value, setValue}) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ options, setOptions ] = useState([])
    // const [ value, setValue ] = useState('')
    const [isDisabled, setIsDisabled ] = useState(false)


    useEffect(() => {
        let Options = []
        defaultOptions.map((option, index) =>{
            return Options.push(createOption(option))
        })
        setOptions(Options)
    }, [])

    

    const customStyles = {
        input: (provided, state) => ({
          ...provided,
          fontSize: '1.5rem',
          display: isDisabled ? 'none' : 'inline-block'
        }),
        multiValue: (provided) => ({
            ...provided,
            fontSize: '1.3rem',
            // backgroundColor: 'transparent',
            border: '1px solid black',
            // padding: '0.8rem '
    
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            padding: '0.3rem '
    
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '1.5rem'
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '1.5rem'
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0.5rem 1rem'
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: isDisabled? 'rgb(245,245,245)' : 'white',
            fontSize: '1.5rem',
            margin: '.8rem 0'

        })
      }

    const handleChange = (newValue , actionMeta ) => {
        setIsLoading(true)
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        
        console.log(value)
        console.groupEnd()
        setValue(newValue)
        if(newValue && newValue.length === 5){
            setIsDisabled(true)
        }else{
            setIsDisabled(false)
        }
        setIsLoading(false)
    }

    // const handleCreate = (inputValue) => {
    //     setIsLoading(true)
    //     console.group('Option created');
    //     console.log('Wait a moment...');
    //     setTimeout(() => {
    //       const newOption = createOption(inputValue);
    //       console.log(newOption);
    //       console.groupEnd();
    //       setIsLoading(false)
    //       setOptions(...options, newOption)
    //       setValue(newOption)
    //     }, 1000);
    // }

    return (
        <CreatableSelect
            placeholder='Add tags...'
            isMulti
            onChange={handleChange}
            options={options}
            isLoading={isLoading}
            styles={customStyles}
            // isDisabled={isDisabled}
            isClearable
            value={value}
        />
    )
}

export default RenderSelect