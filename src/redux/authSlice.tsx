import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
// import REACT_APP_BASE_URL from '@env';

const REACT_APP_BASE_URL = 'http://164.90.176.65:4000';

type stateProp = {
  [key: string]: any;
};

type userProps = {
  [key: string]: string;
};

let initialState: stateProp = {
  isLoggedIn: null,
  id: null,
  sessionExpired: false,
  email: null,
  token: null,
  otp: null,
  otpExpiry: null,
  verified: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  timer: 0,
  passwordResetVerify: false,
};

async function fetchWithTimeout(resource: string, options: any = {}) {
  const { timeout = 30000 } = options;

  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: abortController.signal,
  });
  clearTimeout(id);
  return response;
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, role }: userProps, thunkAPI) => {
    console.log('register dispatched and running');
    try {
      const response = await fetchWithTimeout(`${REACT_APP_BASE_URL}/auth/create-user`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //"Authorization":await SecureStore.getItemAsync('token'),
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: role,
        }),
      });

      let data = await response.json();
      console.log('this is the data set', data);

      if (response.ok) {
        console.log(data);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async ({ email, password }: userProps, thunkAPI) => {
    try {
      const response = await fetchWithTimeout(`${REACT_APP_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //"Authorization":await SecureStore.getItemAsync('token'),
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      //convert response data to JSON;
      let data = await response.json();

      //check if response was successful
      if (response.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const confirmOTP = createAsyncThunk(
  'auth/confirmOTP',
  async (otpCode: userProps, thunkAPI) => {
    const { otp } = otpCode;
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/auth/confirm-otp`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otp }),
      });

      if (response.status === 200) {
        return { verified: true };
      } else {
        const data = await response.json();
        thunkAPI.rejectWithValue(data);
        throw new Error(data.message);
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const VerifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (otpCode: userProps, thunkAPI) => {
    const { otp } = otpCode;
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/auth/verify-user`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //"Authorization":await SecureStore.getItemAsync('token'),
        },
        body: JSON.stringify({ otp: otp }),
      });

      if (response.status === 200) {
        return { verified: true };
      } else {
        const data = await response.json();
        thunkAPI.rejectWithValue(data);
        throw new Error(data.message);
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async ({ email }: userProps, thunkAPI) => {
    try {
      console.log(`${REACT_APP_BASE_URL}/auth/forget-password`);
      const response = await fetch(`${REACT_APP_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      console.log(response.status, 'status');
      if (response.status === 201) {
        return { verified: true };
      } else {
        throw new Error("Email Doesn't Exist");
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.json());
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/restPassword',
  async ({ otp, password }: userProps, thunkAPI) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otp, password: password }),
      });

      console.log(response.status);

      if (response.status === 201) {
        return { passwordChanged: true };
      } else {
        let data = await response.json();
        throw new Error(data);
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.json());
    }
  }
);
export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async ({ email }: userProps, thunkAPI) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/auth/resend-otp/${email}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('resend OTP', response.status);

      if (response.status === 200) {
        return { resentOTP: true };
      } else {
        let data = await response.json();
        throw new Error(data);
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.json());
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    login: (state) => {
      state.isLoggedIn = 'loggedIn';
      SecureStore.setItemAsync('isLoggedIn', 'loggedIn');
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = null;
      SecureStore.deleteItemAsync('token');
      SecureStore.deleteItemAsync('isLoggedIn');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = 'loggedOut';
        state.email = action.payload.email;
        state.id = action.payload._id;
        state.otp = action.payload.otp;
        state.otpExpiry = action.payload.otpExpiry;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      })
      .addCase(VerifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyUser.fulfilled, (state, action: any) => {
        console.log('payload================', action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.verified = true;
        // SecureStore.setItemAsync('verifiedOTP', action.payload.verified.toString());
      })
      .addCase(VerifyUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOTP.fulfilled, (state, action: any) => {
        console.log('payload Resend Code================', action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.verified = true;
        // SecureStore.setItemAsync('verifiedOTP', action.payload.verified.toString());
      })
      .addCase(resendOTP.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(confirmOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOTP.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.verified = true;
        // SecureStore.setItemAsync('verifiedOTP', action.payload.verified.toString());
      })
      .addCase(confirmOTP.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // SecureStore.setItemAsync('verifiedOTP', action.payload.verified.toString());
      })
      .addCase(resetPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = 'loggedIn';
        state.token = action.payload.accessToken;
        SecureStore.setItemAsync('token', action.payload.accessToken);
        SecureStore.setItemAsync('isLoggedIn', 'loggedIn');
      })
      .addCase(userLogin.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload?.message;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(forgetPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = "Email doesn't Exist";
      });
  },
});

export const { clearState, logout, login } = authSlice.actions;
export const authSelector = (state: stateProp) => state.auth;
export default authSlice.reducer;
