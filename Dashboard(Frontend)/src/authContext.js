import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:3001/login", { email, password });
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
        } catch (error) {
            console.error("Login failed", error.response?.data || error.message);
        }
    };

    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
