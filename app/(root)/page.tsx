import React from "react"
import MainPage from "@/components/MainPage"
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { getUserDocument, getUserNoteDocuments } from "@/lib/actions/note.actions";
import { useMyContext } from "@/context/MyContext";






const HomePage =  async () => {
  const loggedInUser =  await getLoggedInUser();
  if(!loggedInUser) redirect('/sign-in')

    const userid = loggedInUser.$id;

    const notesValue = await getUserDocument(userid);
    
  


  
  return (
        <main>
            <MainPage notesData={notesValue}/>
        </main>
  )
}

export default HomePage
