import React from "react";

const TabsMeta = ({
  activeTab,
  isLeftArrowDisapled,
  isRightArrowDisapled,
  selectedTabCoor,
  isRTL,
}) => {
  return (
    <div className="row my-3">
      <ul className="list-group list-group-flush col-md-6">
        <li className="list-group-item">
          reached the start of tabs container :{" "}
          <span className="badge bg-primary">
            {" "}
            {isLeftArrowDisapled ? "true" : "false"}
          </span>
        </li>
        <li className="list-group-item">
          selected tab index :{" "}
          <span className="badge bg-primary"> {activeTab}</span>
        </li>
        <li className="list-group-item"></li>
      </ul>
      <ul className="list-group list-group-flush col-md-6">
        <li className="list-group-item">
          reached the end of tabs container :{" "}
          <span className="badge bg-primary">
            {" "}
            {isRightArrowDisapled ? "true" : "false"}
          </span>
        </li>
        <li className="list-group-item">
          selected tab coordinate :{" "}
          <span className="badge bg-primary">
            width: {selectedTabCoor?.width}
          </span>
          <span className="badge bg-primary mx-2">
            {" "}
            {isRTL ? "right" : "left"}{" "}
            {isRTL ? selectedTabCoor?.right : selectedTabCoor?.left}
          </span>
        </li>
        <li className="list-group-item"></li>
      </ul>
    </div>
  );
};

export default TabsMeta;
