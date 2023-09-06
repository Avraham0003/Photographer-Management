import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  error: null,
  images: null,
};

export const getImagesByEventId = createAsyncThunk(
  "images/fetch",
  async (eventId) => {
    const { data } = await axios.get(
      import.meta.env.VITE_SERVER_URL +
        `/photos/get_photos_by_event_id/${eventId}`
    );
    return {
      allPhotos: data.allPhotos,
      disabledPhotos: data.disabledPhotos,
      selectedPhotos: data.photosToDevelop,
    };
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    toggleDisable: (state, action) => {
      const { imageId, status } = action.payload;

      if (
        status &&
        !state.images.disabledPhotos.find((el) => el._id == imageId)
      ) {
        state.images.disabledPhotos.push({
          ...state.images.allPhotos.find((el) => el._id == imageId),disabled:true
        });

        state.images.allPhotos.find((el) => el._id == imageId).disabled = true
        
        // Implement changes on selected images
        if (state.images.selectedPhotos.find((el) => el._id == imageId)) {
          state.images.selectedPhotos.find((el) => el._id == imageId).disabled = true;
        }
      } else if (
        !status &&
        state.images.disabledPhotos.find((el) => el._id == imageId)
      ) {
        const filtered = state.images.disabledPhotos.filter((el) => {
          return el._id != imageId;
        });

        state.images.disabledPhotos = filtered;
        state.images.allPhotos.find((el) => el._id == imageId).disabled = false

        // Implement changes on selected images
        if (state.images.selectedPhotos.find((el) => el._id == imageId)) {
          state.images.selectedPhotos.find((el) => el._id == imageId).disabled = false;
        }
      }
    },
    toggleSelected: (state, action) => {
      const { imageId, status } = action.payload;

      if (
        status &&
        !state.images.selectedPhotos.find((el) => el._id == imageId)
      ) {
        state.images.selectedPhotos.push({
          ...state.images.allPhotos.find((el) => el._id == imageId),is_selected:true
        });

        state.images.allPhotos.find((el) => el._id == imageId).is_selected = true

        // Implement changes on disabled images
        if (state.images.disabledPhotos.find((el) => el._id == imageId)) {
          state.images.disabledPhotos.find((el) => el._id == imageId).is_selected = true;
        }
      } else if (
        !status &&
        state.images.selectedPhotos.find((el) => el._id == imageId)
      ) {
        const filtered = state.images.selectedPhotos.filter((el) => {
          return el._id != imageId;
        });

        state.images.selectedPhotos = filtered;
        state.images.allPhotos.find((el) => el._id == imageId).is_selected = false

        // Implement changes on disabled images
        if (state.images.disabledPhotos.find((el) => el._id == imageId)) {
          state.images.disabledPhotos.find((el) => el._id == imageId).is_selected = false;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getImagesByEventId.fulfilled, (state, action) => {
      state.loading = false;
      state.images = action.payload;
    }),
      builder.addCase(getImagesByEventId.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getImagesByEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const {toggleDisable} = imagesSlice.actions
export const {toggleSelected} = imagesSlice.actions

export default imagesSlice.reducer;

