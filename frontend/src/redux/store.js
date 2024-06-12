import { configureStore } from '@reduxjs/toolkit'

import AuthSlice from './Slices/AuthSlice'
import ArticleSlice from './Slices/ArticleSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        article: ArticleSlice
    },
})

export default store