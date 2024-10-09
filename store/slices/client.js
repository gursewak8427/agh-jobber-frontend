import axiosInstance from '@/store/AxiosInstance';
import { handleAsyncThunkError } from '@/utils/handleAsyncThunkError';
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
        return handleAsyncThunkError(error, rejectWithValue);
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
        return handleAsyncThunkError(error, rejectWithValue);
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
        return handleAsyncThunkError(error, rejectWithValue);
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
        return handleAsyncThunkError(error, rejectWithValue);
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

export const markJoblatevisit = createAsyncThunk("markJoblatevisit", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/joblatevisit/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
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

export const sentClientCustommail = createAsyncThunk("sentClientCustommail", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/clientcustommail/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const sentQuoteEmail = createAsyncThunk("sentQuoteEmail", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/quoteemail/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const sentJobEmail = createAsyncThunk("sentJobEmail", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobemail/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const sentInvoiceEmail = createAsyncThunk("sentInvoiceEmail", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/invoiceemail/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchBusniessProfile = createAsyncThunk("fetchBusniessProfile", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/`,);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const sendQuoteMessage = createAsyncThunk("sendQuoteMessage", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/quotesms/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const sendJobMessage = createAsyncThunk("sendJobMessage", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobsms/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const sendInvoiceMessage = createAsyncThunk("sendInvoiceMessage", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/invoicesms/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchTemplate = createAsyncThunk("fetchTemplate", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/quotetemplate/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchTemplateProductForQuote = createAsyncThunk("fetchTemplateProductForQuote", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/templateproductquote/?template=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const createTemplate = createAsyncThunk("createTemplate", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/quotetemplate/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

// Initial State
const initialState = {
    profile: {},
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
    templates:[],
    quoteproducts:[],
    pagination: {
        count: 0,
        next: '',
        previous: '',
    },
    loadingFull: false,
    loadingList: false,
    errorList: null,
    successList: null,

    loadingForm: false,
    errorForm: null,
    loadingObj: {},
    darkMode: false
};

// Slice
const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loadingObj[action?.payload] = true;
        },
        removeLoading: (state, action) => {
            delete state.loadingObj[action?.payload]
        },
        clearsuccessList: (state, action) => {
            state.successList = null
        },
        clearerrorList: (state, action) => {
            state.errorList = null
        },
        darkmodeState: (state, action) => {
            localStorage.setItem('mode', action.payload)
            state.darkMode = action.payload
        }
    },
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
                state.loadingFull = true;
            })
            .addCase(fetchPropertyCustomFields.fulfilled, (state, action) => {
                state.loadingList = false;
                state.loadingFull = false;
                state.propertycustomfields = action.payload;
            })
            .addCase(fetchPropertyCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.loadingFull = false;
                state.errorList = action.payload.error || 'Failed to fetch custom fields';
            });
        builder
            .addCase(createClientsCustomFields.pending, (state, action) => {
                state.loadingObj['client'] = true
            })
        builder
            .addCase(createClientsCustomFields.fulfilled, (state, action) => {
                delete state.loadingObj['client']
                state.clientcustomfields.push(action.payload);
            })
        builder
            .addCase(createClientsCustomFields.rejected, (state, action) => {
                delete state.loadingObj['client']
                state.errorList = action.payload?.message || 'Failed to create client custom fields';
            })
        builder
            .addCase(createPropertyCustomFields.pending, (state, action) => {
                state.loadingObj['property'] = true
            })
        builder
            .addCase(createPropertyCustomFields.fulfilled, (state, action) => {
                state.propertycustomfields.push(action.payload);
                delete state.loadingObj['property']
            })
        builder
            .addCase(createPropertyCustomFields.rejected, (state, action) => {
                delete state.loadingObj['property']
                state.errorList = action.payload?.message || 'Failed to create client custom fields';
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
            .addCase(createQuoteCustomFields.pending, (state, action) => {
                state.loadingObj['quote'] = true
            })
            .addCase(createQuoteCustomFields.fulfilled, (state, action) => {
                state.quotecustomfields.push(action.payload);
                delete state.loadingObj['quote']
            })
            .addCase(createQuoteCustomFields.rejected, (state, action) => {
                delete state.loadingObj['quote']
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
            .addCase(fetchQuote.pending, (state, action) => {
                state.loadingFull = true
            })
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.quote = action.payload;
                state.loadingFull = false
            })
            .addCase(fetchQuote.rejected, (state, action) => {
                state.errorList = action.payload?.message || 'Failed to fetch clients';
                state.loadingFull = false
            });
        builder
            .addCase(createQuote.pending, (state, action) => {
                state.loadingObj['draftquote'] = true;
            })
            .addCase(createQuote.fulfilled, (state, action) => {
                state.quote = action.payload;
                delete state.loadingObj['draftquote'];
                state.successList = 'Quote Created Successfully!'
            })
            .addCase(createQuote.rejected, (state, action) => {
                delete state.loadingObj['draftquote'];
                state.errorList = action.payload.error || 'Failed to create quote';
            });
        builder
            .addCase(fetchQuotes.pending, (state, action) => {
                state.loadingList = true;
            })
            .addCase(fetchQuotes.fulfilled, (state, action) => {
                state.quotes = action.payload;
                state.loadingList = false;
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
            .addCase(createJobCustomFields.pending, (state, action) => {
                state.loadingObj['job'] = true
            })
            .addCase(createJobCustomFields.fulfilled, (state, action) => {
                state.jobcustomfields.push(action.payload);
                delete state.loadingObj['job']
            })
            .addCase(createJobCustomFields.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
                delete state.loadingObj['job']
            });
        builder
            .addCase(fetchJob.pending, (state, action) => {
                state.loadingFull = true
            })
            .addCase(fetchJob.fulfilled, (state, action) => {
                state.job = action.payload;
                state.loadingFull = false
            })
            .addCase(fetchJob.rejected, (state, action) => {
                state.loadingFull = false
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createJob.pending, (state, action) => {
                state.loadingObj['jobcreate'] = true
            })
            .addCase(createJob.fulfilled, (state, action) => {
                delete state.loadingObj['jobcreate'];
                state.successList = "Job Created Succesfully!!"
                state.job = action.payload;
            })
            .addCase(createJob.rejected, (state, action) => {
                delete state.loadingObj['jobcreate'];
                state.errorList = action.payload.error || 'Failed to create job';
            });
        builder
            .addCase(fetchJobs.pending, (state, action) => {
                state.loadingList = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.jobs = action.payload;
                state.loadingList = false;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(fetchInvoice.pending, (state, action) => {
                state.loadingFull = true;
            })
            .addCase(fetchInvoice.fulfilled, (state, action) => {
                state.invoice = action.payload;
                state.loadingFull = false;
            })
            .addCase(fetchInvoice.rejected, (state, action) => {
                state.loadingFull = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createInvoice.pending, (state, action) => {
                state.loadingObj['createinvoice'] = true
            })
            .addCase(createInvoice.fulfilled, (state, action) => {
                delete state.loadingObj['createinvoice']
                state.successList = "Invoice Created Successfully"
                state.invoice = action.payload;
            })
            .addCase(createInvoice.rejected, (state, action) => {
                delete state.loadingObj['createinvoice']
                state.errorList = action.payload.error || 'Failed to create invoice';
            });
        builder
            .addCase(fetchInvoices.pending, (state, action) => {
                state.loadingList = true;
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.invoices = action.payload;
                state.loadingList = false;
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
            .addCase(createInvoiceCustomFields.pending, (state, action) => {
                state.loadingObj['invoice'] = true
            })
            .addCase(createInvoiceCustomFields.fulfilled, (state, action) => {
                state.invoicecustomfields.push(action.payload);
                delete state.loadingObj['invoice']
            })
            .addCase(createInvoiceCustomFields.rejected, (state, action) => {
                delete state.loadingObj['invoice']
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
            .addCase(createJobService.pending, (state, action) => {
                state.loadingObj['newlineitem'] = true
            })
            .addCase(createJobService.fulfilled, (state, action) => {
                delete state.loadingObj['newlineitem']
                state.job['service'].push(action.payload);
            })
            .addCase(createJobService.rejected, (state, action) => {
                delete state.loadingObj['newlineitem']
                state.errorList = action.payload.error || 'Failed to create new line';
            });
        builder
            .addCase(createJobVisit.pending, (state, action) => {
                state.loadingObj['schedulevisit'] = true
            })
            .addCase(createJobVisit.fulfilled, (state, action) => {
                delete state.loadingObj['schedulevisit']
                state.job['visit'].push(action.payload);
            })
            .addCase(createJobVisit.rejected, (state, action) => {
                delete state.loadingObj['schedulevisit']
                state.errorList = action.payload?.message || 'Failed to create visit';
            });
        builder
            .addCase(putJobVisit.pending, (state, action) => {
                state.loadingObj['schedulevisit'] = true
            })
            .addCase(putJobVisit.fulfilled, (state, action) => {
                delete state.loadingObj['schedulevisit']
                state.job['visit'] = state.job['visit'].map(visit => {
                    if (visit?.id == action.payload?.id) {
                        return action?.payload
                    }

                    return visit;
                });
            })
            .addCase(putJobVisit.rejected, (state, action) => {
                delete state.loadingObj['schedulevisit']
                state.errorList = action.payload?.message || 'Failed to update visit';
            });

        builder
            .addCase(createInvoiceReminder.pending, (state, action) => {
                state.loadingObj['invoicereminder'] = true
            })
            .addCase(createInvoiceReminder.fulfilled, (state, action) => {
                delete state.loadingObj['invoicereminder']
                state.job['invoicereminder'].push(action.payload);
            })
            .addCase(createInvoiceReminder.rejected, (state, action) => {
                delete state.loadingObj['invoicereminder']
                state.errorList = action.payload.error || 'Failed to create invoice reminder';
            });
        builder
            .addCase(putInvoiceReminder.pending, (state, action) => {
                state.loadingObj['invoicereminder'] = true
            })
            .addCase(putInvoiceReminder.fulfilled, (state, action) => {
                delete state.loadingObj['invoicereminder']
                state.job['invoicereminder'] = state.job['invoicereminder'].map(visit => {
                    if (visit?.id == action.payload?.id) {
                        return action?.payload
                    }

                    return visit;
                });
            })
            .addCase(putInvoiceReminder.rejected, (state, action) => {
                delete state.loadingObj['invoicereminder']
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to fetch clients';
            });
        builder
            .addCase(createJobExepense.pending, (state, action) => {
                state.loadingObj['expense'] = true
            })
            .addCase(createJobExepense.fulfilled, (state, action) => {
                state.job['expense'].push(action.payload);
                delete state.loadingObj['expense']
            })
            .addCase(createJobExepense.rejected, (state, action) => {
                delete state.loadingObj['expense']
                state.errorList = action.payload.error || 'Failed to create expense';
            });
        builder
            .addCase(putJobExepense.pending, (state, action) => {
                state.loadingObj['expense'] = true
            })
            .addCase(putJobExepense.fulfilled, (state, action) => {
                delete state.loadingObj['expense']
                state.job['expense'] = state.job['expense'].map(item => {
                    if (item?.id == action.payload?.id) {
                        return action?.payload
                    }

                    return item;
                });
            })
            .addCase(putJobExepense.rejected, (state, action) => {
                delete state.loadingObj['expense']
                state.errorList = action.payload.error || 'Failed to update expense';
            });
        builder
            .addCase(createJobEmployeeSheet.pending, (state, action) => {
                state.loadingObj['labourentry'] = true
            })
            .addCase(createJobEmployeeSheet.fulfilled, (state, action) => {
                state.job['labour'].push(action.payload);
                delete state.loadingObj['labourentry'];
            })
            .addCase(createJobEmployeeSheet.rejected, (state, action) => {
                delete state.loadingObj['labourentry'];
                state.errorList = action.payload.error || 'Failed to fetch clients';
            });
        builder
            .addCase(putJobEmployeeSheet.pending, (state, action) => {
                state.loadingObj['labourentry'] = true;
            })
            .addCase(putJobEmployeeSheet.fulfilled, (state, action) => {
                delete state.loadingObj['labourentry'];
                state.job['labour'] = state.job['labour'].map(item => {
                    if (item?.id == action.payload?.id) {
                        return action?.payload
                    }
                    return item;
                });
            })
            .addCase(putJobEmployeeSheet.rejected, (state, action) => {
                delete state.loadingObj['labourentry'];
                state.errorList = action.payload.error || 'Failed to fetch clients';
            });
        builder
            .addCase(sentClientCustommail.pending, (state, action) => {
                state.loadingObj['custommail'] = true
            })
            .addCase(sentClientCustommail.fulfilled, (state, action) => {
                delete state.loadingObj['custommail']
                state.successList = action.payload.message;
            })
            .addCase(sentClientCustommail.rejected, (state, action) => {
                delete state.loadingObj['custommail']
                state.errorList = action.payload.error || 'Failed to send mail to client';
            });
        builder
            .addCase(sendQuoteMessage.pending, (state, action) => {
                state.loadingObj['quotemessage'] = true
            })
            .addCase(sendQuoteMessage.fulfilled, (state, action) => {
                delete state.loadingObj['quotemessage']
                state.successList = action.payload.message;
            })
            .addCase(sendQuoteMessage.rejected, (state, action) => {
                delete state.loadingObj['quotemessage']
                state.errorList = action.payload.error || 'Failed to send message to client';
            });
        builder
            .addCase(fetchBusniessProfile.pending, (state, action) => {
                // state.loadingFull = true;
            })
            .addCase(fetchBusniessProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(fetchBusniessProfile.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to fetch busniess profile';
            });
        builder
            .addCase(sentQuoteEmail.pending, (state, action) => {
                state.loadingObj['quoteemail'] = true;
            })
            .addCase(sentQuoteEmail.fulfilled, (state, action) => {
                state.quote = action.payload;
                state.successList = 'Quote Mail Sent Successfully!';
                delete state.loadingObj['quoteemail'];
            })
            .addCase(sentQuoteEmail.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to send mail';
                delete state.loadingObj['quoteemail'];
            });
        builder
            .addCase(markJoblatevisit.pending, (state, action) => {
                state.loadingObj['latevisit'] = true;
            })
            .addCase(markJoblatevisit.fulfilled, (state, action) => {
                state.job = action.payload;
                state.successList = 'Marked as late visit';
                delete state.loadingObj['latevisit'];
            })
            .addCase(markJoblatevisit.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to mark late visit';
                delete state.loadingObj['latevisit'];
            });
        builder
            .addCase(sendJobMessage.pending, (state, action) => {
                state.loadingObj['jobmessage'] = true;
            })
            .addCase(sendJobMessage.fulfilled, (state, action) => {
                state.successList = action.payload.message;
                delete state.loadingObj['jobmessage'];
            })
            .addCase(sendJobMessage.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to send message!!!';
                delete state.loadingObj['jobmessage'];
            });
        builder
            .addCase(sendInvoiceMessage.pending, (state, action) => {
                state.loadingObj['invoicemessage'] = true;
            })
            .addCase(sendInvoiceMessage.fulfilled, (state, action) => {
                state.successList = action.payload.message;
                delete state.loadingObj['invoicemessage'];
            })
            .addCase(sendInvoiceMessage.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to send message!!!';
                delete state.loadingObj['invoicemessage'];
            });
        builder
            .addCase(sentJobEmail.pending, (state, action) => {
                state.loadingObj['jobemail'] = true;
            })
            .addCase(sentJobEmail.fulfilled, (state, action) => {
                state.successList = action.payload.message;
                delete state.loadingObj['jobemail'];
            })
            .addCase(sentJobEmail.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to send message!!!';
                delete state.loadingObj['jobemail'];
            });
        builder
            .addCase(sentInvoiceEmail.pending, (state, action) => {
                state.loadingObj['invoiceemail'] = true;
            })
            .addCase(sentInvoiceEmail.fulfilled, (state, action) => {
                state.successList = action.payload.message;
                delete state.loadingObj['invoiceemail'];
            })
            .addCase(sentInvoiceEmail.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to send message!!!';
                delete state.loadingObj['invoiceemail'];
            });
        builder
            .addCase(createTemplate.pending, (state, action) => {
                state.loadingObj['savetemplate'] = true;
            })
            .addCase(createTemplate.fulfilled, (state, action) => {
                state.successList = 'New Template Created Successfully!';
                delete state.loadingObj['savetemplate'];
            })
            .addCase(createTemplate.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to create template!!!';
                delete state.loadingObj['savetemplate'];
            });
        builder
            .addCase(fetchTemplate.pending, (state, action) => {
                state.loadingFull = true;
            })
            .addCase(fetchTemplate.fulfilled, (state, action) => {
                state.templates = action.payload;
                state.loadingFull = false;
            })
            .addCase(fetchTemplate.rejected, (state, action) => {
                state.loadingFull = false;
                state.errorList = action.payload.error || 'Failed to fetch templates!!!';
            });
        builder
            .addCase(fetchTemplateProductForQuote.pending, (state, action) => {
                state.loadingFull = true;
            })
            .addCase(fetchTemplateProductForQuote.fulfilled, (state, action) => {
                state.quoteproducts = action.payload;
                state.loadingFull = false;
            })
            .addCase(fetchTemplateProductForQuote.rejected, (state, action) => {
                state.loadingFull = false;
                state.errorList = action.payload.error || 'Failed to fetch templates!!!';
            });
    },
});

export const { setLoading, removeLoading, clearsuccessList, clearerrorList, darkmodeState } = clientSlice.actions;
export default clientSlice.reducer;
