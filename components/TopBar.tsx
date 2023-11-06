'use client'

import { FC } from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import UserAvatar from './UserAvatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface TopBarProps {}

const TopBar: FC<TopBarProps> = ({}) => {
  return (
    <div className='h-[72px] border-b flex items-center px-4 gap-4 group'>
      <div className='relative flex-1 focus-within:-translate-y-0.5 transition-transform'>
        <div className='absolute top-3 left-3'>
          <SearchIcon className='w-4 h-4 text-zinc-400' />
        </div>
        <Input
          className='bg-zinc-800/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:placeholder:text-transparent px-10 duration-1000 text-zinc-200 transition-transform'
          placeholder='Search...'
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar className='w-10 h-10 cursor-pointer' onClick={() => {}} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-zinc-900 min-w-[208px]'>
          <DropdownMenuLabel>
            <div className='flex flex-col'>
              <div>Sign in as</div>
              <div>zoey@mail.com</div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Hi there</DropdownMenuItem>
          <DropdownMenuItem>Hi there</DropdownMenuItem>
          <DropdownMenuItem>Hi there</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='text-rose-500 focus:text-rose-500'>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default TopBar
