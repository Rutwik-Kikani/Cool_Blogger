export function storeUserInfoInLocal(user) {
  const expirationDate = new Date(new Date().getTime() + user.expiresIn * 1000);
  localStorage.setItem("idToken", user.idToken);
  localStorage.setItem("expirationDate", expirationDate);
  localStorage.setItem("localId", user.localId);
  localStorage.setItem("email", user.email);
}

export function getUserInfoFromLocal() {
  return {
    email: localStorage.getItem("email"),
    idToken: localStorage.getItem("idToken"),
    localId: localStorage.getItem("localId"),
    expirationDate: new Date(localStorage.getItem("expirationDate")),
  };
}
