const isAuthenticated = (): boolean => {
  return document.cookie.includes("accessToken");
};

export default isAuthenticated;
