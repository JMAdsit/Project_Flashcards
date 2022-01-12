import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import CardList from "../Cards/CardList";
import {readDeck} from "../../utils/api/index";
import {deckDelete} from "../../utils/utils";

function Deck({history, setDeckList}) {
    //Get deck id from parameters
    let {deckId} = useParams();
    let [deck, setDeck] = useState();

    //Get deck info
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    if(!deck) { return <p>Loading...</p> }

    return  <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item" aria-current="page">{deck.name}</li>
            </ol>
        </nav>
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">Edit</Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
            <button onClick={() => deckDelete(history, setDeckList, deckId)} className="btn btn-danger">Delete</button>
            </div>
        </div>
        <CardList history={history} deck={deck} setDeckList={setDeckList} />
    </div>

}

export default Deck;