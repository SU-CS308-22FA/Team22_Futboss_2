import { createContext, useState } from "react";

export const userContext = createContext({
    user: {
        id: 1, 
        username: "test",
        email: "test@h.com",
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