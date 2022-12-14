import { createContext, useState } from "react";

export const userContext = createContext({
    user: {
        id: 1, 
        username: "test",
        email: "test@h.com",
        password: "password",

        name: "test_name",
        surname: "test_surname",
        age: 2
    }
})

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const adminContext = createContext({
    admin: {
        adminid: 1, 
        adminusername: "test",
        adminemail: "test@h.com",
    }
})

export const AdminProvider = ({children}) => {
    const [admin, setAdmin] = useState(null)

    return (
        <adminContext.Provider value={{admin, setAdmin}}>
            {children}
        </adminContext.Provider>
    )
}