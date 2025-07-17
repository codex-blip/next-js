import { FaPlus } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import './SideNav.css';
import { useEffect , useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

export default function SideNav(props) {
  
  const { showNav , setShowNav , noteIds , setNoteIds , handleCreateNote, handleNoteSelection} = props;
  const {logout , currentUser} = useAuth(); // Assuming you have a logout function passed as a prop
  
  const ref = useRef();
  const router = useRouter();

  async function deleteNote(noteId) {
    try{
      const notesRef = doc(db,'users',currentUser.uid,'notes',noteId);
      await deleteDoc(notesRef);
      return setNoteIds(prevIds => prevIds.filter(id => id !== noteId));
    }catch (err) {
      console.error("Error deleting note:", err);
    }finally {
      // Cleanup or final actions
    }
  }
  
  useEffect(() => {
    // this is the code block that get executed when our ref changes
    function handleClickOutsideOutside(e){
      if (ref.current && !ref.current.contains(e.target)){
        setShowNav(false);
      }
    }
    document.addEventListener('mousedown',handleClickOutsideOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOutside);
    }
  } ,[ref])
  
  useEffect(() => {
    if (!currentUser){
      return;
    }

    async function fetchIndexes(){
      try{
        const notesRef = collection(db, 'users' , currentUser.uid , 'notes');
        const snapshot = await getDocs(notesRef);
        const notesIndexes = snapshot.docs.map(doc => doc.id);
        setNoteIds(notesIndexes);
      }catch (err) {
        console.error("Error fetching note IDs:", err);
      }finally{

      }
    }
    fetchIndexes();
  }, [currentUser])

  return (
    <section ref = {ref} className={"nav "+(showNav?'':' hidden-nav ')}>
      <h1 className="text-gradient" id='notes-nav-title'>
        NotesNest
      </h1>
      <h6>
        Your thoughts, organized. Your ideas, unleashed.
      </h6>
      <div className="full-line"></div>
      <button onClick={handleCreateNote}>
        <h6>New Note</h6>
        <FaPlus style={{ marginLeft: "8px" }} />
      </button>
      <div className="notes-list">
        {noteIds.length == 0 ? (
          <p>No notes yet. Click "New Note" to create your first note.</p>
        ) : (
          noteIds.map((note, idx) => {
            const [n , d] = note.split('__');
            const date = (new Date(parseInt(d))).toString();
            return (
              <button 
              onClick={() => handleNoteSelection(note)}
              className="card-button-secondary 
              list-btn" key={idx}>
                <p>{n}</p>
                <small>{date.split(' ').slice(1, 4).join(' ')}</small>
                <div className="delete-btn" onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note);
                }}>
                  <FaTrash />
                </div>
              </button>
            )
          })
        )}
      </div>
      <div className="full-line"></div>
      <button onClick={logout}>
        <h6>Log Out</h6>
        <FaSignOutAlt style={{ marginLeft: "8px" }} />
      </button>
    </section>
  )}
