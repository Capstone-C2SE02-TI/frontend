import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { gainLossService } from '~/services';

const gainLossSlice = createSlice({
    name: 'gainLoss',
    initialState: {
        status: 'idle', gainLossShark: [], gainLossCypto: [],
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGainLossShark.fulfilled, (state, action) => {
                state.gainLossShark = action.payload;
                state.status = 'idle';
            })

            .addCase(fetchGainLossCypto.fulfilled, (state, action) => {
                state.gainLossCypto = action.payload;
                state.status = 'idle';
            });
    },
});

export const fetchGainLossShark = createAsyncThunk('gainLoss/fetchGainLossShark', async (isTrue) => {
    const response = await gainLossService.getGainLossShark(isTrue);
    return response.datas;
});

export const fetchGainLossCypto = createAsyncThunk('gainLoss/fetchGainLossCypto', async (isTrue) => {
    const response = await gainLossService.getGainLossCrypto(isTrue);
    return response.datas;
});

export default gainLossSlice;
