import auth from './auth';

const api = {
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
};

export default api;
