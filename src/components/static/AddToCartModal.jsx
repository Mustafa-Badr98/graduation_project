import React from "react";
const AddToCartModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="addToCartModal"
        tabindex="-1"
        aria-labelledby="addToCartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title text-center" id="addToCartModalLabel">
                item Added To Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCartModal;
