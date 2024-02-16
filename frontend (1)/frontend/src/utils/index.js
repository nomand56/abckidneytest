const user = JSON.parse(sessionStorage.getItem("user"));
export const authOptions = {
  headers: {
    Authorization: user ? `Bearer ${user.token}` : "",
  },
};
