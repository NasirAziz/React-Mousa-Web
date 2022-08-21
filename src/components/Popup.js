import React from "react";
import "./Popup.css";

function Popup({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        {/* <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div> */}
        <iframe src="https://app.acuityscheduling.com/schedule.php?owner=11325084&action=appt&id%5B%5D=96807e46fd2c98bda3f667ea1df2bfa2
"></iframe>
        <div>
        </div>
        {/* <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div> */}
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;