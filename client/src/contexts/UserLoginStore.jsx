import React, { useState, createContext } from "react";

export const userLoginContext = createContext();

const UserLoginStore = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoginStatus, setUserLoginStatus] = useState(false);

    const handleLogin = (user) => {
        setCurrentUser(user);
        setUserLoginStatus(true);
    };

    const logoutUser = () => {
        setCurrentUser(null);
        setUserLoginStatus(false);
        localStorage.removeItem("token");
    };

    return (
        <userLoginContext.Provider value={{ currentUser, setCurrentUser, userLoginStatus, handleLogin, logoutUser }}>
            {children}
        </userLoginContext.Provider>
    );
};

export default UserLoginStore;
