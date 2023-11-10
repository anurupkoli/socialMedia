import React from "react";
import "./rightBarAdd.css";
import CakeIcon from "@mui/icons-material/Cake";

export default function RighBarAdd() {
  return (
    <>
      <div className="rightBarTop">
        <div className="rightBarBirthday">
          <span>
            <CakeIcon  id="cakeIcon" />
          </span>
          <span>
            <b>Prajwal Latur</b> and <b>4 other friends</b> have a brithday
            today
          </span>
        </div>
        <div className="addContainer">
            <img src="images/pumaAdvertisement.jpg" alt="" />
        </div>
        
        <h3>Online Friends</h3>
      </div>
    </>
  );
}
