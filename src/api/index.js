import ky from 'ky';
import auth from './auth';

const api = {
  auth: {
    async show(email, password) {
      try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    async create(email, password) {
      try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    update(email) {
      return auth
        .sendPasswordResetEmail(email)
        .then(() => 'Go check your ✉️❗')
        .catch(error => {
          throw new Error(error);
        });
    },
  },
  //
  photo: {
    async create(imgFile) {
      const fd = new FormData();

      fd.append('file', imgFile);
      fd.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
      ky.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { body: fd }
      ).json();
    },
  },
};

export default api;
