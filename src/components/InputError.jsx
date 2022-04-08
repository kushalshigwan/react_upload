import React from 'react'

const InputError = ( props ) => {
    return (
        <>
            { props.message && 
            <small className='text-danger'>{ props.message }</small> 
            }
        </>
    )
}

export default InputError