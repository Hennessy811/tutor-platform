import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { createContainer } from "unstated-next";
import { User } from "../../shared/interfaces/user";
import { BACKEND_URL } from "../../shared/utils/config";

const useAuth = () => {
    const [data, setData] = useState<User | null>(null);
    const [token, setToken] = useLocalStorage<string>('jwt', "", {raw: true});

    useEffect(() => {
        if (token) {
            fetch(`${BACKEND_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(r => r.json()).then(r => setData(r))
        }
    }, [token])

    const login = (search: string) => {
        return fetch(`${BACKEND_URL}/auth/google/callback${search}`)
        .then((r) => {
          if (r.status !== 200) {
            throw new Error(`Couldn't login to Strapi. Status: ${r.status}`);
          } else {
            return r;
          }
        })
        .then((res) => res.json())
        .then((res) => {
          setToken(res.jwt);
            return true;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const logout = () => {
        setToken("");
        setData(null)
    };

    return { data, token, login, logout };
}

export const Auth = createContainer(useAuth);