import React from "react";

import PlaceInput from '../../shared/components/FormElements/PlaceInput'
import './NewPlace.css'

const NewPlace = () => {
    return <form className="place-form">
        <PlaceInput elementToggle='input' type= "text" label="Title"/>
    </form>;
}
export default NewPlace