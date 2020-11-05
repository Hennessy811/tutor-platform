import { useLocalStorage } from "react-use";

export const useAuth = () => {
    const [token, setToken] = useLocalStorage<string>('jwt', "", {raw: true});
    const [username, setUsername] = useLocalStorage<string>('username', "", {raw: true});

    return {token, username, setToken, setUsername}
}