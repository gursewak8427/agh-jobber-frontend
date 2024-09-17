const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    token: '',
    profile: [],
    isloading: false,
    error: '',
    message: '',
}

const Slice = createSlice({
    name: "authuserslice",
    initialState,
    reducers: {
        isloadingAction: (state, action) => {
            state.isloading = action.payload;
        },
        authtoken: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.token = action.payload
        },
        profileAction: (state, action) => {
            state.profile = action.payload
        }
    },
    extraReducers: (builder) => {

    }
})

export const { isloadingAction, authtoken, profileAction } = Slice.actions;
export default Slice.reducer;