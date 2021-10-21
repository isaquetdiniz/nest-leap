import { UserError } from '@/domain/errors'

type UserInput = {
    id: string,
    isAdmin: boolean,
    name: string,
    email: string,
    profileImageUrl?: string
}

class User {
  private readonly id: string
  private readonly isAdmin: boolean
  private readonly enabled: boolean
  private readonly name: string
  private readonly email: string
  private readonly profileImageUrl?: string | null
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor (createUserParams: UserInput) {
    const { id, isAdmin, name, email, profileImageUrl } = createUserParams

    if (id === null || id === undefined) {
      throw new UserError('ID is not passed')
    }

    if (isAdmin === null || isAdmin === undefined) {
      throw new UserError('isAdmin is not passed')
    }

    if (name === null || name === undefined) {
      throw new UserError('Email is not passed')
    }

    this.id = id
    this.isAdmin = isAdmin
    this.name = name
    this.email = email
    this.profileImageUrl = profileImageUrl || null
    this.enabled = true
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export { User, UserInput }
