import React from "react";
import { Link } from "react-router-dom";
import {cardDelete} from "../../utils/utils";

function CardList({history, deck, setDeckList}) {
    if (!deck) {return null}

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

    let CardListDisplay = deck.cards.map(CardLister)

    return <div>{CardListDisplay}</div>
}

export default CardList;