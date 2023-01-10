/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const initialState = {
  email: "",
  password: "",
  error: false,
  isLoading: false,
  isMapOpen: false,
  location: {},
  carParks: [],
  isModalOpen: false,
  modalData: null,
  selectedId: "",
  owner: null,
};
export const logout = createAsyncThunk("auth/logout", () => {
  signOut(auth);
});

export const register = createAsyncThunk(
  "auth/register",
  async (
    { name, email, password, phoneNumber, owner },
    { rejectWithValue }
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: owner,
      });
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return isLoggedIn;
};
export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return user;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
    setIsMapOpen: (state, action) => {
      state.isMapOpen = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCarParks: (state, action) => {
      state.carParks = action.payload;
    },
    setParkWithId: (state) => {
      state.modalData = state.carParks.filter(
        (park) => park.id === state.selectedId
      );
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  changeEmail,
  changePassword,
  setIsMapOpen,
  setLocation,
  setCarParks,
  setModalOpen,
  setSelectedId,
  setParkWithId,
  setOwner,
} = authSlice.actions;
export default authSlice.reducer;
