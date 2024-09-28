import axiosInstance from '@/store/AxiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


export const fetchTeam = createAsyncThunk("fetchTeam", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/team/`);
        return response.data;
    } catch (error) {

    }
});

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

export const createProperty = createAsyncThunk("createProperty", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/property/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchQuotecount = createAsyncThunk("fetchQuotecount", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/quotecount/`);
        return response.data;
    } catch (error) {

    }
});

export const fetchJobcount = createAsyncThunk("fetchJobcount", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcount/`);
        return response.data;
    } catch (error) {

    }
});

export const fetchInvoicecount = createAsyncThunk("fetchInvoicecount", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/invoicecount/`);
        return response.data;
    } catch (error) {

    }
});

export const createQuoteCustomFields = createAsyncThunk("createQuoteCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/customquotefield/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchQuoteCustomFields = createAsyncThunk("fetchQuoteCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/customquotefield/`);
        return response.data;
    } catch (error) {

    }
});

export const fetchQuote = createAsyncThunk("fetchQuote", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/quote/?id=${data}`);
        return response.data;
    } catch (error) {

    }
});

export const createQuote = createAsyncThunk("createQuote", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/quote/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchQuotes = createAsyncThunk("fetchQuotes", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/quote/`);
        return response.data;
    } catch (error) {

    }
});

export const fetchJobCustomFields = createAsyncThunk("fetchJobCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/customjobfield/`);
        return response.data;
    } catch (error) {

    }
});


export const createJobCustomFields = createAsyncThunk("createJobCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/customjobfield/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchJob = createAsyncThunk("fetchJob", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/job/?id=${data}`);
        return response.data;
    } catch (error) {

    }
});

export const createJob = createAsyncThunk("createJob", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/job/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchJobs = createAsyncThunk("fetchJobs", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/job/`);
        return response.data;
    } catch (error) {

    }
});


export const fetchInvoiceCustomFields = createAsyncThunk("fetchInvoiceCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/custominvoicefield/`);
        return response.data;
    } catch (error) {

    }
});


export const createInvoiceCustomFields = createAsyncThunk("createInvoiceCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/custominvoicefield/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchInvoice = createAsyncThunk("fetchInvoice", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/invoice/?id=${data}`);
        return response.data;
    } catch (error) {

    }
});

export const createInvoice = createAsyncThunk("createInvoice", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/invoice/`, data);
        return response.data;
    } catch (error) {

    }
});

export const fetchInvoices = createAsyncThunk("fetchInvoices", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/invoice/`);
        return response.data;
    } catch (error) {

    }
});

export const createJobService = createAsyncThunk("createJobService", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobservice/`, data);
        return response.data;
    } catch (error) {

    }
});

export const createJobVisit = createAsyncThunk("createJobVisit", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobvisit/`, data);
        return response.data;
    } catch (error) {

    }
});



export const putJobVisit = createAsyncThunk("putJobVisit", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/jobvisit/`, data);
        return response.data;
    } catch (error) {

    }
});



export const createInvoiceReminder = createAsyncThunk("createInvoiceReminder", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobinvoicereminder/`, data);
        return response.data;
    } catch (error) {

    }
});



export const putInvoiceReminder = createAsyncThunk("putInvoiceReminder", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/jobinvoicereminder/`, data);
        return response.data;
    } catch (error) {

    }
});

export const createJobExepense = createAsyncThunk("createJobExepense", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobexpense/`, data);
        return response.data;
    } catch (error) {

    }
});


export const putJobExepense = createAsyncThunk("putJobExepense", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/jobexpense/`, data);
        return response.data;
    } catch (error) {

    }
});

export const putJobEmployeeSheet = createAsyncThunk("putJobEmployeeSheet", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/jobexployeesheet/`, data);
        return response.data;
    } catch (error) {

    }
});


export const createJobEmployeeSheet = createAsyncThunk("createJobEmployeeSheet", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobexployeesheet/`, data);
        return response.data;
    } catch (error) {

    }
});

// Initial State
const initialState = {
    team: [],
    clients: [],
    clientslist: [],
    client: {},
    property: {},
    quotecount: 0,
    jobcount: 0,
    invoicecount: 0,
    clientcustomfields: [],
    propertycustomfields: [],
    quotecustomfields: [],
    jobcustomfields: [],
    invoicecustomfields: [],
    quote: {},
    quotes: [],
    job: {},
    jobs: [],
    invoice: {},
    invoices: [],
    pagination: {
        count: 0,
        next: '',
        previous: '',
    },
    loadingFull: false,
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
            .addCase(fetchTeam.fulfilled, (state, action) => {
                state.loadingList = false;
                state.team = action.payload;
            })
            .addCase(fetchTeam.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch team';
            });
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
            .addCase(fetchClient.pending, (state, action) => {
                state.loadingFull = true
            })
            .addCase(fetchClient.fulfilled, (state, action) => {
                state.client = (action.payload);
                state.loadingFull = false
            })
            .addCase(fetchClient.rejected, (state, action) => {
                state.loadingFull = false
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
        builder
            .addCase(fetchQuotecount.fulfilled, (state, action) => {
                state.quotecount = (action.payload?.quoteno);
            })
            .addCase(fetchQuotecount.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createQuoteCustomFields.fulfilled, (state, action) => {
                state.quotecustomfields.push(action.payload);
            })
            .addCase(createQuoteCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchQuoteCustomFields.fulfilled, (state, action) => {
                state.quotecustomfields = action.payload;
            })
            .addCase(fetchQuoteCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.quote = action.payload;
            })
            .addCase(fetchQuote.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createQuote.fulfilled, (state, action) => {
                state.quote = action.payload;
            })
            .addCase(createQuote.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchQuotes.fulfilled, (state, action) => {
                state.quotes = action.payload;
            })
            .addCase(fetchQuotes.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });

        builder
            .addCase(fetchJobcount.fulfilled, (state, action) => {
                state.jobcount = (action.payload?.jobno);
            })
            .addCase(fetchJobcount.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchJobCustomFields.fulfilled, (state, action) => {
                state.jobcustomfields = action.payload;
            })
            .addCase(fetchJobCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createJobCustomFields.fulfilled, (state, action) => {
                state.jobcustomfields.push(action.payload);
            })
            .addCase(createJobCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchJob.fulfilled, (state, action) => {
                state.job = action.payload;
            })
            .addCase(fetchJob.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createJob.fulfilled, (state, action) => {
                state.job = action.payload;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchInvoice.fulfilled, (state, action) => {
                state.invoice = action.payload;
            })
            .addCase(fetchInvoice.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createInvoice.fulfilled, (state, action) => {
                state.invoice = action.payload;
            })
            .addCase(createInvoice.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.invoices = action.payload;
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchInvoiceCustomFields.fulfilled, (state, action) => {
                state.invoicecustomfields = action.payload;
            })
            .addCase(fetchInvoiceCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createInvoiceCustomFields.fulfilled, (state, action) => {
                state.invoicecustomfields.push(action.payload);
            })
            .addCase(createInvoiceCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchInvoicecount.fulfilled, (state, action) => {
                state.invoicecount = action.payload?.invoiceno;
            })
            .addCase(fetchInvoicecount.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createJobService.fulfilled, (state, action) => {
                state.job['service'].push(action.payload);
            })
            .addCase(createJobService.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createJobVisit.fulfilled, (state, action) => {
                state.job['visit'].push(action.payload);
            })
            .addCase(createJobVisit.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(putJobVisit.fulfilled, (state, action) => {
                state.job['visit'] = state.job['visit'].map(visit => {
                    if (visit?.id == action.payload?.id) {
                        return action?.payload
                    }

                    return visit;
                });
            })
            .addCase(putJobVisit.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });

        builder
            .addCase(createInvoiceReminder.fulfilled, (state, action) => {
                state.job['invoicereminder'].push(action.payload);
            })
            .addCase(createInvoiceReminder.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(putInvoiceReminder.fulfilled, (state, action) => {
                state.job['invoicereminder'] = state.job['invoicereminder'].map(visit => {
                    if (visit?.id == action.payload?.id) {
                        return action?.payload
                    }

                    return visit;
                });
            })
            .addCase(putInvoiceReminder.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createJobExepense.fulfilled, (state, action) => {
                state.job['expense'].push(action.payload);
            })
            .addCase(createJobExepense.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(putJobExepense.fulfilled, (state, action) => {
                state.job['expense'] = state.job['expense'].map(item => {
                    if (item?.id == action.payload?.id) {
                        return action?.payload
                    }

                    return item;
                });
            })
            .addCase(putJobExepense.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createJobEmployeeSheet.fulfilled, (state, action) => {
                state.job['labour'].push(action.payload);
            })
            .addCase(createJobEmployeeSheet.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(putJobEmployeeSheet.fulfilled, (state, action) => {
                state.job['labour'] = state.job['labour'].map(item => {
                    if (item?.id == action.payload?.id) {
                        return action?.payload
                    }

                    return item;
                });
            })
            .addCase(putJobEmployeeSheet.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
    },
});

export default clientSlice.reducer;


// "id": 2,
//             "starttime": "21:49:00",
//             "endtime": "09:51:00",
//             "notes": "test",
//             "date": "2024-09-28",
//             "employeecost": 12.0,
//             "location": null,
//             "job": 20,
//             "employee": 3