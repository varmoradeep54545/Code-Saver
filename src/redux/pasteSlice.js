import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
    name: 'paste',
    initialState: {
        pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
    },
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            const alreadypaste = state.pastes.find(p => p.title === paste.title);
            if (alreadypaste) {
                toast("Already created please change title name ");
            } else {

                state.pastes.push(paste);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste Created Successfully", {position: 'top-right'})
            }

        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);
            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));

                toast.success("Paste updated", {position: 'top-right'})
            }
        },

        resetAllPastes: (state, action) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload;
            console.log(pasteId);

            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));

                toast.success("Paste deleted", {position: 'top-right'})
            }
        }
    }
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer