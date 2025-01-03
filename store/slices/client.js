import axiosInstance from '@/store/AxiosInstance';
import { handleAsyncThunkError } from '@/utils/handleAsyncThunkError';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


export const fetchTeam = createAsyncThunk("fetchTeam", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/team/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchCommunications = createAsyncThunk("fetchCommunications", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/clientcommunication/`);
        return response.data;

        // return [{
        //     id: 1,
        //     client:"Gursewak Singh",
        //     sentDate: '2024-10-22T10:22:12.382Z',
        //     to: "brajesh_dev@yahoo.com",
        //     subject: "We've received your requested changes",
        //     status: "Sent",
        //     type: "Quote changes requested",
        //     openedDate: null,
        //     message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, non."
        // },
        // // {
        // //     id: 2,
        // //     client: /* id of client, it will auto populate */{
        // //         id: 6,
        // //         fname: "Gurjeet",
        // //         lname: "Singh",
        // //         companyname: "Prosbro",
        // //     },
        // //     sentDate: '2024-10-22T10:22:12.382Z',
        // //     to: "rahul_dev@yahoo.com",
        // //     subject: "Quote from AGH RENOVATION LIMITED - Oct 09, 2024",
        // //     status: "Opened",
        // //     type: "Quote Sent",
        // //     openedDate: '2024-10-08T10:22:12.382Z',
        // //     message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, non."
        // // }
        // ]
    } catch (error) {

    }
});

export const fetchCommunication = createAsyncThunk("fetchCommunication", async (data, { rejectWithValue }) => {
    try {
        // Here data is the 'id' of communication

        // Fetch //////
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/clientcommunication/?id=${data}`);
        return response.data;

        // return {
        //     id: 1,
        //     client: /* id of client, it will auto populate */{
        //         id: 5,
        //         fname: "Gursewak",
        //         lname: "Singh",
        //         companyname: "Prismaple",
        //     },
        //     sentDate: '2024-10-22T10:22:12.382Z',
        //     to: "brajesh_dev@yahoo.com",
        //     subject: "We've received your requested changes",
        //     status: "Sent",
        //     type: "Quote changes requested",
        //     openedDate: null,
        //     message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, non."
        // }
    } catch (error) {

    }
});

