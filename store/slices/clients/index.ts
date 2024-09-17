import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


// Async thunks
export const fetchClients = createAsyncThunk(
    'clients/fetchClients',
    ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {

    }
);


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
            .addCase(fetchClients.fulfilled, (state, action: any) => {
                state.loadingList = false;
                state.clients = action.payload.details.list;
                state.pagination = action.payload.details.pagination;
            })
            .addCase(fetchClients.rejected, (state, action: any) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            })
    },
});

export default clientSlice.reducer;
