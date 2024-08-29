import React from 'react'
import Plus from './ui/Plus'
import Colors from '@/lib/colors.json'
import { createNote, getUserDocumentId } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import { handleAddNoteUtils } from '@/lib/utils'

const AddButton = ( {userid} : any) => {
  
const handleAddNote = () => {
  handleAddNoteUtils(userid)
}

  return (
    <div id="add-btn" onClick={handleAddNote} >
      <Plus  />
    </div>
  )
}

export default AddButton
