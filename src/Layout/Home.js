import React from "react";
import { Link } from "react-router-dom";
import DeckDisplayList from "../components/Decks/DeckDisplayList.js"

function Home({history, deckList, setDeckList}) {
    //Render create deck button and display list of decks
    return <div>
        <Link className="btn btn-secondary" to="/decks/new">Create Deck</Link>        
        <DeckDisplayList  
            history={history}
            deckList={deckList}
            setDeckList={setDeckList} />
        </div>
}

export default Home;