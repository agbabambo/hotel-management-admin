'use client'

import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
}

const UserAvatar: FC<UserAvatarProps> = ({ src, alt = 'avatar', ...props }) => {
  return (
    <Avatar {...props}>
      <AvatarImage alt={alt} src={src} />
      <AvatarFallback>NN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
