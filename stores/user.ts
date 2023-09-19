import { userModel, usersModel } from '~/models/userModel'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: {} as usersModel,
        user: {} as userModel,
    }),
    getters: {
        getUsers: (state) => state.users,
        getUser: (state) => state.user,
    },
    actions: {
        setUserClear() {
            this.user = {} as userModel
        },
        async changePassword(
            oldPassword: string | null,
            newPassword: string | null,
        ) {
            try {
                const { data } = await useServer(`users/change-password`, {
                    method: 'PATCH',
                    body: {
                        oldPassword,
                        newPassword,
                    },
                })
                const response: any = data?.value
                if (response.success) {
                    return true
                }
                return false
            } catch (error) {
                return false
            }
        },
        async resetPassword(id: number | null, pwd: string | null) {
            try {
                const { data } = await useServer(`users/reset-password`, {
                    method: 'PATCH',
                    body: {
                        userId: id,
                        password: pwd,
                    },
                })
                const response: any = data?.value
                console.log(response)
                if (response.success) {
                    return true
                }
                return false
            } catch (error) {
                return false
            }
        },
        async updateUser(id: number, body: any) {
            try {
                const { data } = await useServer(`users/${id}`, {
                    method: 'PUT',
                    body,
                })
                const response: any = data?.value
                if (response.success) {
                    return true
                }
            } catch (error) {
                return false
            }
        },
        async setUsers(param: any) {
            const params = JSON.parse(JSON.stringify(param))
            if (!params.departmentId) {
                delete params.departmentId
            }
            if (!params.roleId) {
                delete params.roleId
            }
            if (!params.institutionId) {
                delete params.institutionId
            }
            try {
                const { data } = await useServer('users', {
                    method: 'GET',
                    params,
                })
                const response: any = data?.value
                if (response.success) {
                    this.users = response?.data as usersModel
                }
            } catch (error) {
                console.log({ errorssss: error })
            }
        },
        async setUser(id: number) {
            try {
                const { data } = await useServer(`users/${id}`, {
                    method: 'GET',
                })
                const response: any = data?.value
                // console.log('response:', response)
                if (response.success) {
                    this.user = response?.data as userModel
                }
            } catch (error) {}
        },
    },
})
