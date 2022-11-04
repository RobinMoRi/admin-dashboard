import React, { createContext, useState, useMemo } from 'react';

const UserContext = createContext(null);

const useUser = () => {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);
    return value;
}



export { UserContext, useUser };