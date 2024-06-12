import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

/* Select Picker */
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';


import { createArticle, deleteArticle, getAllArticle } from '../../redux/Slices/ArticleSlice';
import Swal from 'sweetalert2';
import { legacy_createStore } from '@reduxjs/toolkit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Article = (props) => {

    let { id, name } = props

    const articleState = useSelector(state => state.article);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [article, setArticleState] = useState([])


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getAllData()
    }, [])

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        slug: "",
        category: ""
    });

    async function getAllData() {
        let data = await dispatch(getAllArticle());

        setArticleState(data?.payload)

    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    };




    // async function loadArticle() {
    //     let response = await dispatch(getAllArticle());
    // }


    async function handleSubmit(e) {
        e.preventDefault();

        let response = await dispatch(createArticle(formData))
        handleClose()

        if (response.error) {

            if (typeof response.payload.message == 'string') {
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${response.payload.message}`,
                    })
                }
                return
            }

        } else {
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfull',
                    text: `${response.payload.message}`,
                }).then(function () {
                    getAllData()
                })
            }
        }

    }


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {


            let response = await dispatch(deleteArticle(id))

            if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${response.payload.message}`,
                })
            } else {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                }).then(() => {
                    getAllData()
                });
            }

        });
    }

    function searchItem(e) {
        console.log(e.target.value);
        const searchValue = e.target.value.toLowerCase();
        if (e.target.value == '') {
            setArticleState(articleState.artilce)
        } else {
            console.log(articleState);
            let serchedArticle = articleState?.artilce.filter(item => item.title.toLowerCase().includes(searchValue));
            setArticleState(serchedArticle)
        }
    }

    function handleSort(e) {
        console.log(articleState.artilce, 'sdfasdf');

        let sortedArticles;
        if (e.target.value === 0) {
            sortedArticles = [...article].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        if (e.target.value === 1) {
            sortedArticles = [...article].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        console.log(sortedArticles);
        setArticleState(sortedArticles);

    }

    return (
        <>

            <section>
                <Box padding={'15px'}>
                    <Grid container spacing={2} bgcolor={'white'} padding={'25px'}>
                        <Grid xs={12}>
                            <h1>Welcome {name}</h1>
                            <Button onClick={handleOpen}>Create Article</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                width={70}
                            >
                                <Box sx={style}>
                                    <Grid container spacing={2} height={"100%"}>
                                        <Grid item xs={12} className='all-center'>
                                            <div className="innerContent">
                                                <div className="form-heading">
                                                    <h1 className='form-heading-text'>Create Article</h1>
                                                </div>
                                                <form action="" onSubmit={handleSubmit}>
                                                    <div className="form-input">
                                                        <label className='formLabel'>Title</label>
                                                        <TextField required onChange={handleChange} sx={{
                                                            marginTop: '15px'

                                                        }} className='formInput' name='title' fullWidth label="Title" id="fullWidth" variant="outlined" />
                                                    </div>
                                                    <div className="form-input">
                                                        <label className='formLabel'>Description</label>
                                                        <TextField required onChange={handleChange} sx={{
                                                            marginTop: '15px'

                                                        }} className='formInput' name='description' fullWidth label="Description" id="fullWidth" variant="outlined" />
                                                    </div>
                                                    <div className="form-input">
                                                        <label className='formLabel'>Slug</label>
                                                        <TextField required onChange={handleChange} sx={{
                                                            marginTop: '15px'

                                                        }} className='formInput' name='slug' fullWidth label="Slug" id="fullWidth" variant="outlined" />
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
                                                        <Button variant="contained" type='submit' className='authBtn formBtn blue-button'>Add Article</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>

                        </Grid>
                        <Grid xs={6}>
                            <div className="search-inp">
                                <TextField id="outlined-basic" onChange={searchItem} label="Search" variant="outlined" />
                            </div>

                        </Grid>

                        <Grid xs={6}>
                            <div className="sort-input">
                                <FormControl fullWidth >

                                    <InputLabel id="demo-simple-select-label" >Sort</InputLabel>
                                    <Select
                                        className='select-box'
                                        label="Sort" labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='category'
                                        onChange={handleSort}
                                    >
                                        <MenuItem value={0}>Min</MenuItem>
                                        <MenuItem value={1}>Max</MenuItem>

                                    </Select>

                                </FormControl>
                            </div>
                        </Grid>

                        {articleState.loading === true ? <h1>Loading...</h1> :
                            article.map((item) => (
                                <Grid xs={4} margin={1}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                {item.category}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                        {id == item.userId ?
                                            <CardActions>
                                                <Link to={`/editArticle/${item._id}`}>
                                                    <Button color='secondary' size="small">Edit</Button>
                                                </Link>
                                                <Button onClick={(e) => { handleDelete(item._id) }} color='error' size="small">Delete</Button>
                                            </CardActions>
                                            : null}

                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </section>
        </>
    )

}

export default Article