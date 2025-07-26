import React, {createContext, useContext, useState, useEffect} from "react";

interface AuthContextType {
    token : string | null;
    login : (token: string) => void;
    logout : ()=> void;
    isAuthReady :boolean;
};

const AuthContext = createContext<AuthContextType | undefined> (undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children })=>{
    const [token,setToken] = useState<string | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(()=>{
        const savedToken = localStorage.getItem("token");
        if(savedToken) setToken(savedToken);
        setIsAuthReady(true);
    },[]);

    const login = (newToken: string) =>{
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout=()=>{
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{token,login,logout, isAuthReady}}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("AuthContext 未被包在 Provider 中");
    return ctx;
};