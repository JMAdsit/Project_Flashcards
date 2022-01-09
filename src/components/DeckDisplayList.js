import React from "react";
import {Link} from "react-router-dom";
import {deckDelete} from "../utils/utils";

function DeckDisplayList({history, deckList, setDeckList}) {
    //Define deck display function
    function DeckDisplay(deck) {

        return <div key={deck.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text"><small className="text-muted">{deck.cards.length} cards</small></p>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
            <button onClick={() => deckDelete(history, setDeckList, deck.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      }

    //Map deck list and return it
    let DeckCardsDisplay = deckList.map(DeckDisplay);
    return <div>{DeckCardsDisplay}</div>
}

export default DeckDisplayList;