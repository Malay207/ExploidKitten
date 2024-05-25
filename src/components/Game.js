import {React,useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { drawCard } from '../state/action/action';
import "../App.css";

const Game = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [userdata, setuserdata] = useState({username:"",email:"",password:"",})
  const [point, setPoint] = useState(0);
  const game = useSelector(state => state.game);
  const handleDrawCard = (x) => {
    if(!game.loss)
    {
      dispatch(drawCard(x));
    }
    else{
      alert("Exploding Kitten card drawn.you loss the game");
      setTimeout(()=>{
        window.location.reload()
      },3000);
      
    }
  }
  useEffect(() => {
    if(!localStorage.getItem('exploit-kitten-userdata'))
    {
      navigate('/signup');
    }
    else{
      let data=JSON.parse(localStorage.getItem("exploit-kitten-userdata"));
      setuserdata({
        username:data.username,
        email:data.email,
        password:data.password,
      });
      getpoint(data.username);
    }
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if(game.gameWon){
      const {username}=JSON.parse(localStorage.getItem("exploit-kitten-userdata"));
      updatepoint(username);
    }
  }, [game.gameWon])
  
const getpoint=async (name)=>{
  const res=await fetch(`https://go-backend-api-7.onrender.com/leaderboard/${name}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
    },
  });
  const data= await res.json();
  setPoint(data);

}
const updatepoint=async (name)=>{
  // eslint-disable-next-line
  const res=await fetch(`https://go-backend-api-7.onrender.com/update-points`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      username:name
    }),
  });
  alert("Congratulation! You have won the game");
 setTimeout(() => {
  window.location.reload()
 }, 3000);
}
const logout=()=>{
  localStorage.removeItem('exploit-kitten-userdata');
  navigate('/signup');
}
  return (
    <div>
             <h1>Exploding Kittens</h1>
             <div className='popup'>
             <Popup trigger={<i className="fa-regular fa-circle-user user-logo" style={{color:"#ffffff"}}></i>} position="left center">
              <div className='user-info'>
                <p>UserName:{userdata.username}</p>
                <p>Email: {userdata.email}</p>
                <p>Total win:{point}</p>
                <button onClick={logout}>Logout&rarr;</button>

              </div>
             </Popup>
             </div>
             
      <div>
        <h2>Game Status</h2>
        <p>Game Won: {game.gameWon? 'Yes' : 'No'}</p>
        <p>Defuse:{game.chance}</p>
        {/* Add more game status information here */}
      </div>
      <div>
        <h2>Drawn Cards</h2>
        <div className='cards'>
          {game.drawnCards.map((card, index) => 
          (
           <div key={index} className="flip-card" >
               <div className="flip-card-inner" style={
    {
         transform:'rotateY(180deg)',
        }
  
    }>
                <div className="flip-card-back">
                  <h1>{card.name}</h1> 
                  <p>{card.logo}</p> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Remaining Deck Cards</h2>
        <div className='cards'>
          {game.deck.map((card, index) => (
            <div key={index} className="flip-card">
               <div className="flip-card-inner">
                <div className="flip-card-front" onClick={()=>{ handleDrawCard(index)}}>
                    <span>X</span>
                </div>
                <div className="flip-card-back">
                  <h1>{card.name}</h1> 
                  <p>{card.logo}</p> 
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;