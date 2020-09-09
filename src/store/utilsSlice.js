import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'

const utilsSlice = createSlice({
    name: 'utils',
    initialState: {
        joinUsForm: { rollNo: '', hasFilledForm: false },
    },
    reducers: {
      joinUsForm: (utils, action) => {
          utils.joinUsForm = {...utils.joinUsForm, ...action.payload};
      },
    }
})

export const { joinUsForm } = utilsSlice.actions;
export default utilsSlice.reducer;


export const getJoinUsFormInfo = createSelector(
    state => state.utils,
    utils => utils.joinUsForm
)
