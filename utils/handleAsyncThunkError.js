export const handleAsyncThunkError = (error, rejectWithValue) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    return rejectWithValue(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    return rejectWithValue("No response from the server.");
  } else {
    // Something else happened in setting up the request
    return rejectWithValue("Something went wrong.");
  }
};