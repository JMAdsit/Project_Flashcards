import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck} from "../../utils/api/index";
import {deckEdit} from "../../utils/utils";

function Edit({setDeckList}) {
    //Declare deck state and get deck id
    let {deckId} = useParams();
    let [deck, setDeck] = useState();
    
    //Handle changes in the form's inputs
    const changeHandler = event => {
        setDeck({ ...deck, [event.target.name]: event.target.value })
      }

    //Get deck info
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    //Wait for deck info to load
    if (!deck) { return <p>Loading...</p>}
    
    //render edit page with breadcrumbs
    return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <form onSubmit={(event) => deckEdit(deck, setDeckList, event)}>
                <div className="form-group">
                <label for="name">Name
                    <input
                    required
                    className="form-control" 
                    id="name"
                    name="name" 
                    type="text" 
                    value={deck.name}
                    onChange={changeHandler}
                    />
                </label></div>
                <div className="form-group">
                <label>Description
                    <textarea
                    required 
                    className="form-control" 
                    id="description"
                    name="description"
                    value={deck.description}
                    onChange={changeHandler}
                    />
                </label></div>
                <Link to="/" className="btn btn-secondary">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
}
export default Edit;