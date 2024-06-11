import { useState } from 'react';
import { useCookies } from 'react-cookie';

export const useAuth = () => {
    const [cookies, setCookie] = useCookies(['token']);
    const [error, setError] = useState(false);
    const loginToken = cookies.login && cookies.login;

    if(!loginToken){
        setError(true);
    }

    return [loginToken, error]
}
