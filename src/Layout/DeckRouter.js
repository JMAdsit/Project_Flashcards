import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Study from "../components/Decks/Study";
import Deck from "../components/Decks/Deck";
import Edit from "../components/Decks/Edit";
import AddCard from "../components/Cards/AddCard";
import EditCard from "../components/Cards/EditCard";

function DeckRouter({history, setDeckList}) {

    return <Switch>

        <Route exact path="/decks/:deckId">
            <Deck 
            history={history}
            setDeckList={setDeckList}
            />
        </Route>

        <Route exact path={`/decks/:deckId/study`}>
            <Study />
        </Route>

        <Route exact path={`/decks/:deckId/edit`}>
            <Edit 
            setDeckList={setDeckList} 
            />
        </Route>

        <Route exact path={`/decks/:deckId/cards/new`}>
            <AddCard setDeckList={setDeckList} />
        </Route>

        <Route path={`/decks/:deckId/cards/:cardId/edit`}>
            <EditCard 
            history={history}
            setDeckList={setDeckList} />
        </Route>

        <Route><NotFound /></Route>
    </Switch>
}

export default DeckRouter;