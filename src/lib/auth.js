import Store from "store";

// basic cross-browser persistent storage
export const getToken = () => Store.get("token");

export const setToken = (value) => Store.set("token", value);

export const removeToken = () => Store.remove("token");
