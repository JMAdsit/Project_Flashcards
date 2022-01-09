import { useHistory } from "react-router-dom";
import {listDecks, deleteDeck, deleteCard, updateDeck, createCard, updateCard, createDeck} from "../utils/api/index";

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