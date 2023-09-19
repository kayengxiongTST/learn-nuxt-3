import { departmentModel } from './departmentModel'
import { institutionModel } from './institutionModel'
import { roleModel } from './roleModel'
import { divisionModel } from './divisionModel'

interface FirstName {
    la: string | null
    en: string | null
}
interface LastName {
    la: string | null
    en: string | null
}

export interface userModel {
    id: number | null
    name: string | null
    firstName: FirstName
    lastName: LastName
    email: string | null
    phoneNumber: string | null
    profile: string | null
    position: string | null
    username: string | null
    gender: string | null
    isDelete: boolean
    roleId: number | null
    divisionId: number | null
    division: divisionModel | null
    birthday: string | null
    departmentId: number | null
    institutionId: number | null
    createdAt?: Date | null
    updatedAt?: Date | null
    deletedAt?: Date | null
    department: departmentModel | null
    role: roleModel | null
    institutions: institutionModel | null
    password: string | null
}

export interface usersModel {
    pageCount: number | null
    totalCount: number | null
    rows: userModel[]
}
