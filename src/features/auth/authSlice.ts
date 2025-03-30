import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { RootState } from "../../app/store";
import { User, LoginCredentials } from "./types";
import { loginUser, getAuthenticatedUser, logoutUser } from "./authService";

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const extractErrorData = (error: unknown): { message: string; status: number | null } => {
    let message = 'An unknown error occurred';
    let status = null;
    if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
        status = error.response?.status ?? null;
    } else if (error instanceof Error) {
        message = error.message;
    }
    return { message, status };
};


export const login = createAsyncThunk(
    'auth/login',
    async (user: LoginCredentials, thunkAPI) => {
        try {
            return await loginUser(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorData(error));
        }
    }
);

export const getAuthUser = createAsyncThunk(
    'auth/getAuthUser',
    async (_, thunkAPI) => {
        try {
            return await getAuthenticatedUser();
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorData(error));
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await logoutUser();
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorData(error));
        }
    }
);

export const authSlice = createAppSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            /* login */
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.user = null;
                state.loading = false;
            })

            /* getAuthUser */
            .addCase(getAuthUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAuthUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAuthUser.rejected, (state, action) => {
                const payload = action.payload as { message: string; status: number | null };
                if (payload?.status !== 401) {
                    state.error = payload?.message || 'Failed to check authentication status.';
                } else {
                     state.error = null;
                }
                state.user = null;
                state.loading = false;
            })

            /* logout */
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

/**
 * Select the user state from the auth slice. 
 */
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export const { clearError, resetState } = authSlice.actions;

export default authSlice.reducer;