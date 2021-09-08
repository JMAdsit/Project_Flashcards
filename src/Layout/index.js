import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import NewDeck from "./NewDeck";
import Decks from "./Decks";
import {listDecks, deleteDeck, deleteCard, updateDeck, createCard, updateCard, createDeck} from "../utils/api/index";

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

  //Handle deck delete
  async function deckDelete(deckId) {
    if(window.confirm("Delete this deck? You will not be able to recover it.")) {
      try {
        await deleteDeck(deckId);
        const response = await listDecks();
        setDeckList(response);
        history.push("/")
      } catch (error) {
        console.log(error);
      }
    }
  }

  //Handle card delete
  async function cardDelete(cardId) {
    if(window.confirm("Delete this card? You will not be able to recover it.")) {
      try {
        await deleteCard(cardId)
        const response = await listDecks()
        setDeckList(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  //Handle add deck
  async function addDeck(deck, event) {
    event.preventDefault();
    try {
      await createDeck(deck);
      const response = await listDecks();
      await setDeckList(response);
      const deckId = deckList.length + 1;
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  }

  //Handle edit deck
  async function deckEdit(updatedDeck, event) {
    event.preventDefault();
    try {
      await updateDeck(updatedDeck);
      const response = await listDecks();
      setDeckList(response);
    } catch (error) {
      console.log(error);
    }
  }

  //Handle add card
  async function addCard(deckId, card, setCard, event) {
    event.preventDefault();
    try {
      await createCard(deckId, card);
      setCard({"front": "", "back": ""})
      const response = await listDecks();
      setDeckList(response);
    } catch (error) {
      console.log(error);
    }
  }

  //Handle edit card
  async function editCard(card, event) {
    event.preventDefault();
    try {
      await updateCard(card);
      const response = await listDecks();
      setDeckList(response);
      history.push(`/decks/${card.deckId}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <Switch>

          <Route exact path="/">
            <Home 
            deckList={deckList} 
            deckDelete={deckDelete}
            />
          </Route>

          <Route exact path="/decks/new">
            <NewDeck addDeck={addDeck} />
          </Route>

          <Route path="/decks/:deckId">
            <Decks 
            deckList={deckList} 
            deckDelete={deckDelete} 
            cardDelete={cardDelete} 
            deckEdit={deckEdit}
            addCard={addCard}
            editCard={editCard}
            />
          </Route>

          <Route><NotFound /></Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
