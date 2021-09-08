import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import {readDeck} from "../../../utils/api/index";
import CardForm from "../../../components/CardForm";

function AddCard({addCard}) {
    //Declare deck state and get deck id
    let {deckId} = useParams();
    let [deck, setDeck] = useState();
    let [card, setCard] = useState({
        "front": "",
        "back": ""
      });

    //Handle changes in the form's inputs
    const changeHandler = event => {
        setCard({ ...card, [event.target.name]: event.target.value })
    }

    //Handle submit
    function handleSubmit(card, event) {
        addCard(card, event);
    }

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
    }, [])

    //Wait for deck info to load
    if (!deck) { return <p>Loading...</p>}

    return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <CardForm deck={deck} card={card} changeHandler={changeHandler} handleSubmit={handleSubmit} />
        </div>
}

export default AddCard;