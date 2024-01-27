import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let db=[{id:1, name:"John", desc:"I am John", social:"facebook", interest:"football"},
  {id:2, name:"Doe", desc:"I am Doe", social:"twitter", interest:"cricket"},
  {id:3, name:"Mark", desc:"I am Mark", social:"instagram", interest:"basketball"},
  {id:4, name:"James", desc:"I am James", social:"linkedin", interest:"hockey"},];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      {db.map(person=>
      <CardCompnent 
      key={person.id}
      id={personalbar.id} 
      name={person.name} 
      desc={person.desc} 
      link={person.social} 
      interest={person.interest}/>
      )}
    </div>
  );
}
function CardCompnent({id,name, desc, link, interest}){
  return <div style={{ borderRadius: '8px', 
  border: '1px solid #ccc', 
  padding: '20px', 
  marginBottom: '10px',
  marginRight: '10px', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex', 
  flexDirection: 'column', 
  width: '500px', }}>
    <h1><b>{name}</b></h1>
    <p>{desc}</p>
    <p><b>interest</b></p>
    <p>{interest}</p>
    <div style={{
      display:'flex',
      flexDirection:'row',
    }}>
    <p><SocialButton link={link}/></p>
    <p><SocialButton link={link}/></p>
    </div>
  </div>
}
function SocialButton({link}){
    return <button style={{
      backgroundColor: '#4CAF50', // Green background color
    border: 'none',             // No border
    color: 'white',             // White text
    padding: '10px 20px',       // Padding
    textAlign: 'center',        // Center text
    textDecoration: 'none',
    display: 'inline-block',    // Display as inline-block
              // Font size
    margin: '4px 2px',          // Margin
    cursor: 'pointer',          // Cursor pointer
    borderRadius: '4px',
    }}>{link}</button>
    
}

export default App
