import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { transactionSharkService } from '~/services';

const transactionSharkSlice = createSlice({
    name: 'transactionShark',
    initialState: {
        status: 'idle',
        transactionSharkList: [],
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
            });
    },
});

export const fetchTransactionShark = createAsyncThunk('transactionShark/fetchTransactionShark', async (pageNum) => {
    const response = await transactionSharkService.getTransactionShark(pageNum);
    return response.datas;
});

export default transactionSharkSlice;
