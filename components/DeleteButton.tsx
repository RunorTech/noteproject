import React, { useRef } from 'react'
import Trash from './ui/Trash'
import { deleteNote } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({noteId} : any) => {
  const router = useRouter();

    const handleDelete = () => {
        deleteNote(noteId);
        console.log(noteId);
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
