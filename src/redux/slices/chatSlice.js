import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Запит на отримання усіх користувачів

export const fetchAllUsers = createAsyncThunk(
  "chat/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://final-project-link.onrender.com/profiles",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Запит на отримання усіх повідомлень з користувачем

export const fetchAllMessageByParams = createAsyncThunk(
  "chat/fetchAllMessageByParams",
  async ({ currentIdUser, idOtherProfile }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://final-project-link.onrender.com/messages/chat",
        {
          withCredentials: true,
          params: {
            id1: currentIdUser,
            id2: idOtherProfile,
            page: 0,
            size: 300,
          },
        }
      );
      return response.data;
      console.log(response.data);
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Отримання по роуту
export const fetchAllMessageByRout = createAsyncThunk(
  "chat/fetchAllMessageByRout",
  async ({ id, currentIdUser }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://final-project-link.onrender.com/messages/chat`,
        {
          withCredentials: true,
          params: {
            id1: currentIdUser,
            id2: id,
            page: 0,
            size: 300,
          },
        }
      );
      return response.data;
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


//Відправлення нового повідомлення користувачу
export const postMessage = createAsyncThunk(
  "chat/postMessage",
  async ({ senderId, recipientId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://final-project-link.onrender.com/messages/create",
        {
          senderId,
          recipientId,
          content,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  users: [],
  message: [],
  newMessage: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateNewMessage: (state, action) => {
      state.newMessage = action.payload; // Обновляем текст нового сообщения
    },
    clearNewMessage: (state) => {
      state.newMessage = ""; // Очищаем текст нового сообщения
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchAllMessageByParams.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(fetchAllMessageByRout.fulfilled, (state, action) => {
      state.message = action.payload;
    });
  },
});

export const { updateNewMessage, clearNewMessage } = chatSlice.actions;
export default chatSlice.reducer;
