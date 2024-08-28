
import { getLoggedInUser } from '@/lib/actions/user.actions';
import NotePages from './NotePages'
// import { PageProvider } from '@/context/NotesContext'
import { MyProvider, useMyContext } from "@/context/MyContext";


const MainPage = async ( {notesData} : any) => {
  const loggedIn = await getLoggedInUser();
  // console.log(loggedIn);

  
  


  return (

<MyProvider>
<NotePages  notesData={notesData} loggedInUserData={loggedIn}/>
</MyProvider>


  )
}

export default MainPage


// const [copy, setCopy] = useState<string>(getCopy('Admin'))
 