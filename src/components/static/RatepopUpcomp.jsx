import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import Rate from "rsuite/Rate";

const texts = {
  0: "No rate yet",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const RatePopUpComponent = () => {
  const [hoverValue, setHoverValue] = useState(2);

  const handleHoverChange = (value) => {
    setHoverValue(value);
  };

  const handleRateChange = (value) => {
    setHoverValue(value);

    // setHoverValue(value)
    // Handle the rate change (when the user clicks on a rate)
    // You can perform any actions based on the selected rate value here
    console.log("Selected Rate:", value);
  };


  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Rate the Seller : </Popover.Header>
      <Popover.Body>
        <div
          style={{
            display: "block",
            width: 200,
            paddingLeft: 0,
          }}
        >
          <Rate style={{ width: 120 }} onChange={handleRateChange} defaultValue={hoverValue} />
          <span className="fs-6 ms-2">{texts[hoverValue]}</span>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {/* Using React Bootstrap's Popover component */}
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
        <Button style={{width:"5.3em",height:"2.5rem"}} className="ms-2 mt-2" variant="danger">
          Rate
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default RatePopUpComponent;
