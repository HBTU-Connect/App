import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'

const UISlice = createSlice({
    name: 'UI',
    initialState: {
        header: 'show',
    },
    reducers: {
      displayHeader: (UI, action) => {
          UI.header = action.payload;
      }
    }
})

export const { displayHeader } = UISlice.actions;
export default UISlice.reducer;

//selectors
export const getUI = createSelector(
    state => state.entities.UI,
    UI => UI
)