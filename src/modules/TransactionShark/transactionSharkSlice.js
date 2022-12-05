import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { transactionSharkService } from '~/services';

const transactionSharkSlice = createSlice({
    name: 'transactionShark',
    initialState: {
        status: 'idle',
        transactionSharkList: [],
        transactionsLength: '',
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionShark.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactionShark.fulfilled, (state, action) => {
                state.transactionSharkList = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchTransactionSharkLength.fulfilled, (state, action) => {
                state.transactionsLength = action.payload;
                state.status = 'idle';
            });
    },
});

export const fetchTransactionShark = createAsyncThunk('transactionShark/fetchTransactionShark', async () => {
    const response = await transactionSharkService.getTransactionShark();
    return response.datas;
});
export const fetchTransactionSharkLength = createAsyncThunk('transactionShark/fetchTransactionSharkLength', async () => {
    const response = await transactionSharkService.getTransactionSharkLength();
    return response.datas;
});

export default transactionSharkSlice;
