"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { getUserDocument } from "./note.actions";


const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_NOTE_COLLECTION_ID: NOTE_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({userId} : any) => {

  try {
 

    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }

}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const response = await getUserInfo( {userId: session.userId})

    return parseStringify(session);

  } catch (error) {
    console.error('Error', error)
  }
}

export const signUp = async ({ email, password }: SignUpParams) => {
  let newUserAccount;
  try {
    const { account, database } = await createAdminClient();
    newUserAccount = await account.create(ID.unique(), email, password);

    if (!newUserAccount) throw new Error('error creating user');

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
       email: email,
       password: password,
       userId: newUserAccount.$id
      }
    )

    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    console.log("sign-up")
    createNote(newUser.$id);
    return parseStringify(newUser);
  } catch (error) {
    console.log(error)
    console.debug()
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({userId: result.$id});
    // console.log(user)
    return parseStringify(result);
  } catch (error) {
    console.log(error)

    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete('appwrite-session');

    await account.deleteSession('current');
  } catch (error) {
    return null;
  }
}

export const getUserDocumentId = async ( userid : any ) => {
  const { database } = await createAdminClient();
  const user = await database.listDocuments(
    DATABASE_ID!,
    USER_COLLECTION_ID!,
    [Query.equal('userId', [userid])]
  )

  createNote(user.documents[0].$id)
}

export const createNote = async (userid : any) => {
  try {
    const { database } = await createAdminClient();

    // console.log();
    const colorsToString = parseStringify({
      id: "color-blue",
      colorTitle: "#3a5c77",
      colorHeader: "#9BD1DE",
      colorBody: "#A6DCE9",
      colorText: "#18181A",
  })
   const colors = JSON.stringify(colorsToString)
  
    
    const notes = await database.createDocument(
      DATABASE_ID!,
      NOTE_COLLECTION_ID!,
      ID.unique(),
      
      {
        title: " New Note",
        note: "welcome to note app",
        position: "{ x: 123, y: 89 }",
        colors: colors,
        userId: userid
        
      }
    )

   

    return parseStringify(notes);
  } catch (error) {
    console.log(error);
  }
}

export const saveData = async ({ noteId , payload} : any)  => {

  // const noteID = noteId;
  const { title, note, position, color} = payload;
  try {
    const { database } = await createAdminClient();

    
const result = await database.updateDocument(
   DATABASE_ID!, // databaseId
   NOTE_COLLECTION_ID!, // collectionId
   noteId, // documentId
  {
    title: title,
    note: note,
    position: position,
    colors : color,

  }, // data (optional)
);
  } catch (error) {
    console.log(error);
  }
}

export const deleteNote = async (noteId: any) => {
  
 try {
  const { database } = await createAdminClient();
  const result = await database.deleteDocument(
    DATABASE_ID!, // databaseId
    NOTE_COLLECTION_ID!, // collectionId
    noteId, // documentId
);


 } catch (error) {
  console.log(error);
 }
}