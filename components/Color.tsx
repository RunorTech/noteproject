// import { useGlobalContext } from '@/context/NotesContext';
import React, { useRef } from 'react'
import { useMyContext } from '@/context/MyContext'
import { saveData } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation'

const Color = ({color, notes }: any) => {
  const { selectedNote } = useMyContext();
  const router = useRouter();
  
  

  const handleColorChange = () => {
    const noteId = selectedNote.$id
    const colorString = JSON.stringify(color)
    const payload = {
      color: colorString
    }

    saveData({noteId, payload});
    window.location.href = window.location.href;
  }
  return (
    <div  onClick={handleColorChange} className='color' style={{backgroundColor: color.colorHeader}}>
      
    </div>
  )
}

export default Color
