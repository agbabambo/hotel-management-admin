import { Role, User } from '@prisma/client'
import bcrypt from 'bcrypt'

export const users = [
  {
    id: 'user-01',
    name: 'leaf',
    email: 'leaf@mail.com',
    address: 'Earth',
    firstName: 'Leaf',
    lastName: 'Tree',
    password: bcrypt.hashSync('leaf12345', 10),
    phoneNumber: '123456789',
    role: Role.ADMIN,
  },
  {
    id: 'user-01',
    name: 'tree',
    email: 'tree@mail.com',
    address: 'Mars',
    firstName: 'Tree',
    lastName: 'Leaf',
    password: bcrypt.hashSync('tree12345', 10),
    phoneNumber: '123456789',
    role: Role.MEMBER,
  },
]
