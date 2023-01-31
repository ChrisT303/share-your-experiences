import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/authContext";
import "./PlacesItem.css";

const PlacesItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const openMap = () => setShowMap(true);

  const closeMap = () => setShowMap(false);

  const showDeleteHandler = () => {
    setShowWarningModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowWarningModal(false);
  };

  const deleteConfirmationHandler = () => {
    setShowWarningModal(false);
    console.log("Deleted");
  };

  return (
    <>
      <Modal
        show={showMap}
        onClose={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close</Button>}
      >
        <div className="map_container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showWarningModal}
        onCancel={cancelDeleteHandler}
        header="Warning!"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={deleteConfirmationHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Are you sure you want to permanently delete?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              View On Map
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlacesItem;
