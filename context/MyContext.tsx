"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Spinner from "@/components/ui/Spinner";
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getUserDocument } from '@/lib/actions/note.actions';

// Define the shape of your context's state
interface MyContextType {
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    selectedNote: any;
    setSelectedNote: React.Dispatch<React.SetStateAction<any>>;
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
  }

  // Create a default context
const MyContext = createContext<MyContextType | undefined>(undefined);



// Create a provider component
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedNote, setSelectedNote] = useState();
    const [userData, setUserData] = useState<any>('')
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        init();
        }, []);
        
          const init = async () => {
            const userDataDB = await getLoggedInUser();
             setUserData(userDataDB);
            setLoading(false);
          };

          
          const [value, setValue] = useState<any>([]);
        
  
    return (
      <MyContext.Provider value={{ value, setValue, selectedNote, setSelectedNote, userData, setUserData }}>
      {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            ) }
      </MyContext.Provider>
    );
  };
  
  // Create a custom hook for accessing the context
  export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
  };