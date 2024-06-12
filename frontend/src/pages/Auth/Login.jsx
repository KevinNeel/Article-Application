import React, { useEffect, useState, } from 'react'
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

/* ---- Password Input ---- */
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { login } from '../../redux/Slices/AuthSlice';

import Swal from 'sweetalert2';

const Login = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        console.log('logged In');
        let response = await dispatch(login(formData));
        console.log(response, 'this is response');
        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: `${response.payload.message}`,
            });
        } else {
            window.location.href = '/Article';
        }
    }

    return (
        <section>
            <Box height={"100%"} >
                <Grid container spacing={2} height={"100%"}>
                    <Grid item xs={12} className='all-center'>
                        <div className="innerContent">
                            <div className="form-heading">
                                <h1 className='form-heading-text'>Sign In</h1>
                                <p className='form-heading-label'>Enter your email and password to sign in!</p>
                            </div>

                            <form action="" onSubmit={handleSubmit}>

                                <div className="form-input">
                                    <label className='formLabel'>Email</label>
                                    <TextField required onChange={handleChange} sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '22px',
                                        },
                                        marginTop: '15px'
                                        
                                    }} className='formInput' name='email' fullWidth label="Email" id="fullWidth" variant="outlined"  />
                                </div>

                                <div className="form-input">
                                    <label className='formLabel'>Password</label>
                                    <FormControl required variant="outlined" fullWidth className='formInput' onChange={handleChange} sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '22px',
                                        },
                                        marginTop: '15px'
                                    }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            name='password'
                                            label="Password"
                                        />
                                    </FormControl>
                                </div>

                                <div className="form-btn-div">
                                    <Button variant="contained" type='submit' className='authBtn formBtn blue-button'>Login</Button>
                                </div>
                            </form>
                        </div>

                    </Grid>
                </Grid>

            </Box>

        </section>
    )
}

export default Login