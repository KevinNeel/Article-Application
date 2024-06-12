import React, { useEffect, useState, } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


/* Select Picker */
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { login } from '../../redux/Slices/AuthSlice';

import Swal from 'sweetalert2';
import { editArticle, getArticle } from '../../redux/Slices/ArticleSlice';

const EditArticle = () => {

    const dispatch = useDispatch();
    let { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        slug: "",
        category: ""
    })

    useEffect(() => {
        getUserArticle()

    }, [])

    async function getUserArticle() {

        let article = await dispatch(getArticle(id))

        console.log(article);

        let { title,
            description,
            slug,
            category } = article?.payload;
        // if(response.payload.data.status === 'Success')
        setFormData((prev) => ({
            ...prev, title,
            description,
            slug,
            category
        }));

    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        console.log('logged In');
        let response = await dispatch(editArticle({ id, formData }));
        console.log(response, 'this is response');
        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${response.payload.message}`,
            });
        } else {
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfull',
                    text: `${response.payload.message}`,
                }).then(function () {
                    navigate('/Article');

                })
            }
        }
    }

    return (
        <section>
            <Grid item xs={12} className='all-center'>
                <div className="innerContent">
                    <div className="form-heading">
                        <h1 className='form-heading-text'>Edit Article</h1>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label className='formLabel'>Title</label>
                            <TextField required onChange={handleChange} sx={{
                                marginTop: '15px'

                            }} className='formInput' value={formData.title} name='title' fullWidth label="Title" id="fullWidth" variant="outlined" />
                        </div>
                        <div className="form-input">
                            <label className='formLabel'>Description</label>
                            <TextField required onChange={handleChange} sx={{
                                marginTop: '15px'

                            }} className='formInput' value={formData.description} name='description' fullWidth label="Description" id="fullWidth" variant="outlined" />
                        </div>
                        <div className="form-input">
                            <label className='formLabel'>Slug</label>
                            <TextField required onChange={handleChange} sx={{
                                marginTop: '15px'

                            }} className='formInput' value={formData.slug} name='slug' fullWidth label="Slug" id="fullWidth" variant="outlined" />
                        </div>

                        <div className="form-input">
                            <label className='formLabel'>Category <span className='startColor'>*</span></label>
                            <FormControl fullWidth className='formInput' sx={{ marginTop: '15px' }}>

                                <InputLabel id="demo-simple-select-label" >Select Category</InputLabel>
                                <Select
                                    className='select-box'
                                    value={formData.category}
                                    label="Select Caregory" labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='category'
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'food'}>Food</MenuItem>
                                    <MenuItem value={'education'}>Education</MenuItem>
                                    <MenuItem value={'business'}>Businessmen</MenuItem>
                                    <MenuItem value={'position'}>Position</MenuItem>
                                </Select>

                            </FormControl>
                        </div>

                        <div className="form-btn-div">
                            <Button variant="contained" type='submit' className='authBtn formBtn blue-button'>Edit Article</Button>
                        </div>
                    </form>
                </div>
            </Grid>
        </section>
    )

}

export default EditArticle