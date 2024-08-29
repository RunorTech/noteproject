import React, { useRef } from 'react'
import Trash from './ui/Trash'
import { deleteNote } from '@/lib/actions/user.actions';


const DeleteButton = ({noteId} : any) => {

    const handleDelete = () => {
        deleteNote(noteId);
        window.location.href = window.location.href;
        
    }

    const trashRef = useRef<any>()
  return (
    <div ref={trashRef} onClick={handleDelete}>
      <Trash/>
    </div>
  )
}

export default DeleteButton
