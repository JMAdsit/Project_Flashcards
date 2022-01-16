import { 
    listDecks, deleteDeck, deleteCard, updateDeck, 
    createCard, updateCard, createDeck
} from "./api/index";

/** Adds a new deck from the form, then reloads the deck list
 *
 * useHistory object to move the page to the new deck
 * @param {*} history 
 * 
 * reads deckList to get last deck id
 * @param {*} deckList 
 * 
 * sets deckList after reading from backend
 * @param {*} setDeckList 
 * 
 * deck data from form
 * @param {*} deck 
 * 
 * submit event
 * @param {*} event 
 */
export async function addDeck(history, deckList, setDeckList, deck, event) {
  event.preventDefault();
  console.log(deckList);
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

/** Deletes a deck using its id
 * 
 * useHistory object to move back to home
 * @param {*} history 
 * 
 * sets deckList after reading from backend, post-delete
 * @param {*} setDeckList 
 * 
 * id of deck sent to deleteDeck
 * @param {*} deckId 
 */
export async function deckDelete(history, setDeckList, deckId) {
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

/** Edits a deck's info
 * 
 * deck data from form
 * @param {*} updatedDeck
 * 
 * sets deckList after reading from backend
 * @param {*} setDeckList 
 * 
 * submit event
 * @param {*} event 
 */
export async function deckEdit(updatedDeck, setDeckList, event) {
  event.preventDefault();
  try {
    await updateDeck(updatedDeck);
    const response = await listDecks();
    setDeckList(response);
  } catch (error) {
    console.log(error);
  }
}

/** Add a card to a deck
 * 
 * id of the deck being added to
 * @param {*} deckId 
 * 
 * card data from form
 * @param {*} card 
 * 
 * setCard to change form state back to blank
 * @param {*} setCard 
 * 
 * sets deckList after reading from backend
 * @param {*} setDeckList 
 * 
 * submit event
 * @param {*} event 
 */
export async function addCard(deckId, card, setCard, setDeckList, event) {
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

/** Deletes a card from a deck
 * 
 * useHistory object to reload back after deleting a card
 * @param {*} history 
 * 
 * sets deckList after reading from backend
 * @param {*} setDeckList 
 * 
 * id of card being deleted
 * @param {*} cardId 
 */
export async function cardDelete(history, setDeckList, cardId) {
  if(window.confirm("Delete this card? You will not be able to recover it.")) {
    try {
      await deleteCard(cardId)
      const response = await listDecks()
      setDeckList(response);
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  }
}

/** Edit a card in a deck
 * 
 * useHistory to move to the deck page
 * @param {*} history 
 * 
 * sets deckList after reading from backend
 * @param {*} setDeckList 
 * 
 * card data from form
 * @param {*} card 
 * 
 * submit event
 * @param {*} event 
 */
export async function editCard(history, setDeckList, card, event) {
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