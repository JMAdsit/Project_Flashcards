import React from "react";
import {Link} from "react-router-dom";

function CardForm({deck, card, changeHandler, handleSubmit}) {

    //Render form for cards 
    return <form onSubmit={(event) => handleSubmit(card, event)}>
        <div className="form-group">
            <label for="front">Front
                <textarea
                required
                className="form-control" 
                id="front"
                name="front" 
                type="text" 
                value={card.front}
                onChange={changeHandler}
                placeholder="Front side of card"
                />
            </label></div>
        <div className="form-group">
            <label for="back">Back
                <textarea
                required 
                className="form-control" 
                id="back"
                name="back"
                value={card.back}
                onChange={changeHandler}
                placeholder="Back side of card"
                />
            </label>
        </div>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
}

export default CardForm;