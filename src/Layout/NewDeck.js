import React, {useState} from "react";
import {Link} from "react-router-dom";
import {addDeck} from "../utils/utils";

function NewDeck({history, deckList, setDeckList}) {
    //declare deck state
    let [deck, setDeck] = useState({ "name": "", "decription": ""});

    //Handle changes in the form's inputs
    const changeHandler = event => {
        setDeck({ ...deck, [event.target.name]: event.target.value })
        }


    return <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
        </nav>
        <h2>Create Deck</h2>
        <form onSubmit={(event) => addDeck(history, deckList, setDeckList, deck, event)}>
            <div className="form-group">
            <label for="name">Name
                <input
                required
                className="form-control" 
                id="name"
                name="name" 
                type="text" 
                placeholder="Deck Name"
                value={deck.name}
                onChange={changeHandler}
                />
            </label></div>
            <div className="form-group">
            <label>Description
                <textarea
                required 
                className="form-control" 
                id="description"
                name="description"
                placeholder="Brief description of the deck"
                value={deck.description}
                onChange={changeHandler}  
                />
            </label></div>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default NewDeck;