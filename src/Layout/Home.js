import React from "react";
import { Link } from "react-router-dom";
import DeckDisplayList from "../components/DeckDisplayList.js"

function Home({deckList, deckDelete}) {
    return <div>
        <Link className="btn btn-secondary" to="/decks/new">Create Deck</Link>        
        <DeckDisplayList deckList={deckList} deckDelete={deckDelete} />
        </div>
}

export default Home;