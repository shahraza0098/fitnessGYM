import React from 'react'
import Formnotify from './notifications/_components/Formnotify'
import {  UserButton } from '@clerk/nextjs'

function HomePage() {
  return (
    <div>
      <h1 className='text-gray-800'>Dashboard</h1>
      <Formnotify/>
      {/* add clerk user button */}
<UserButton/>
    </div>
  )
}

export default HomePage
