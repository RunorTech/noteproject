'use client'
import NoteCard from './NoteCard'
import ControlPanel from './ControlPanel'
import { getUserDocument, getUserNoteDocuments } from '@/lib/actions/note.actions'
import {  useMyContext } from "@/context/MyContext";
import { useEffect, useState } from 'react';

const NotePages =  ( {notesData , loggedInUserData} : any) => {
   
  const notesForUsers = notesData.documents;
  return (
    <>
    {notesForUsers.map(notes => (
        <NoteCard key={notes.$id} notes={notes}/>
      ))}
      <ControlPanel notes={notesForUsers} userData={loggedInUserData}/>
    </>
  )
}

export default NotePages
