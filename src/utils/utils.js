import { 
    listDecks, deleteDeck, deleteCard, updateDeck, 
    createCard, updateCard, createDeck
} from "../utils/api/index";

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