import React, {useState, useEffect} from "react";
import { Route, Switch, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Study from "./Decks/Study";
import Deck from "./Decks/Deck";
import Edit from "./Decks/Edit";
import AddCard from "./Decks/Cards/AddCard";
import EditCard from "./Decks/Cards/EditCard";
import {listCards} from "../utils/api/index";

function Decks({deckList, deckDelete, cardDelete, deckEdit, addCard, editCard}) {
    let {deckId} = useParams();
    
    let [currentDeckCards, setCurrentDeckCards] = useState([]);

    //Get cards for current deck
    useEffect(() => {
        const abortController = new AbortController();
        
        async function loadCards() {
        try {
            const response = await listCards(deckId)
            setCurrentDeckCards(response);
        } catch (error) {
            if (error.name === "AbortError") {
            console.log("Aborted");
            }
        }
        }
        
        loadCards();
        return () => abortController.abort();
    }, [deckList]);


    return <Switch>

        <Route exact path="/decks/:deckId">
            <Deck 
            deckList={deckList} 
            currentDeckCards={currentDeckCards} 
            deckDelete={deckDelete} 
            cardDelete={cardDelete} 
            />
        </Route>

        <Route exact path={`/decks/:deckId/study`}>
            <Study />
        </Route>

        <Route exact path={`/decks/:deckId/edit`}>
            <Edit deckEdit={deckEdit} />
        </Route>

        <Route exact path={`/decks/:deckId/cards/new`}>
            <AddCard addCard={addCard} />
        </Route>

        <Route path={`/decks/:deckId/cards/:cardId/edit`}>
            <EditCard editCard={editCard} />
        </Route>

        <Route><NotFound /></Route>
    </Switch>
}

export default Decks;