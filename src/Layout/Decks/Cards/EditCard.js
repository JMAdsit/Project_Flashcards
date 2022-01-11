import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {readDeck, readCard} from "../../../utils/api/index";
import {editCard} from "../../../utils/utils";
import CardForm from "../../../components/CardForm";

function EditCard({history, setDeckList}) {
    //Declare card state and get card id
    let {deckId, cardId} = useParams();
    let [deck, setDeck] = useState();
    let [card, setCard] = useState();

    //Handle changes in the form's inputs
    const changeHandler = event => {
        setCard({ ...card, [event.target.name]: event.target.value })
        }

    //Handle submit
    function handleSubmit(card, event) {
        editCard(history, setDeckList, card, event);
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
    }, [deckId])

    //Get card info
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const cardResponse = await readCard(cardId);
                setCard(cardResponse);
            } catch (error) {
                console.log(error);
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [cardId])

    //Wait for deck info to load
    if (!deck || !card) { return <p>Loading...</p>}

    return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <CardForm deck={deck} card={card} changeHandler={changeHandler} handleSubmit={handleSubmit} />
        </div>
}

export default EditCard;