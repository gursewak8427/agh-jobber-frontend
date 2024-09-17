import { configureStore } from '@reduxjs/toolkit';
import clientsSlice from './slices/client';
import authSlice from './slices/auth';

export const store = configureStore({
    reducer: {
        clients: clientsSlice,
        auth: authSlice,
    },
});
