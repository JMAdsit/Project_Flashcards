import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck} from "../../utils/api/index";

function Study() {

    //Get deck id from parameters
    let {deckId} = useParams();

    //Declare deck and card states
    let [deck, setDeck] = useState();
    let [flipped, setFlipped] = useState("front");
    let [index, setIndex] = useState(0);
    const history = useHistory();

    //Get deck from API
    useEffect(() => {
        const abortController = new AbortController();
        
        async function loadDeck() {
        try {
            const response = await readDeck(deckId)
            setDeck(response);
        } catch (error) {
            if (error.name === "AbortError") {
            console.log("Aborted");
            }
        }
        }
        
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);
    
    //Loading check
    if (!deck) { return <p>Loading...</p>}

    //Check for enough cards
    if (deck.cards.length < 3) {

        let cardCount = `There are ${deck.cards.length} cards in this deck.`;

        if (deck.cards.length === 1) {
            cardCount = "There is 1 card in this deck.";
        }


        return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <div className="card">
            <div className="card-body">
                <h2>{deck.name}: Study</h2>
                <h5>Not Enough Cards.</h5>
                <p>You need at least 3 cards to study. {cardCount}</p>
                <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>Add Cards</Link>
            </div>
        </div>
        </div>
    }

    //Handle flip button press
    function handleFlip(event) {
        event.preventDefault();
        setFlipped((flipped) => {
            if(flipped === "front") {
                return "back";
            } else {
                return "front";
            }
        })
    }

    //Handle next button press
    function handleNext(event) {
        event.preventDefault();
        if (index === deck.cards.length -1) {
            if (window.confirm("Restart cards? Click 'cancel' to return to the home page")) {
                setIndex(0);
                setFlipped(() => "front");
            } else {
                history.push("/");
            }
        } else {
        setIndex(() => index + 1);
        setFlipped(() => "front");
        }
    }
    
    //Hide/reveal next button based on flipped state
    let nextButton =  <button className="btn btn-primary" onClick={handleNext}>Next</button>;
    if (flipped === "front") {
        nextButton = null;
    }

    //Show front or back, based on state
    let cardFace = deck.cards[index].front;
    if (flipped === "back") {
        cardFace = deck.cards[index].back;
    }

    //render study page with breadcrumbs
    return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Study: {deck.name}</h2>
            <div className="card">
                <div className="card-body">
                    <h4>Card {index + 1} of {deck.cards.length}</h4>
                    <p>{cardFace}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    {nextButton}
                </div>
            </div>
        </div>
}

export default Study;