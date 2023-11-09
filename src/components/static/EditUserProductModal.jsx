import React from "react";
import EditPageForModal from "./EditPageForModal";

const EditUserProductModal = (props) => {
  const localProductToEdit = props.productObject;

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title " id="staticBackdropLabel">
                Edit Your Ad
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditPageForModal productObject={localProductToEdit} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Submit Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserProductModal;
