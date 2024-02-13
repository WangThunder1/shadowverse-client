import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import initialWallpaper from "../../src/assets/wallpapers/forte.png";
import wallpaper3 from "../../src/assets/wallpapers/3.png";
import ReplyIcon from "@mui/icons-material/Reply";

import {
  allCards,
  set3,
  setUMA,
  set2,
  set1,
  forest,
  sword,
  rune,
  dragon,
  abyss,
  haven,
  neutral,
} from "../decks/AllCards";
import {
  allCardsEvo,
  set3Evo,
  setUMAEvo,
  set2Evo,
  set1Evo,
  forestEvo,
  swordEvo,
  runeEvo,
  dragonEvo,
  abyssEvo,
  havenEvo,
  neutralEvo,
} from "../decks/AllCardsEvo";
import { cardImage } from "../decks/getCards";
import CardMUI from "@mui/material/Card";
import img from "../assets/pin_bellringer_angel.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createDeck } from "../redux/DeckSlice";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Modal,
  Box,
} from "@mui/material";

export default function CreateDeck() {
  const location = useLocation();
  const reduxDecks = useSelector((state) => state.deck.decks);
  const deckName = location?.state?.deckName;
  const deckEdit = reduxDecks.filter((decks) => decks.name === deckName);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [evoDeck, setEvoDeck] = useState([]);
  const [deckMap] = useState(new Map());
  const [evoDeckMap] = useState(new Map());
  const [mainDeckSelected, setMainDeckSelected] = useState(true);
  const [evoDeckSelected, setEvoDeckSelected] = useState(false);
  const [name, setName] = useState("");
  const [cardName, setCardName] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [filteredAllCards, setFilteredAllCards] = useState(allCards);
  const [filteredAllCardsEvo, setFilteredAllCardsEvo] = useState(allCardsEvo);
  const [buttonFilterSet, setButtonFilterSet] = useState("all");
  const [buttonFilterClass, setButtonFilterClass] = useState("all");
  const [buttonFilterSetEvo, setButtonFilterSetEvo] = useState("all evo");
  const [buttonFilterClassEvo, setButtonFilterClassEvo] = useState("all evo");

  useEffect(() => {
    const filtered = handleSelectButtonFilter();
    const filteredEvo = handleSelectButtonFilterEvo();
    setFilteredAllCards(filtered);
    setFilteredAllCardsEvo(filteredEvo);
    handleTextInput(textInput);
  }, [buttonFilterSet, buttonFilterClass, mainDeckSelected]);

  useEffect(() => {
    if (deckEdit.length > 0) {
      if (deckEdit[0].deck.length > 0) {
        handleFillDeckMap(deckEdit[0].deck);
      }
      if (deckEdit[0].evoDeck.length > 0) {
        handleFillEvoDeckMap(deckEdit[0].evoDeck);
      }
    }
  }, []);

  const handleFillDeckMap = (deck) => {
    for (let i = 0; i < deck.length; i++) {
      handleCardSelection(deck[i]);
    }
  };
  const handleFillEvoDeckMap = (deck) => {
    for (let i = 0; i < deck.length; i++) {
      handleEvoCardSelection(deck[i]);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(
      createDeck({
        name: name,
        deck: deck,
        evoDeck: evoDeck,
      })
    );
    navigate("/");
  };

  const handleModalOpen = (name) => {
    setCardName(name);
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);

  const handleTextInput = (text) => {
    setTextInput(text);
    if (mainDeckSelected) {
      const filtered = handleSelectButtonFilter();
      const filteredCards = filtered.filter((card) =>
        card.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAllCards(filteredCards);
    } else {
      const filteredEvo = handleSelectButtonFilterEvo();
      const filteredCards = filteredEvo.filter((card) =>
        card.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAllCardsEvo(filteredCards);
    }
  };

  const getCardsFromName = (name) => {
    switch (name) {
      case "set 3":
        return set3;
      case "uma":
        return setUMA;
      case "set 2":
        return set2;
      case "set 1":
        return set1;
      case "set 3 evo":
        return set3Evo;
      case "uma evo":
        return setUMAEvo;
      case "set 2 evo":
        return set2Evo;
      case "set 1 evo":
        return set1Evo;
      case "forest":
        return forest;
      case "forest evo":
        return forestEvo;
      case "sword":
        return sword;
      case "sword evo":
        return swordEvo;
      case "rune":
        return rune;
      case "rune evo":
        return runeEvo;
      case "dragon":
        return dragon;
      case "dragon evo":
        return dragonEvo;
      case "abyss":
        return abyss;
      case "abyss evo":
        return abyssEvo;
      case "haven":
        return haven;
      case "haven evo":
        return havenEvo;
      case "neutral":
        return neutral;
      case "neutral evo":
        return neutralEvo;
      case "all":
        return allCards;
      case "all evo":
        return allCardsEvo;
      default:
        return allCards;
    }
  };

  const handleSelectButtonFilter = () => {
    const setCards = getCardsFromName(buttonFilterSet);
    const classCards = getCardsFromName(buttonFilterClass);
    const merged = setCards.filter(
      (setCard) => classCards.indexOf(setCard) > -1
    );
    return merged;
  };
  const handleSelectButtonFilterEvo = () => {
    const setCards = getCardsFromName(buttonFilterSetEvo);
    const classCards = getCardsFromName(buttonFilterClassEvo);
    const merged = setCards.filter(
      (setCard) => classCards.indexOf(setCard) > -1
    );
    return merged;
  };

  const handleCardSelection = (card) => {
    if (deck.length < 50) {
      if (deckMap.has(card)) {
        if (deckMap.get(card) === 2 && card === "Shenlong") return;
        if (deckMap.get(card) === 3) {
          return;
        } else {
          deckMap.set(card, deckMap.get(card) + 1);
        }
      } else {
        deckMap.set(card, 1);
      }
      if (deckMap.get(card) === 4) {
        return;
      } else if (deckMap.get(card) === 1 && card === "Shenlong") {
        return;
      } else {
        setDeck((deck) => [...deck, card]);
      }
    }
  };
  const handleCardRemove = (card) => {
    if (deck.length > 0) {
      if (deckMap.has(card)) {
        if (deckMap.get(card) === 1) {
          deckMap.delete(card);
        } else {
          deckMap.set(card, deckMap.get(card) - 1);
        }
        let cardIndex = deck.indexOf(card);
        let newDeck = deck.filter((_, idx) => idx !== cardIndex);
        setDeck(newDeck);
      }
    }
  };
  const handleEvoCardRemove = (card) => {
    if (evoDeck.length > 0) {
      if (evoDeckMap.has(card)) {
        if (evoDeckMap.get(card) === 1) {
          evoDeckMap.delete(card);
        } else {
          evoDeckMap.set(card, evoDeckMap.get(card) - 1);
        }
        let cardIndex = evoDeck.indexOf(card);
        let newDeck = evoDeck.filter((_, idx) => idx !== cardIndex);
        setEvoDeck(newDeck);
      }
    }
  };
  const handleEvoCardSelection = (card) => {
    if (evoDeck.length < 10) {
      if (evoDeckMap.has(card)) {
        if (evoDeckMap.get(card) === 3 && card !== "Carrot") {
          return;
        } else {
          evoDeckMap.set(card, evoDeckMap.get(card) + 1);
        }
      } else {
        evoDeckMap.set(card, 1);
      }
      if (evoDeckMap.get(card) === 4 && card !== "Carrot") {
        return;
      } else {
        setEvoDeck((deck) => [...deck, card]);
      }
    }
  };

  const handleMainDeckSelected = () => {
    setMainDeckSelected(true);
    setEvoDeckSelected(false);
  };
  const handleEvoDeckSelected = () => {
    setMainDeckSelected(false);
    setEvoDeckSelected(true);
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        height: "100vh",
        width: "100vw",
        background: "url(" + wallpaper3 + ") center center fixed",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        // flexWrap: "wrap",
        // justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <div
        style={{
          // marginTop: "1%",
          paddingBottom: "1%",
          minHeight: "450px",
          width: "80vw",
          backgroundColor: "rgba(50, 50, 50, 0.60)",
          borderRadius: "10px",
          border: "4px solid #0000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {mainDeckSelected && (
          <div
            style={{
              height: "10%",
              width: "40%",
              // backgroundColor: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              padding: "2em",
            }}
          >
            <div>
              <div
                style={{
                  color: "white",
                  fontSize: "32px",
                  fontFamily: "Noto Serif JP, serif",
                }}
              >
                Main Deck
              </div>
              <div
                style={{
                  color: deck.length < 40 ? "white" : "gold",
                  fontSize: "17px",
                  fontFamily: "Noto Serif JP, serif",
                  textAlign: "center",
                }}
              >
                {deck.length}/50 Cards
              </div>
            </div>
          </div>
        )}
        {evoDeckSelected && (
          <div
            style={{
              height: "10%",
              width: "40%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              padding: "2em",
            }}
          >
            <div>
              <div
                style={{
                  color: "white",
                  fontSize: "32px",
                  fontFamily: "Noto Serif JP,serif",
                }}
              >
                Evolve Deck
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "17px",
                  fontFamily: "Noto Serif JP,serif",
                  textAlign: "center",
                }}
              >
                {evoDeck.length}/10 Cards
              </div>
            </div>
          </div>
        )}
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              checked={mainDeckSelected}
              onChange={handleMainDeckSelected}
              sx={{ fontFamily: "Noto Serif JP, serif", color: "white" }}
              value={mainDeckSelected}
              control={<Radio />}
              label="Main Deck"
            />
            <FormControlLabel
              checked={evoDeckSelected}
              onChange={handleEvoDeckSelected}
              sx={{ fontFamily: "Noto Serif JP, serif", color: "white" }}
              value={evoDeckSelected}
              control={<Radio />}
              label="Evolve Deck"
            />
          </RadioGroup>
        </FormControl>

        {/* MAIN DECK */}
        {mainDeckSelected && (
          <div
            style={{
              height: "100%",
              width: "60%",
              padding: "1em",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            {deck.length > 0 &&
              Array.from(deckMap.entries()).map((entry, idx) => {
                const [key, value] = entry;
                return (
                  <div
                    style={{ position: "relative" }}
                    onClick={() => handleCardRemove(key)}
                  >
                    <img
                      key={idx}
                      width={"110px"}
                      height={"150px"}
                      src={cardImage(key)}
                      alt={key}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "75%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        height: "40px",
                        width: "40px",
                        color: "white",
                        fontSize: "20px",
                        fontFamily: "Noto Serif JP, serif",
                        borderRadius: "7px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* EVOLVE DECK */}
        {evoDeckSelected && (
          <div
            style={{
              height: "70%",
              width: "60%",
              padding: "1em",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            {evoDeck.length > 0 &&
              Array.from(evoDeckMap.entries()).map((entry, idx) => {
                const [key, value] = entry;
                return (
                  <div
                    style={{ position: "relative" }}
                    onClick={() => handleEvoCardRemove(key)}
                  >
                    <img
                      key={idx}
                      width={"110px"}
                      height={"150px"}
                      src={cardImage(key)}
                      alt={key}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "75%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        height: "40px",
                        width: "40px",
                        color: "white",
                        fontSize: "20px",
                        fontFamily: "Noto Serif JP, serif",
                        borderRadius: "7px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {deck.length > 39 && evoDeck && (
          <Button
            style={{
              backgroundColor: "white",
              marginTop: "1em",
              color: "black",
            }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Create Deck
          </Button>
        )}
      </div>

      <input
        style={{
          padding: ".3em",
          marginTop: "1%",
          width: "30%",
          fontSize: "20px",
          fontFamily: "Noto Serif JP, serif",
        }}
        type="text"
        value={textInput}
        onChange={(event) => handleTextInput(event.target.value)}
        placeholder="Search for cards..."
      />

      <div
        style={{
          backgroundColor: "rgba(50, 50, 50, 0.60)",
          marginTop: "1em",
          padding: "1em",
        }}
      >
        <div
          style={{
            // backgroundColor: "rgba(50, 50, 50, 0.60)",
            // marginTop: "1em",
            padding: "1em",
            // height: "200px",
            width: "80vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => {
              setButtonFilterSet("all");
              setButtonFilterSetEvo("all evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: buttonFilterSet === "all" ? "#131219" : "white",
              border:
                buttonFilterSet === "all"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterSet === "all" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            All
          </Button>
          <Button
            onClick={() => {
              setButtonFilterSet("set 3");
              setButtonFilterSetEvo("set 3 evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterSet === "set 3" ? "#131219" : "white",
              border:
                buttonFilterSet === "set 3"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterSet === "set 3" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Flame of Lævateinn
          </Button>
          <Button
            onClick={() => {
              setButtonFilterSet("uma");
              setButtonFilterSetEvo("uma evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: buttonFilterSet === "uma" ? "#131219" : "white",
              border:
                buttonFilterSet === "uma"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterSet === "uma" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Umamusume
          </Button>
          <Button
            onClick={() => {
              setButtonFilterSet("set 2");
              setButtonFilterSetEvo("set 2 evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterSet === "set 2" ? "#131219" : "white",
              border:
                buttonFilterSet === "set 2"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterSet === "set 2" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Reign of Bahamut
          </Button>
          <Button
            onClick={() => {
              setButtonFilterSet("set 1");
              setButtonFilterSetEvo("set 1 evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterSet === "set 1" ? "#131219" : "white",
              border:
                buttonFilterSet === "set 1"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterSet === "set 1" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Advent of Genesis
          </Button>
        </div>

        <div
          style={{
            // backgroundColor: "rgba(50, 50, 50, 0.60)",
            // marginTop: "1em",
            padding: "1em",
            // height: "200px",
            width: "80vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => {
              setButtonFilterClass("all");
              setButtonFilterClassEvo("all evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterClass === "all" ? "#131219" : "white",
              border:
                buttonFilterClass === "all"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterClass === "all" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            All
          </Button>
          <Button
            onClick={() => {
              setButtonFilterClass("forest");
              setButtonFilterClassEvo("forest evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterClass === "forest" ? "#131219" : "white",
              border:
                buttonFilterClass === "forest"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterClass === "forest" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Forest
          </Button>
          <Button
            onClick={() => {
              setButtonFilterClass("sword");
              setButtonFilterClassEvo("sword evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterClass === "sword" ? "#131219" : "white",
              border:
                buttonFilterClass === "sword"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterClass === "sword" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Swordcraft
          </Button>
          <Button
            onClick={() => {
              setButtonFilterClass("rune");
              setButtonFilterClassEvo("rune evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterClass === "rune" ? "#131219" : "white",
              border:
                buttonFilterClass === "rune"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterClass === "rune" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Runecraft
          </Button>
          <Button
            onClick={() => {
              setButtonFilterClass("dragon");
              setButtonFilterClassEvo("dragon evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterClass === "dragon" ? "#131219" : "white",
              border:
                buttonFilterClass === "dragon"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterClass === "dragon" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Dragoncraft
          </Button>
          <Button
            onClick={() => {
              setButtonFilterClass("abyss");
              setButtonFilterClassEvo("abyss evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterClass === "abyss" ? "#131219" : "white",
              border:
                buttonFilterClass === "abyss"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterClass === "abyss" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Abysscraft
          </Button>
          <Button
            onClick={() => {
              setButtonFilterClass("haven");
              setButtonFilterClassEvo("haven evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterClass === "haven" ? "#131219" : "white",
              border:
                buttonFilterClass === "haven"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterClass === "haven" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Havencraft
          </Button>
          <Button
            onClick={() => {
              setButtonFilterClass("neutral");
              setButtonFilterClassEvo("neutral evo");
            }}
            style={{
              fontFamily: "Noto Serif JP,serif",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor:
                buttonFilterClass === "neutral" ? "#131219" : "white",
              border:
                buttonFilterClass === "neutral"
                  ? "3px solid gold"
                  : "3px solid white",
              color: buttonFilterClass === "neutral" ? "gold" : "#131219",
            }}
            variant="contained"
          >
            Neutral
          </Button>
        </div>
      </div>

      <InfiniteScroll
        dataLength={allCards.length} //This is important field to render the next data
        //   next={fetchData}
        style={{
          width: "80vw",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5em",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "3%",
          paddingBottom: "10%",
          overflow: "visible",
        }}
      >
        {mainDeckSelected &&
          filteredAllCards.map((name, idx) =>
            name ? (
              <motion.div
                key={idx}
                onTap={() => handleCardSelection(name)}
                onContextMenu={() => handleModalOpen(name)}
                whileHover={{
                  translateY: -25,
                  scale: 1.3,
                  cursor: `url(${img}) 55 55, auto`,
                  // boxShadow: 100,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 1.0)",
                }}
              >
                <img
                  width={"224px"}
                  height={"312px"}
                  src={cardImage(name)}
                  alt={name}
                />
              </motion.div>
            ) : (
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                animation="wave"
                variant="rounded"
                width={224}
                height={312}
              />
            )
          )}
        {evoDeckSelected &&
          filteredAllCardsEvo.map((name, idx) => (
            <motion.div
              key={idx}
              onTap={() => handleEvoCardSelection(name)}
              onContextMenu={() => handleModalOpen(name)}
              whileHover={{
                translateY: -25,
                scale: 1.3,
                cursor: `url(${img}) 55 55, auto`,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 1.0)",
              }}
            >
              <img
                // key={idx}
                width={"224px"}
                height={"312px"}
                src={cardImage(name)}
                alt={name}
              />
            </motion.div>
          ))}
      </InfiniteScroll>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          //   onSubmit: (event) => {
          //     event.preventDefault();
          //     console.log(event.currentTarget);
          //     handleClose();
          //   },
        }}
      >
        <DialogTitle>Create Deck</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a name for this deck. This deck will be available to select
            in the home page.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="deck"
            label="Deck name"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "transparent",
            boxShadow: 24,
            // p: 3,
            width: "30%",
            border: "none",
          }}
        >
          <CardMUI
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              overflow: "visible",
            }}
            variant="outlined"
          >
            {/* <img height={"100%"} src={cardImage(cardName)} alt={cardName} /> */}
            <motion.div
              initial={{ scale: 1.0, rotateY: 180 }}
              transition={{ duration: 0.8 }}
              animate={{ scale: 4.5, rotateY: 0 }}
            >
              <img height={"160px"} src={cardImage(cardName)} alt={cardName} />
            </motion.div>
          </CardMUI>
        </Box>
      </Modal>
      <div
        style={{
          // backgroundColor: "black",
          color: "white",
          height: "40px",
          minWidth: "150px",
          position: "absolute",
          fontSize: "18px ",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: ".5em",
          top: 10,
          left: 10,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        {/* <ArrowBackIcon sx={{ fontSize: "50px" }} /> */}
        <ReplyIcon sx={{ fontSize: "40px" }} />
        {/* <KeyboardBackspaceIcon sx={{ fontSize: "50px" }} /> */}
        Back to Home
      </div>
    </div>
  );
}
