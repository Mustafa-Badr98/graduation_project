import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import Rate from "rsuite/Rate";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ChangeFlagAction } from "../../store/actions/changeFlagAction";
const texts = {
  0: "No rate yet",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const RatePopUpComponent = (props) => {
  const dispatch = useDispatch();

  const userInSession = useSelector((state) => state.currentUSER.currentUser);
  const flag = useSelector((state) => state.Flag.flag);

  let title = props.title;
  let user_to_rate = props.user;
  const [hoverValue, setHoverValue] = useState(2);

  const handleHoverChange = (value) => {
    setHoverValue(value);
  };

  const handleRateChange = (value) => {
    setHoverValue(value);
    let data = {
      user_id: user_to_rate.id,
      rated_by_id: userInSession.id,
      rate: value,
    };
    console.log(data);
    try {
      axios
        .post("http://127.0.0.1:8000/api/rate/", data)
        .then((res) => console.log(res));
    } catch (error) {}
    // setHoverValue(value)
    // Handle the rate change (when the user clicks on a rate)
    // You can perform any actions based on the selected rate value here
    console.log("Selected Rate:", value);
    dispatch(ChangeFlagAction(flag + 1));
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
          <Rate
            style={{ width: 120 }}
            onChange={handleRateChange}
            defaultValue={hoverValue}
          />
          <span className="fs-6 ms-2">{texts[hoverValue]}</span>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {/* Using React Bootstrap's Popover component */}
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button
          style={{
            width: "6.3em",
            height: "2.5rem",
            backgroundColor: "chocolate",
            border: "0",
          }}
          className="ms-2 mt-2"
        >
          {title}
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default RatePopUpComponent;
