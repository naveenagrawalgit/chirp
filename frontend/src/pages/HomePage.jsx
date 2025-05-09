import React from 'react'
import { useChatStore } from '../store/useChatStore'

export const HomePage = () => {

  const {selectedUser} = useChatStore()

  return (
    <div className="h-screen bg-base-200"></div>
  )
}



