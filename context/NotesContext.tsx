// 'use client'
// import { createContext, useContext, useEffect, useState } from "react"
// import Spinner from "@/components/ui/Spinner";
// import { getLoggedInUser } from "@/lib/actions/user.actions";

// export type GlobalContent = {
//   selectedNotes: any
//   setSelectedNotes:(n: any) => void
 
// };

    

// const [selectedNoteState, setselectedNoteState] = useState()

  
// export const MyGlobalContext = createContext<GlobalContent>({
// selectedNotes: selectedNoteState, // set a default value
// setSelectedNotes: setselectedNoteState,
// })
// export const useGlobalContext = () => useContext(MyGlobalContext)

// interface PageProvider{
//     children: React.ReactNode;
// }

// export const PageProvider = ({children} : PageProvider ) => {
 
//     const [document, setDocument] = useState<any | null>(null);

//     let {selectedNotes, setSelectedNotes} = useGlobalContext()
//     const [loading, setLoading] = useState(false);
    
   
//   return (
// <MyGlobalContext.Provider value= {{ selectedNotes, setSelectedNotes}}>
// {loading ? (
//                 <div
//                     style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         height: "100vh",
//                     }}
//                 >
//                     <Spinner size="100" />
//                 </div>
//             ) : (
//                 children
//             ) }

//  </MyGlobalContext.Provider>
//   )
// }