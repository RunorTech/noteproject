import { Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { bodyParser, parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_NOTE_COLLECTION_ID: NOTE_COLLECTION_ID,
  } = process.env;



  export const getUserDocument = async ( userid : any ) => {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userid])]
    )
  
    return  getUserNoteDocuments(user.documents[0].$id)
  }

export const getUserNoteDocuments = async ( userid : any ) => {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      DATABASE_ID!,
      NOTE_COLLECTION_ID!,
      [Query.equal('userId', [userid])]
    )
   
    return bodyParser(user);
  }