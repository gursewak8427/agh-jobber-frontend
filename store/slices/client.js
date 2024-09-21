import axiosInstance from '@/store/AxiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


export const fetchClients = createAsyncThunk("fetchClients", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/?page=${data.page}&page_size=${data.page_size}`);
        return response.data;
    } catch (error) {

    }
});

export const fetchallClients = createAsyncThunk("fetchallClients", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/?list=true`);
        return response.data;
    } catch (error) {

    }
});

export const fetchClientsCustomFields = createAsyncThunk("fetchClientsCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/customclientfield/`);
        return response.data;
    } catch (error) {

    }
});

export const createClientsCustomFields = createAsyncThunk("createClientsCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/customclientfield/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchPropertyCustomFields = createAsyncThunk("fetchPropertyCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/custompropertyfield/`);
        return response.data;
    } catch (error) {

    }
});


export const createPropertyCustomFields = createAsyncThunk("createPropertyCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/custompropertyfield/`, data);
        return response.data;
    } catch (error) {

    }
});

export const createClient = createAsyncThunk("createClient", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/client/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchClient = createAsyncThunk("fetchClient", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/client/?id=${data}`);
        return response.data;
    } catch (error) {

    }
});

export const fetchProperty = createAsyncThunk("fetchProperty", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/property/?id=${data}`);
        return response.data;
    } catch (error) {

    }
});

// Initial State
const initialState = {
    clients: [],
    clientslist:[],
    client: {},
    property: {},
    clientcustomfields: [],
    propertycustomfields: [],
    pagination: {
        count: 0,
        next: '',
        previous: '',
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
                state.clients = action.payload?.results;
                state.pagination.count = action.payload?.count;
                state.pagination.next = action.payload?.next;
                state.pagination.previous = action.payload?.previous;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchClientsCustomFields.pending, (state) => {
                state.loadingList = true;
            })
            .addCase(fetchClientsCustomFields.fulfilled, (state, action) => {
                state.loadingList = false;
                state.clientcustomfields = action.payload;
            })
            .addCase(fetchClientsCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchPropertyCustomFields.pending, (state) => {
                state.loadingList = true;
            })
            .addCase(fetchPropertyCustomFields.fulfilled, (state, action) => {
                state.loadingList = false;
                state.propertycustomfields = action.payload;
            })
            .addCase(fetchPropertyCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createClientsCustomFields.fulfilled, (state, action) => {
                state.clientcustomfields.push(action.payload);
            })
        builder
            .addCase(createPropertyCustomFields.fulfilled, (state, action) => {
                state.propertycustomfields.push(action.payload);
            })
        builder
            .addCase(fetchClient.fulfilled, (state, action) => {
                state.client = (action.payload);
            })
            .addCase(fetchClient.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchProperty.fulfilled, (state, action) => {
                state.property = (action.payload);
            })
            .addCase(fetchProperty.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchallClients.fulfilled, (state, action) => {
                state.clientslist = (action.payload);
            })
            .addCase(fetchallClients.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
    },
});

export default clientSlice.reducer;
