import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'

const UISlice = createSlice({
    name: 'UI',
    initialState: {
        header: 'show',
        notification: '',
        dispatchNotification: false,
        redirectToPage: '',
    },
    reducers: {
      displayHeader: (UI, action) => {
          UI.header = action.payload;
      },
      notification: (UI, action) => {
          UI.notification = action.payload
      },
      dispatchNotification: (UI, action) => {
          UI.dispatchNotification = action.payload
      },
      redirectToPage: (UI, action) => {
          UI.redirectToPage = action.payload
      }
    }
})

export const { displayHeader, notification, dispatchNotification, redirectToPage } = UISlice.actions;
export default UISlice.reducer;

//selectors
export const getUI = createSelector(
    state => state.UI,
    UI => UI
)