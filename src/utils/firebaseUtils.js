// firebaseUtils.js
import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImageToFirebase = (file, onProgress, onSuccess, onError) => {
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      if (onProgress) {
        onProgress(progress);
      }
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
      }
    },
    (error) => {
      console.error("Error during upload: ", error);
      if (onError) {
        onError(error);
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        if (onSuccess) {
          onSuccess(downloadURL);
        }
      });
    }
  );
};
