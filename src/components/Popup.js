import React from "react";
import "./Popup.css";

function Popup(props ) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              // setOpenModal(false);
              props.setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        {console.log("pp"+props.url)}
        {/* <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div> */}
        <iframe src={props.url} width="500" height="500" ></iframe>
        <div>
        </div>
        {/* <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div> */}
       
      </div>
    </div>
  );
}

export default Popup;