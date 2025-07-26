import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export const PrivateRoute = ({children} : {children:React.ReactNode})=>{
    const {token, isAuthReady} = useAuth();
    if(!isAuthReady) return null;
    return token ? <>{children}</> : <Navigate to="/login"/>;
};