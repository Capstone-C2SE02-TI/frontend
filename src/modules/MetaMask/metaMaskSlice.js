import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { coinDetailService } from '~/services';

const MetaMaskSlice = createSlice({
    name: 'metaMask',
    initialState: {
      address: ''
       
    },
    reducers: {
        setInformationMetaMask: (state, action) => {
            state.address = action.payload
        }
    },

    extraReducers: (builder) => {
         
    },
});
export const {setInformationMetaMask } = MetaMaskSlice.actions
export default MetaMaskSlice;
