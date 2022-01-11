import { 
    listDecks, deleteDeck, deleteCard, updateDeck, 
    createCard, updateCard, createDeck
} from "../utils/api/index";

//Handle add deck
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

//Handle deck delete
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

//Handle edit deck
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

//Handle add card
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

//Handle card delete
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

//Handle edit card
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