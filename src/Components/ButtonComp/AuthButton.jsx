import React, { Fragment } from 'react'
import { Button, Spinner } from '@chakra-ui/react';

const AuthButton = ({disable, loading, className, disableClassName, text, handleClick}) => {
  return (
    <Fragment>
        {
            disable ?
            <Button className={disableClassName}>
                {
                    loading ? <Spinner /> : <>{text}</>
                }
            </Button> :
            <Button className={className} onClick={handleClick}>
                {text}
            </Button>
        }
    </Fragment>
  )
}

export default AuthButton