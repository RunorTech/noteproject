import React from 'react'
import Plus from './ui/Plus'
import Colors from '@/lib/colors.json'
import { createNote, getUserDocumentId } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

const AddButton = ( {userid} : any) => {
  
  const router = useRouter();
  

const handleAddNote = async () => {
 

 const NewAddedNote = await getUserDocumentId(userid);
 window.location.href = window.location.href;
}


  return (
    <div id="add-btn" onClick={handleAddNote} >
      <Plus  />
    </div>
  )
}

export default AddButton
