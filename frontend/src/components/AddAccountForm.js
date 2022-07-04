import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, FormControl, Snackbar, Input, InputAdornment, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { addAccountDetails } from '../actions/accountActions'
import { Alert } from '@material-ui/lab'
import { validateFields } from '../utils/Common'



const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
        marginTop: 12,
    },
    margin: {
        marginTop: 18,
        marginBottom: 18
    },
    margin1: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))


const AddAccountForm = ({ addAccountDetails, setErrors, error,successMsg}) => {
    const classes = useStyles()
    const [values, setValues] = useState({
        accountNo: "",
        bankName: "",
        bvn: ""
    })
   
    // const closeSnackbar = (event, reason) => {
    //     if (reason === 'clickaway') { return; }
    //     setValues({...values, open: false})
    //     setValues({...values, openSuccess: false})
    // }

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
    }
    const addAccount = async (e) => {
        e.preventDefault()
        // const { accountNo, bankName, bvn } = values
        // const fieldsToValidate = [
        //     { accountNo },
        //     { bankName },
        //     { bvn },
        // ]

        // const allFieldsEntered = validateFields(fieldsToValidate)
        // if (!allFieldsEntered) {
        //     setErrors({ sign_error: 'Please enter all the fields' })
        //     // alert('enter all fields')
        // }else{
            await addAccountDetails(values.accountNo, values.bankName, values.bvn)
        // }
       
        
    }
    // useEffect(() => {
    //     if(error && error.length !== 0){
    //         setValues({...values, open: true})
    //     } else if(successMsg && successMsg.length !== 0){
    //         setValues({...values, openSuccess: true})
    //     } else {
    //         setValues({...values, open: false})
    //         setValues({...values, openSuccess: false})
    //     }
    // }, [error, successMsg])
    return (
        <Card className={classes.root} variant="outlined">
            <form onSubmit={addAccount}>
            {/* {error && values.open && error.map(e => (
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} open={values.open} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error">
                        {e.error.sign_error}
                    </Alert>
                </Snackbar>
            ))}
            {successMsg && values.openSuccess && successMsg.map(s => (
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} open={values.openSuccess} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="success">
                        {s.successMsg}
                    </Alert>
                </Snackbar>
            ))
            } */}
                <CardContent>
                    <Typography className={classes.title} gutterBottom>
                        Add Account
                    </Typography>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="acc-no">Account Number</InputLabel>
                        <Input
                            id="acc-no"
                            value={values.accountNo}
                            onChange={handleChange('accountNo')}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="bank-name">Bank Name</InputLabel>
                        <Input
                            id="bank-name"
                            value={values.bankName}
                            onChange={handleChange('bankName')}
                        />
                    </FormControl>
                    {/* <div className ="form-group">
                        <label for="name" class="text-light">Account Type</label>
                        <div class="radio inline">
                            <input type="radio" id="radio-4" name="status" value="Active"/>
                            <label for="radio-4" class="radio-label">Savings</label>
                        </div>
                        <div className="radio inline">
                            <input type="radio" id="radio-5" name="status" value="Inactive"/>
                            <label for="radio-5" class="radio-label">Current</label>
                        </div>
                    </div> */}
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="bvn-code">BVN Number </InputLabel>
                        <Input
                            id="bvn-code"
                            value={values.bvn}
                            onChange={handleChange('bvn')}
                        />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button type='submit' color='primary' variant='contained'>Submit</Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default connect(null, { addAccountDetails })(AddAccountForm)
