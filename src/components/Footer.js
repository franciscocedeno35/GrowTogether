import Button from "./Button";
import "./Footer.css";
import React from 'react';   
import ReactDOM from 'react-dom';   

function Footer(props) {
  
    const myLists = props.myLists;  
    const listItems = myLists.map((myList) =>  
        <li>{myList}</li>  
  ); 
    
  return (
    <footer>
        <div id="divFoot" >
            <Button id="arts" text="Arts"/>
            <Button id="comics" text='Comics & Illustration'/>
            <Button id="design" text='Design & Tech'/>
            <Button id="film" text='Film'/>
            <Button id="food" text='Food'/>
            <Button id="games" text="Games"/>
            <Button id="music" text="Arts & Craft"/>
            <Button id="publishing" text="Publishing"/>
        </div>
        <div id="about">
            <h2>Rendering Lists inside component</h2>  
              <ul>{listItems}</ul>  
        </div>
        <div id="divFoot2" >
            <Button id="trust" text="Trust & Safety"/>
            <Button id="terms" text='Terms of Use'/>
            <Button id="privacy" text='Privacy Policy'/>
            <Button id="cookie" text='Cookie Policy'/>
            <Button id="access" text='Accessibility'/>
            <Button id="statement" text="Statement"/>
            <Button id="ca" text="CA"/>
            <Button id="notice" text="Notice of Consent"/>
        </div>
    </footer>
    
  )
}
const myLists = ['Peter', 'Sachin', 'Kevin', 'Dhoni', 'Alisa'];   
ReactDOM.render(  
  <Footer myLists={myLists} />,  
  document.getElementById('app')  
);  
export default Footer