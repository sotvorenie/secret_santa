import {User} from "@/types/user.ts";

import {apiGet, apiPatch} from "@/api";

export const UserService = {
    getUsers(): Promise<User[]> {
        return apiGet('/users')
    },

    updateUser(
        user: User,
    ): Promise<void> {
        return apiPatch(`/users/${user.id}`, user)
    },

    checkUser(
        id: number,
    ): Promise<{isChosen: boolean}[]> {
        const params = new URLSearchParams({
            id: String(id),
            _select: 'isChosen'
        })

        return apiGet(`/users?${params}`)
    },
}