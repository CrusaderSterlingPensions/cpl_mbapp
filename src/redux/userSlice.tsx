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
  // id: null,
  sessionExpired: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  successMessageUser: '',
  profile: {},
};

// async function fetchWithTimeout(resource: string, options: any = {}) {
//   const { timeout = 5000 } = options;

//   const abortController = new AbortController();
//   const id = setTimeout(() => abortController.abort(), timeout);
//   const response = await fetch(resource, {
//     ...options,
//     signal: abortController.signal,
//   });
//   clearTimeout(id);
//   return response;
// }

// export const updateUserById = createAsyncThunk(
//   'user/updateUserById',
//   async ({ userData, id }: userProps, thunkAPI) => {
//     console.log(userData, '*********idCalled**************');
//     try {
//       const response = await fetchWithTimeout(`${REACT_APP_BASE_URL}/users/${id}`, {
//         method: 'PATCH',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: await SecureStore.getItemAsync('token'),
//         },
//         body: JSON.stringify({
//           ...userData,
//         }),
//       });

//       let data = await response.json();

//       if (response.ok) {
//         return data;
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (error: any) {
//       console.log('Error', error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

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
    setRole: (state, action) => {
      state.role = action.payload;
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

export const { setRole } = userSlice.actions;
export const userSelector = (state: stateProp) => state.user;
export default userSlice.reducer;
