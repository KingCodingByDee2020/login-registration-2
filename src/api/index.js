import auth from './auth';

const api = {
  async show(email, password) {
    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  },

  async create(email, password) {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    return user;
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
