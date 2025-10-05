import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import authorsReducer from './authorsSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    authors: authorsReducer,
    chat: chatReducer,
  },
});