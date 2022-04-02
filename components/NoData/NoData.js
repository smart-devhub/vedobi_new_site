import React from "react";
import NoDataImg from "../../assets/images/no-data.webp"

function NoData() {
  return (
    <>
      <div className="no-data">
        <img  src={NoDataImg} alt="No Data Found"  className="img-fluid" />
        <p>Data Not Found.</p>
      </div>
    </>
  );
}

export default NoData;
