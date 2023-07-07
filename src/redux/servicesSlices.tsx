import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { BASE_STATEMENT_API } from '../../config';

type stateProp = {
  [key: string]: any;
};

type userProps = {
  [key: string]: any;
};

let initialState: stateProp = {
  isServicesLoading: false,
  isServicesSuccess: false,
  isServicesError: false,
  startDate: '',
  endState: '',
  servicesErrorMessage: '',
  servicesSuccessMessage: '',
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

export const requestStatement = createAsyncThunk(
  'services/requestStatement',
  async ({ pin, startDate, endDate }: userProps, thunkAPI) => {
    try {
      const response = await fetchWithTimeout(
        `${BASE_STATEMENT_API}/generate/?pin=${pin}&startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

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

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearDatesDetails: (state) => {
      state.startDate = '';
      state.endDate = '';
      state.isServicesLoading = false;
      state.isServicesSuccess = false;
      state.isServicesError = false;
      state.servicesErrorMessage = '';
      state.servicesEuccessMessage = '';
    },

    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requestStatement.pending, (state) => {
        state.isServicesLoading = true;
      })
      .addCase(requestStatement.fulfilled, (state, action) => {
        state.isServicesLoading = false;
        state.isServicesSuccess = true;
        state.isServicesError = false;
        state.servicesSuccessMessage = action.payload.message;
      })
      .addCase(requestStatement.rejected, (state, action: any) => {
        state.isServicesLoading = false;
        state.isServicesSuccess = false;
        state.servicesErrorMessage = action.payload.message;
      });
  },
});

export const { clearDatesDetails, setEndDate, setStartDate } = servicesSlice.actions;
export const servicesSelector = (state: stateProp) => state.user;
export default servicesSlice.reducer;