export const fetchClients = createAsyncThunk("fetchClients", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/?page=${data.page}&page_size=${data.page_size}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteClient = createAsyncThunk("deleteClient", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/clients/?id=${data.id}&type=${data.type}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const achivedClient = createAsyncThunk("achivedClient", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/clients/?id=${data.id}&type=${data.type}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchallClients = createAsyncThunk("fetchallClients", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/?list=true`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchClientsCustomFields = createAsyncThunk("fetchClientsCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/customclientfield/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const archivedClientsCustomFields = createAsyncThunk("archivedClientsCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/customclientfield/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const createClientsCustomFields = createAsyncThunk("createClientsCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/customclientfield/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
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
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const createClient = createAsyncThunk("createClient", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/client/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchClient = createAsyncThunk("fetchClient", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/client/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchProperty = createAsyncThunk("fetchProperty", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/property/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const createProperty = createAsyncThunk("createProperty", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/property/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchQuotecount = createAsyncThunk("fetchQuotecount", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/quotecount/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchJobcount = createAsyncThunk("fetchJobcount", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/jobcount/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchInvoicecount = createAsyncThunk("fetchInvoicecount", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/invoicecount/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const createQuoteCustomFields = createAsyncThunk("createQuoteCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/customquotefield/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchQuoteCustomFields = createAsyncThunk("fetchQuoteCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/customquotefield/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchQuote = createAsyncThunk("fetchQuote", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/quote/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
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

export const updateQuote = createAsyncThunk("updateQuote", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/quote/`, data);
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
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteQuote = createAsyncThunk("deleteQuote", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/quote/?id=${data.id}&type=${data.type}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const achivedQuote = createAsyncThunk("achivedQuote", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/quote/?id=${data.id}&type=${data.type}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchJobCustomFields = createAsyncThunk("fetchJobCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/customjobfield/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});


export const createJobCustomFields = createAsyncThunk("createJobCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/customjobfield/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchJob = createAsyncThunk("fetchJob", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/job/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
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

export const updateJob = createAsyncThunk("updateJob", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/job/`, data);
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
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteJob = createAsyncThunk("deleteJob", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/job/?id=${data.id}&type=${data.type}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const archivedJob = createAsyncThunk("archivedJob", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/job/?id=${data.id}&type=${data.type}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});


export const fetchInvoiceCustomFields = createAsyncThunk("fetchInvoiceCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/custominvoicefield/`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});


export const createInvoiceCustomFields = createAsyncThunk("createInvoiceCustomFields", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/custominvoicefield/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchInvoice = createAsyncThunk("fetchInvoice", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/invoice/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
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

export const updateInvoice = createAsyncThunk("updateInvoice", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/invoice/`, data);
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
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteInvoice = createAsyncThunk("deleteInvoice", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/invoice/?id=${data.id}&type=${data.type}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const archivedInvoice = createAsyncThunk("archivedInvoice", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/invoice/?id=${data.id}&type=${data.type}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const createJobService = createAsyncThunk("createJobService", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobservice/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
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
        return handleAsyncThunkError(error, rejectWithValue);
    }
});



export const putJobVisit = createAsyncThunk("putJobVisit", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/jobvisit/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});



export const createInvoiceReminder = createAsyncThunk("createInvoiceReminder", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobinvoicereminder/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});



export const putInvoiceReminder = createAsyncThunk("putInvoiceReminder", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/jobinvoicereminder/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const createJobExepense = createAsyncThunk("createJobExepense", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobexpense/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});


export const putJobExepense = createAsyncThunk("putJobExepense", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/jobexpense/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const putJobEmployeeSheet = createAsyncThunk("putJobEmployeeSheet", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/jobexployeesheet/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});


export const createJobEmployeeSheet = createAsyncThunk("createJobEmployeeSheet", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/jobexployeesheet/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
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


export const fetchSingleTemplate = createAsyncThunk("fetchSingleTemplate", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/quotetemplate/?id=${data}`);
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

export const updateTemplate = createAsyncThunk("updateTemplate", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/quotetemplate/`, data);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteTemplate = createAsyncThunk("deleteTemplate", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/quotetemplate/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteTemplateProductItem = createAsyncThunk("deleteTemplateProductItem", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/templateproductitem/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteTemplateProduct = createAsyncThunk("deleteTemplateProduct", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/templateproduct/?id=${data}`);
        return response.data;
    } catch (error) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const createTemplateWith = createAsyncThunk("createTemplateWith", async (data, { rejectWithValue }) => {
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
    communications: [],
    communication: {},
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
    templates: [],
    quoteproducts: [],
    pagination: {
        count: 0,
        next: '',
        previous: '',
    },
    loadingFull: false,
    loadingList: false,
    errorList: null,
    successList: null,
    loadingpromise: null,

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
        clearloadingpromise: (state, action) => {
            state.loadingpromise = null
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
            .addCase(deleteClient.pending, (state) => {
                state.loadingList = true;
                state.loadingpromise = 'Deleting Client'
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.loadingList = false;
                state.successList = 'Client Deleted Successfully!';
                // Remove client from list
                state.clients = state.clients.filter((client) => client.id !== Number(action.payload.id));
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = 'Failed to delete client';
            });
        builder
            .addCase(achivedClient.pending, (state) => {
                state.loadingList = true;
                state.loadingpromise = 'Achieving Client'
            })
            .addCase(achivedClient.fulfilled, (state, action) => {
                state.loadingList = false;
                state.successList = 'Client Achieved Successfully!';
                // Remove client from list with payload convert to num as id
                state.clients = state.clients.filter((client) => client.id !== Number(action.payload.id));
            })
            .addCase(achivedClient.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = 'Failed to achieve client';
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
            .addCase(archivedClientsCustomFields.pending, (state) => {
                state.loadingObj['archiveclientcustomfiled'] = true;
            })
            .addCase(archivedClientsCustomFields.fulfilled, (state, action) => {
                delete state.loadingObj['archiveclientcustomfiled']
                state.clientcustomfields = action.payload;
            })
            .addCase(archivedClientsCustomFields.rejected, (state, action) => {
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
                state.errorList = action.payload?.message || 'Failed to create client property custom fields';
            })
        builder
            .addCase(createProperty.pending, (state, action) => {
                state.loadingObj['newproperty'] = true
            })
        builder
            .addCase(createProperty.fulfilled, (state, action) => {
                state.propertycustomfields.push(action.payload);
                delete state.loadingObj['newproperty'];
                state.successList = 'Property Created Successfully!';
            })
        builder
            .addCase(createProperty.rejected, (state, action) => {
                delete state.loadingObj['newproperty']
                state.errorList = action.payload?.message || 'Failed to create client property custom fields';
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
            .addCase(updateQuote.pending, (state, action) => {
                state.loadingObj['updatequote'] = true;
            })
            .addCase(updateQuote.fulfilled, (state, action) => {
                state.quote = action.payload;
                delete state.loadingObj['updatequote'];
                state.successList = 'Quote updated Successfully!'
            })
            .addCase(updateQuote.rejected, (state, action) => {
                delete state.loadingObj['updatequote'];
                state.errorList = action.payload.error || 'Failed to update quote';
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
            .addCase(deleteQuote.pending, (state, action) => {
                state.loadingList = true;
                state.loadingpromise = 'Deleting Quote'
            })
            .addCase(deleteQuote.fulfilled, (state, action) => {
                state.quotes = state.quotes.filter((quote) => quote.id !== Number(action.payload.id));
                state.loadingList = false;
                state.successList = "Quote Deleted Successfully!!"
            })
            .addCase(deleteQuote.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to delete quote';
            });
        builder
            .addCase(achivedQuote.pending, (state, action) => {
                state.loadingList = true;
                state.loadingpromise = 'Achieving Quote'
            })
            .addCase(achivedQuote.fulfilled, (state, action) => {
                state.quotes = state.quotes.filter((quote) => quote.id !== Number(action.payload.id));
                state.loadingList = false;
                state.successList = "Quote Achieved Successfully!!"
            })
            .addCase(achivedQuote.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to achieve quote';
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
            .addCase(updateJob.pending, (state, action) => {
                state.loadingObj['jobupdate'] = true
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                delete state.loadingObj['jobupdate'];
                state.successList = "Job updated Succesfully!!"
                state.job = action.payload;
            })
            .addCase(updateJob.rejected, (state, action) => {
                delete state.loadingObj['jobupdate'];
                state.errorList = action.payload.error || 'Failed to update job';
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
            .addCase(deleteJob.pending, (state, action) => {
                state.loadingList = true;
                state.loadingpromise = 'Deleting Job'
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.jobs = state.jobs.filter((job) => job.id !== Number(action.payload.id));
                state.loadingList = false;
                state.successList = "Job Deleted Successfully!!"
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to delete job';
            });
        builder
            .addCase(archivedJob.pending, (state, action) => {
                state.loadingList = true;
                state.loadingpromise = 'Archiving Job'
            })
            .addCase(archivedJob.fulfilled, (state, action) => {
                state.jobs = state.jobs.filter((job) => job.id !== Number(action.payload.id));
                state.loadingList = false;
                state.successList = "Job Archived Successfully!!"
            })
            .addCase(archivedJob.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to archive job';
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
            .addCase(updateInvoice.pending, (state, action) => {
                state.loadingObj['updateinvoice'] = true
            })
            .addCase(updateInvoice.fulfilled, (state, action) => {
                delete state.loadingObj['updateinvoice']
                state.successList = "Invoice updated Successfully"
                state.invoice = action.payload;
            })
            .addCase(updateInvoice.rejected, (state, action) => {
                delete state.loadingObj['updateinvoice']
                state.errorList = action.payload.error || 'Failed to update invoice';
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
            .addCase(deleteInvoice.pending, (state, action) => {
                state.loadingList = true;
                state.loadingpromise = 'Deleting Invoice';
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.invoices = state.invoices.filter((invoice) => invoice.id !== Number(action.payload.id));
                state.loadingList = false;
                state.successList = "Invoice Deleted Successfully"
            })
            .addCase(deleteInvoice.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to delete invoice';
            });
        builder
            .addCase(archivedInvoice.pending, (state, action) => {
                state.loadingList = true;
                state.loadingpromise = 'Archiving Invoice';
            })
            .addCase(archivedInvoice.fulfilled, (state, action) => {
                state.invoices = state.invoices.filter((invoice) => invoice.id !== Number(action.payload.id));
                state.loadingList = false;
                state.successList = "Invoice Archived Successfully"
            })
            .addCase(archivedInvoice.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload?.message || 'Failed to archive invoice';
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
                state.successList = "Message Sent Successfully!";
                state.quote = action.payload
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
            .addCase(updateTemplate.pending, (state, action) => {
                state.loadingObj['updatetemplate'] = true;
            })
            .addCase(updateTemplate.fulfilled, (state, action) => {
                state.successList = 'Template updated successfully!';
                delete state.loadingObj['updatetemplate'];
            })
            .addCase(updateTemplate.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to update template!!!';
                delete state.loadingObj['updatetemplate'];
            });
        builder
            .addCase(createTemplateWith.pending, (state, action) => {
                state.loadingObj['savetemplatewith'] = true;
            })
            .addCase(createTemplateWith.fulfilled, (state, action) => {
                state.successList = 'New Template Created Successfully!';
                delete state.loadingObj['savetemplatewith'];
            })
            .addCase(createTemplateWith.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to create template!!!';
                delete state.loadingObj['savetemplatewith'];
            });
        builder
            .addCase(deleteTemplate.pending, (state, action) => {
                state.loadingpromise = 'Deleting templete please wait!';
            })
            .addCase(deleteTemplate.fulfilled, (state, action) => {
                state.successList = 'Template deleted Successfully!';
                state.templates = action.payload;
            })
            .addCase(deleteTemplate.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to delete template!!!';
            });
        builder
            .addCase(deleteTemplateProductItem.pending, (state, action) => {
                state.loadingpromise = 'Deleting Item please wait!';
            })
            .addCase(deleteTemplateProductItem.fulfilled, (state, action) => {
                state.successList = 'Item deleted Successfully!';
            })
            .addCase(deleteTemplateProductItem.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to delete item!!!';
            });
        builder
            .addCase(deleteTemplateProduct.pending, (state, action) => {
                state.loadingpromise = 'Deleting Product please wait!';
            })
            .addCase(deleteTemplateProduct.fulfilled, (state, action) => {
                state.successList = 'Product deleted Successfully!';
            })
            .addCase(deleteTemplateProduct.rejected, (state, action) => {
                state.errorList = action.payload.error || 'Failed to delete Product!!!';
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

        builder
            .addCase(fetchSingleTemplate.pending, (state, action) => {
                state.loadingFull = true;
            })
            .addCase(fetchSingleTemplate.fulfilled, (state, action) => {
                state.quoteproducts = action.payload;
                state.loadingFull = false;
            })
            .addCase(fetchSingleTemplate.rejected, (state, action) => {
                state.loadingFull = false;
                state.errorList = action.payload.error || 'Failed to fetch templates!!!';
            });

        builder
            .addCase(fetchCommunications.pending, (state, action) => {
                state.loadingObj["fetchcommunications"] = true;
            })
            .addCase(fetchCommunications.fulfilled, (state, action) => {
                state.loadingObj["fetchcommunications"] = false;
                state.communications = action.payload;
            })
            .addCase(fetchCommunications.rejected, (state, action) => {
                state.loadingObj["fetchcommunications"] = false;
                state.errorList = action.payload?.message || 'Failed to fetch team';
            });

        builder
            .addCase(fetchCommunication.pending, (state, action) => {
                state.loadingObj["fetchcommunication"] = true;
            })
            .addCase(fetchCommunication.fulfilled, (state, action) => {
                state.loadingObj["fetchcommunication"] = false;
                state.communication = action.payload;
            })
            .addCase(fetchCommunication.rejected, (state, action) => {
                state.loadingObj["fetchcommunication"] = false;
                state.errorList = action.payload?.message || 'Failed to fetch team';
            });
    },
});

export const { setLoading, removeLoading, clearsuccessList, clearerrorList, darkmodeState, clearloadingpromise } = clientSlice.actions;
export default clientSlice.reducer;
