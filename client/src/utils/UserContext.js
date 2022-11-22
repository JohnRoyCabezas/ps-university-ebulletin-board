import { createContext, useState, useEffect } from "react";
import UserApi from "../api/UserApi"

const UserContext = createContext(null);

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        UserApi.fetchUser().then(({data}) => {
            if(data.theme===null) setUser({...user ,...data, theme: "bg-regal-blue"});
            else setUser({...user ,...data});
            setLoading(false);
        }).catch((error)=>{
            setLoading(false);
        })
    }, [])

    const setTheme = (theme) => {
        setUser({...user, theme: theme})
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user, setTheme, logout}}>
            {!loading && children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}