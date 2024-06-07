import { useCookies } from 'react-cookie';

export const useAuth = () => {

    const [cookies, setCookie] = useCookies(['token']);
    const isLogin = cookies.login && cookies.login;


    return [isLogin]
}
