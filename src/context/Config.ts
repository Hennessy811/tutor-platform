import useSWR from "swr";
import { createContainer } from "unstated-next";

import { request } from "../shared/utils/api";

import {User} from '../shared/interfaces/user'

const useConfig = () => {
    const { data } = useSWR<User>(
        'https://jsonplaceholder.typicode.com/users/1',
        request,
    );

    return { user: data };
}

export default createContainer(useConfig);