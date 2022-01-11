import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import NewDeck from "./Decks/NewDeck";
import DeckRouter from "./Decks/DeckRouter";
import {listDecks} from "../utils/api";

function Layout() {

  let [deckList, setDeckList] = useState([]);
  const history = useHistory();

  //Get Deck List
  useEffect(() => {
    const abortController = new AbortController();
    
    async function loadDecks() {
      try {
        const response = await listDecks()
        setDeckList(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        }
      }
    }
    
    loadDecks();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>

          <Route exact path="/">
            <Home 
            history={history}
            deckList={deckList}
            setDeckList={setDeckList}
            />
          </Route>

          <Route exact path="/decks/new">
            <NewDeck 
            history={history}
            deckList={deckList}
            setDeckList={setDeckList} />
          </Route>

          <Route path="/decks/:deckId">
            <DeckRouter 
            history={history}
            setDeckList={setDeckList}
            />
          </Route>

          <Route><NotFound /></Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
