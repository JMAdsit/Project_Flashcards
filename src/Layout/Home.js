import React from "react";
import { Link } from "react-router-dom";
import DeckDisplayList from "../components/DeckDisplayList.js"

function Home({history, deckList, setDeckList}) {
    return <div>
        <Link className="btn btn-secondary" to="/decks/new">Create Deck</Link>        
        <DeckDisplayList  
            history={history}
            deckList={deckList}
            setDeckList={setDeckList} />
        </div>
}

export default Home;