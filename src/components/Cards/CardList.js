import React from "react";
import { Link } from "react-router-dom";
import {cardDelete} from "../../utils/utils";

function CardList({history, deck, setDeckList}) {
    //render nothing until a deck is supplied from backend
    if (!deck) {return null}

    //renderer for individual cards
    function CardLister(card) {
        return <div key={card.id} className="card-group">
            <div className="card">
                <p>{card.front}</p>
            </div>
            <div className="card">
                <p>{card.back}</p>
                <div>
                    <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                    <button onClick={() => cardDelete(history, setDeckList, card.id)} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    }

    //render all cards in deck
    let CardListDisplay = deck.cards.map(CardLister)

    return <div>{CardListDisplay}</div>
}

export default CardList;