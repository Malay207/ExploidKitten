const initialState = {
    deck: [{"name":"Cat","logo":'😼'}, {"name":"Defuse","logo":'🙅‍♂️'}, {"name":'Exploding Kitten',"logo":'💣'}, {"name":'Shuffle',"logo":'🔀'}, {"name":"Cat","logo":'😼'}],
    drawnCards: [],
    gameWon: 0,
    chance:0,
    loss:false,
    // Add other game state variables
  };
  
  const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DRAW_CARD':
        // Handle drawing a card and updating game state
        if(state.deck[action.payload].name==="Shuffle"&&state.drawnCards.length!==4)
        {
          let shuffledDeck = [...state.deck,...state.drawnCards];
          for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
          }
          return {
            ...state,
            deck: shuffledDeck,
             drawnCards: [],
             gameWon: 0,
          };
        }
        if(state.deck[action.payload].name==="Defuse")
        {
          return {
           ...state,
            drawnCards: [...state.drawnCards,state.deck[action.payload]],
            gameWon: state.drawnCards.length===4?1:0,
            deck: state.deck.filter((card, index) => index !== action.payload),
            chance:state.chance+1
          };
        }
        if(state.deck[action.payload].name==="Exploding Kitten")
        {
          if(state.chance===0)
          {
            return{
              ...state,
              loss:true,
              drawnCards: [...state.drawnCards,state.deck[action.payload]],
              gameWon: state.drawnCards.length===4?1:0,
              deck: state.deck.filter((card, index) => index !== action.payload),
            }
          }
          else{
            return{
              ...state,
              drawnCards: [...state.drawnCards,state.deck[action.payload]],
              gameWon: state.drawnCards.length===4?1:0,
              deck: state.deck.filter((card, index) => index !== action.payload),
              chance:state.chance-1
            }
          }
          
        }

        return {
         ...state,
          drawnCards: [...state.drawnCards,state.deck[action.payload]],
          gameWon: state.drawnCards.length===4?1:0,
          deck: state.deck.filter((card, index) => index !== action.payload),
        };
          
         

      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export default gameReducer;
  