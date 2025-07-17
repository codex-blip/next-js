import React from 'react'
import { FaBars } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function TopNav(props) {
    const {isViewer , handleToggleViewer , handleToggleNav , handleSaveNote , savingNote} = props;
  return (
    <>
    <div className="notes-btn">
          <button className="card-button-primary menu" onClick={handleToggleNav} id = "toggle-nav"> 
              <FaBars style={{ marginRight: "8px" }} />
          </button>
          <button className="card-button-secondary" disabled={savingNote} onClick={handleSaveNote}>
              <h6>{!savingNote ? 'Save' : 'Saving...'}</h6>
              <FaSave style={{ marginRight: "8px" }} />
          </button>
          <button onClick={handleToggleViewer} className="card-button-secondary">
              {isViewer ?
              <><h6>Editor</h6> 
              <FaEdit style={{ marginRight: "8px" }} /></>:
              <><h6>Viewer</h6>
              <FaEye style={{ marginRight: "8px" }} /></>}
          </button>
      </div>
      <div className="full-line"></div></>
  )
}
