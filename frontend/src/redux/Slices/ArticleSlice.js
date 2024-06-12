import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../../Api/Api';

// Initial state
const initialState = {
    artilce: [],
    loading: false,
    error: null,
};


export const getAllArticle = createAsyncThunk(
    'article/getAllArticle',
    async (pageNum) => {
        try {
            const response = await baseURL.get(`/getAllArticle`);
            return response.data;

        } catch (error) {
            console.log(error);
            return error.response.data
        }
    }
);

export const getArticle = createAsyncThunk(
    'article/getArticle',
    async (id) => {
        try {
            const response = await baseURL.get(`/getArticle/${id}`);
            return response.data;

        } catch (error) {
            console.log(error);
            return error.response.data
        }
    }
);



export const createArticle = createAsyncThunk(
    'article/createArticle',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await baseURL.post(`/createArticle`, formData);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editArticle = createAsyncThunk(
    'article/editArticle',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await baseURL.put(`/updateArticle/${id}`, formData);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteArticle = createAsyncThunk(
    'article/deleteArticle',
    async (id, { rejectWithValue }) => {
        try {

            const response = await baseURL.delete(`/deleteArticle/${id}`);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Slice
const artilceSlice = createSlice({
    name: 'artilce',
    initialState,
    reducers: {
        setArticleData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            //Get All User
            .addCase(getAllArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.artilce = action.payload;
                // Handle any state updates needed after successful API call
            })
            .addCase(getAllArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post artilce data';
            })

            //Get All User
            .addCase(getArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Handle any state updates needed after successful API call
            })
            .addCase(getArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post artilce data';
            })


            // Create User 
            .addCase(createArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Handle any state updates needed after successful API call
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post artilce data';
            })

            // Edit User 
            .addCase(editArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Handle any state updates needed after successful API call
            })
            .addCase(editArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post artilce data';
            })


            //Delete WorkingDays 
            .addCase(deleteArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Handle any state updates needed after successful API call
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post article data';
            })

    },
});



export const { setArticleData } = artilceSlice.actions;
export default artilceSlice.reducer;