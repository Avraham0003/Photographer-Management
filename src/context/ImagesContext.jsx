import { createContext, useContext, useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import { toast } from "react-toastify";

const ImagesContext = createContext();

const ImagesContextProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //Ordered Photos:
  const [images, setImages] = useState({
    allPhotos: [],
    disabledPhotos: [],
    selectedPhotos: [],
  });

  // Functions ==>

  async function getEventPhotos(event_id) {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL +
          `/photos/get_photos_by_event_id/${event_id}`
      );

      setImages({
        allPhotos: response.data.allPhotos,
        selectedPhotos: response.data.photosToDevelop,
        disabledPhotos: response.data.disabledPhotos,
      });
    } catch (error) {
      setError(error.response.data.error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  //==================================

  async function toggleDisable(id, changeto) {
    try {
      const photo_id = id;

      // in case the user want to disabled the image
      if (changeto && !images.disabledPhotos.find((el) => el._id == photo_id)) {
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER_URL + `/photos/toggleDisable/`,
          {
            photo_id,
            changeto,
          }
        );

        setImages({
          allPhotos: [...images.allPhotos],
          disabledPhotos: [
            ...images.disabledPhotos,
            { ...images.allPhotos.find((el) => el._id == photo_id) },
          ],
          selectedPhotos: [...images.selectedPhotos],
        });

        toast.success(data.message);
      } else if (
        !changeto &&
        images.disabledPhotos.find((el) => el._id == photo_id)
      ) {
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER_URL + `/photos/toggleDisable/`,
          {
            photo_id,
            changeto,
          }
        );
        const filtered = images.disabledPhotos.filter((el) => {
          return el._id != photo_id;
        });

        setImages({
          allPhotos: [...images.allPhotos],
          disabledPhotos: filtered,
          selectedPhotos: [...images.selectedPhotos],
        });
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  //==================================

  async function toggleSelected(id, is_selected) {
    try {
      const photo_id = id;

      // in case the user want to select the image
      if (
        is_selected &&
        !images.selectedPhotos.find((el) => el._id == photo_id)
      ) {
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER_URL + `/photos/toggleSelected/`,
          {
            photo_id,
            changeto: is_selected,
          }
        );

        setImages({
          allPhotos: [...images.allPhotos],
          selectedPhotos: [
            ...images.selectedPhotos,
            { ...images.allPhotos.find((el) => el._id == photo_id) },
          ],
          disabledPhotos: [...images.disabledPhotos],
        });

        toast.success(data.message);
      } else if (
        !is_selected &&
        images.selectedPhotos.find((el) => el._id == photo_id)
      ) {
        const { data } = await axios.post(
          import.meta.env.VITE_SERVER_URL + `/photos/toggleSelected/`,
          {
            photo_id,
            changeto: is_selected,
          }
        );

        const filtered = images.selectedPhotos.filter((el) => {
          return el._id != photo_id;
        });

        setImages({
          allPhotos: [...images.allPhotos],
          selectedPhotos: filtered,
          disabledPhotos: [...images.disabledPhotos],
        });
        toast.success(data.message);

        setImages({...images})
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  //==================================

  const downloadImage = (image) => {
    saveAs(image, image); // Put your image url here.
  };
  //==>

  //UseEffects ==>

  return (
    <ImagesContext.Provider
      value={{
        images,
        setImages,
        toggleDisable,
        toggleSelected,
        downloadImage,
        loading,
        error,
        getEventPhotos
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

export const useImagesContext = () => {
  return useContext(ImagesContext);
};

export default ImagesContextProvider;