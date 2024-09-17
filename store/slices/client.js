import axiosInstance from '@/store/AxiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


export const fetchClients = createAsyncThunk("fetchClients", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/`);
        return response.data;
    } catch (error) {

    }
});

// Initial State
const initialState = {
    clients: [],
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
    },
    loadingList: false,
    errorList: null,

    loadingForm: false,
    errorForm: null,
};

// Slice
const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loadingList = true;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loadingList = false;
                state.clients = action.payload.details.list;
                state.pagination = action.payload.details.pagination;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            })
    },
});

export default clientSlice.reducer;
