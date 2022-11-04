import React, { createContext } from 'react';

const UserContext = createContext({
    user: {},
    setUser: () => {}
});




export { UserContext };