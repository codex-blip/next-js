'use client';
import Editor from "@/components/Editor";
import Nest from "@/components/Nest";
import SideNav from "@/components/SideNav";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/firebase"; // Make sure db is imported from your firebase config

export default function NotesPage() {
    const [isViewer, setIsViewer] = useState(true);

    //const [text, setText] = useState("");
    const [showNav, setShowNav] = useState(false);
    const [note , setNote] = useState(
      {
        content : ''
      }
    )
    const [noteIds,setNoteIds] = useState([]);
    const [savingNote, setSavingNote] = useState(false);
    const {currentUser , isLoadingUser} = useAuth();

    function handleToggleViewer() {
        return setIsViewer(!isViewer);
    }

    function handleToggleNav() {
        return setShowNav(!showNav);
    }

    function handleCreateNote(){
        // Logic to create a new note
        setIsViewer(false);
        return setNote({content:''})
    }

    function handleEditNote(e) {
        // Logic to edit a note
        return setNote({...note, content: e.target.value});
    }

    async function handleSaveNote(){
        if (!note?.content) {
          return
        }
        setSavingNote(true);

        try{
          if (note.id){
            const notesRef = doc(db,'users',currentUser.uid,'notes',note.id)
            await setDoc(notesRef , {
              ...note},
              {merge : true}
            ); 

          } else {
            const newId = note.content.slice(0, 15) + '__' + Date.now();
            const notesRef = doc(db, 'users', currentUser.uid, 'notes', newId);
            const newDocInfo = await setDoc(notesRef, {
              content: note.content,
              createdAt: serverTimestamp()
            });
            setNote({...note,id:newId});
            setNoteIds(prevNoteIds => [...prevNoteIds, newId]); // This is the line I will add
            return
          }
          }catch (err) {
            console.error("Error saving note:", err);
        }finally {
            setSavingNote(false);
        }
    }

    async function handleNoteSelection(noteId) {
        try {
            const noteRef = doc(db, 'users', currentUser.uid, 'notes', noteId);
            const noteSnap = await getDoc(noteRef);
            if (noteSnap.exists()) {
                const noteData = noteSnap.data();
                setNote({ id: noteId, content: noteData.content });
                setIsViewer(true);
            } else {
                console.log("No such document!");
            }
        } catch (err) {
            console.error("Error fetching note:", err);
        }
    }
    
      
      if (isLoadingUser){
        return <h6 className="text-gradient">Loading...</h6>
      }
    
    
      if (!currentUser){
        window.location.href = '/';
      }
    

    return(
        <main id="notes">
            <SideNav showNav = {showNav} setShowNav = {setShowNav} 
                      noteIds = {noteIds} setNoteIds = {setNoteIds} handleCreateNote = {handleCreateNote}
                      handleNoteSelection={handleNoteSelection}/> 
            {!isViewer && (<Editor  
              text = {note.content} setText = {handleEditNote} isViewer = {isViewer} 
              handleToggleViewer = {handleToggleViewer} handleToggleNav = {handleToggleNav} handleSaveNote = {handleSaveNote} savingNote = {savingNote} />)}
            {isViewer &&  (<Nest 
            text = {note.content} isViewer = {isViewer} handleToggleViewer = {handleToggleViewer}  
            handleToggleNav = {handleToggleNav} handleSaveNote = {handleSaveNote} savingNote = {savingNote}/>)}
        </main>
    );

}