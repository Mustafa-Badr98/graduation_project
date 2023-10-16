import React from "react";

const ContactEmailSellerButton = (props) => {
  const userEmail = props.email;
  console.log(userEmail)
  const handleContactSeller = () => {
    const subject = "Interested in Your Listing";
    const body = "Hello, I am interested in your listing.";

    const mailtoLink = `mailto:${userEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

  return (
    <button onClick={handleContactSeller} className="btn btn-info">
      <i className="fs-6 fa-solid fa-envelope ms-4 me-4"></i>
      Email
    </button>
  );
};

export default ContactEmailSellerButton;
