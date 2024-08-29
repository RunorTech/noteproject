'use client'
import { useRef, useState, useEffect, MouseEvent, ChangeEvent, MouseEventHandler, SyntheticEvent } from 'react'
import Trash from './ui/Trash';
import { autoGrow, bodyParser, setNewOffset, setZIndex } from '@/lib/utils';
import { saveData } from '@/lib/actions/user.actions';
// import { useGlobalContext } from '@/context/NotesContext';
import { useMyContext } from '@/context/MyContext';
import DeleteButton from './DeleteButton';
import Spinner from './ui/Spinner';

const NoteCard = ({ notes }: any) => {
    const noteBody = notes.note
    const noteTitle = notes.title
    const [notePosition, setNotePosition] = useState(bodyParser(notes.position)) ;
    const noteColor = bodyParser(notes.colors);
    // let { setSelectedNotes} = useGlobalContext()
    const { setSelectedNote } = useMyContext();
    const [saving, setSaving] = useState<boolean>(false);

    let mouseSartPosition = { x: 0, y: 0 };
    const cardRef = useRef<any>(null);
    const textAreaRef = useRef<any>(null);
    const textAreaTwoRef = useRef<any>(null);
    const keepUpTimerRef = useRef<any>(null);

    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
    }, [])
    // const target = e.target as HTMLDivtElement;

    // const mobileClick = () => {
    //      document.addEventListener("click", mouseDown);
    // }

	const mouseDown  =  (e : MouseEvent)   => {
        // takes the current position of the card
        mouseSartPosition.x = e.clientX;
		mouseSartPosition.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);

        setZIndex(cardRef.current);
      
        setSelectedNote(notes);
    };

    const mouseMove = async (e: any) => {
        // follow up on the moving card position
        const mouseMoveDir = {
			x: mouseSartPosition.x - e.clientX,
			y: mouseSartPosition.y - e.clientY,
		};
// register the new position
        mouseSartPosition.x = e.clientX;
		mouseSartPosition.y = e.clientY;

        const noteNewPosition = setNewOffset(cardRef.current!, mouseMoveDir);
        setNotePosition(noteNewPosition);
    }

    const mouseUp = async () => {
		document.removeEventListener("mousemove", mouseMove);
		document.removeEventListener("mouseup", mouseUp);

		const noteNewPosition = setNewOffset(cardRef.current!);
        const notePosition = JSON.stringify(noteNewPosition)
        const payload = {
            position: notePosition,
        }
        const noteId = notes.$id
        saveData({noteId, payload});
        
		
	};
const handleKeyUp = () => { 
    setSaving(true); 

    const payload = {
        title: textAreaTwoRef.current.value,
        note: textAreaRef.current.value,
    }
    if (keepUpTimerRef.current) {
        clearTimeout(keepUpTimerRef.current);
    }
    keepUpTimerRef.current = setTimeout(() => {
        const noteId = notes.$id
        saveData({noteId, payload})
        handleSavingLoader()
    }, 2000);
}

const handleSavingLoader = () => {
    setTimeout(() => {
        setSaving(false);
    }, 2000);

}


    return (
        <div ref={cardRef} style={{ backgroundColor: noteColor.colorBody, left: `${notePosition.x}px`, top: `${notePosition.y}px` }} className='card'>
            <div className="card-header" onMouseDown={mouseDown} style={{ backgroundColor: noteColor.colorHeader }}>
            <DeleteButton noteId={notes.$id} />
				{saving ? (
					<div className="card-saving">
                        <div className="spinner">
                        <Spinner color={noteColor.colorText} />
                        </div>
						<span style={{ color: noteColor.colorText }}>saving...</span>
					</div>
				) : null}
            </div>
            <div
				className="card-header-title"
				style={{ backgroundColor: noteColor.colorTitle, color: noteColor.colorText }}
			>
				<span>
					<i> Title :</i>
				</span>{" "}
				<textarea
					defaultValue={noteTitle}
					onKeyUp={handleKeyUp}
					ref={textAreaTwoRef}
					maxLength={35}
					name="title"
					id="title"
				></textarea>
			</div>
            <div className="noteCard-body">
                <textarea ref={textAreaRef}
                    style={{ color: noteColor.colorText }}
                    name="" id="note-body" defaultValue={noteBody}
                    onInput={() => {
                        autoGrow(textAreaRef);
                        
                    }}
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
						setZIndex(cardRef.current);
						setSelectedNote(notes);
					
					}}
                ></textarea>
            </div>
        </div>
    )
}

export default NoteCard
