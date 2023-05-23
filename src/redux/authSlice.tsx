import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { encode } from 'base-64';
// import BASE_API_URL from '@env';

// const BASE_API_URL = 'http://164.90.176.65:4000';

import { BASE_API_URL, USERNAME, PASSWORD } from '../../config';
const credentials = `${USERNAME}:${PASSWORD}`;
const encodedCredentials = encode(credentials);

console.log('api url =>', BASE_API_URL);

type stateProp = {
  [key: string]: any;
};

type userProps = {
  [key: string]: string;
};

let initialState: stateProp = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLoggedIn: null,
  token: null,
  error: '',
  errorMessage: {},
  userData: null,
};

async function fetchWithTimeout(resource: string, options: any = {}) {
  const { timeout = 200000 } = options;

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
      const response = await fetchWithTimeout(`${BASE_API_URL}/auth/create-user`, {
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

      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk('auth/userLogin', async (data: userProps, thunkAPI) => {
  const { username, password } = data;
  try {
    const response = await fetch(`${BASE_API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        mode: 'A',
      }),
    });

    //convert response data to JSON;
    let data = await response.json();

    // check if response was successful
    if (response.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      err: '404',
      errMsg: 'Network Error',
      message: 'Network or Server Error',
      status: '404',
    });
  }
});

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (data: userProps, thunkAPI) => {
  const { username, password } = data;
  try {
    const response = await fetch(`${BASE_API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        mode: 'V',
      }),
    });

    //convert response data to JSON;
    let data = await response.json();
    console.log('Verified Data returns =================>', data), response.status;

    // check if response was successful
    if (response.status === 203) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      err: '404',
      errMsg: 'Network Error',
      message: 'Network or Server Error',
      status: '404',
    });
  }
});
export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (data: userProps, thunkAPI) => {
    const { username } = data;
    try {
      const response = await fetchWithTimeout(`${BASE_API_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: JSON.stringify({
          username: username,
          mode: 'R',
        }),
      });

      //convert response data to JSON;
      let data = await response.json();

      // check if response was successful
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        err: '404',
        errMsg: 'Network Error',
        message: 'Network or Server Error',
        status: '404',
      });
    }
  }
);
export const createAccount = createAsyncThunk(
  'auth/createAccount',
  async (data: userProps, thunkAPI) => {
    const { username, password } = data;
    try {
      const response = await fetchWithTimeout(`${BASE_API_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: JSON.stringify({
          username: username,
          password: password,
          mode: 'C',
        }),
      });

      //convert response data to JSON;
      let data = await response.json();

      // check if response was successful
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        err: '404',
        errMsg: 'Network Error',
        message: 'Network or Server Error',
        status: '404',
      });
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: userProps, thunkAPI) => {
    const { username, password } = data;
    try {
      const response = await fetch(`${BASE_API_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: JSON.stringify({
          username: username,
          password: password,
          mode: 'S',
        }),
      });

      //convert response data to JSON;
      let data = await response.json();

      // check if response was successful
      if (response.status === 203) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        err: '404',
        errMsg: 'Network Error',
        message: 'Network or Server Error',
        status: '404',
      });
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
      state.isLoggedIn = null;
      SecureStore.deleteItemAsync('isLoggedIn');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userData = action.payload;
      })
      .addCase(createAccount.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
        state.errorMessage = action.payload.message;
      })

      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(verifyOTP.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload?.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action: any) => {
        console.log('Reset Password Fullfilled', action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(resetPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload?.message;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log('State is fullfilled', action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userData = action.payload;
        state.isLoggedIn = 'loggedIn';
        SecureStore.setItemAsync('isLoggedIn', 'loggedIn');
      })
      .addCase(userLogin.rejected, (state, action: any) => {
        console.log('error message obtained from fetch', action.payload);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
        state.errorMessage = action.payload?.message;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        console.log('=================gorget Pass action', action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userData = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
        state.errorMessage = action.payload?.message;
      });
  },
});

export const { clearState, logout, login } = authSlice.actions;
export const authSelector = (state: stateProp) => state.auth;
export default authSlice.reducer;
