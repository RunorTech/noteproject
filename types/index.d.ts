declare type NotesForUsers = {
    $id: number;
    title: string;
    note: string;
    position: string;
    colors: string;
}
declare interface NoteCardProps {
    key: number;
    title: string;
    note: string;
    position: string;
    colors: string;
    object: NotesForUsers;
}

declare interface MapNotes {
    notes: NotesForUsers[],
}

declare interface TextArea {
    textAreaRef?: React.ReactDOM;
    current: React
}

declare interface signInProps {
    email: string;
    password: string;
  }

  declare type SignUpParams = {
    email: string;
    password: string;
  };