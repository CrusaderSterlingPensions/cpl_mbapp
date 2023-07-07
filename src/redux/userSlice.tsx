import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
// import REACT_APP_BASE_URL from '@env';

const REACT_APP_BASE_URL = 'http://localhost:3000/profile';

type stateProp = {
  [key: string]: any;
};

type userProps = {
  [key: string]: any;
};

let initialState: stateProp = {
  // role: null,
  loginPin: '',
  forgetPasswordPin: '',
  loginPassword: '',
  sessionExpired: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  successMessageUser: '',
  profile: {},
};

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async () => {
  try {
    const response = await fetch('http://localhost:3000/profile');
    return response.json();
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearLoginDetails: (state) => {
      state.loginPin = '';
      state.loginPassword = '';
    },

    setForgetPasswordPin: (state, action) => {
      console.log('digits', action.payload);
      state.forgetPasswordPin = action.payload;
    },
    setLoginPin: (state, action) => {
      state.loginPin = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.loginPassword = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        console.log('returned Data is', action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.profile = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.onBoarding = action.payload?.message?.onBoarding;

        // if (action.payload.message === 'Unauthenticated.') {
        //   state.sessionExpired = true;
        // } else {
        //   state.isErrorUser = true;
        //   state.errorMessageUser = action.payload?.message;
        // }
      });
  },
});

export const { clearLoginDetails, setLoginPassword, setLoginPin, setForgetPasswordPin } =
  userSlice.actions;
export const userSelector = (state: stateProp) => state.user;
export default userSlice.reducer;
