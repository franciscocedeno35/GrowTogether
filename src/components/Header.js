import Button from "./Button";
import "./Header.css";

function Header() {
  return (
    <header className='header'>
     <div id="divHead" >
        <Button id="discover" text="Discover"/>
        <Button id="start" text='Start A Project'/>
        <h1 id="h1Head">GrowTogether</h1>
        <Button id="search" text='Search'/>
        <Button id="logIn" text='Log In'/>
      </div>
      <hr></hr>
    </header>
    //<header style={{ justify: "center", flex: "row" }}className='header'>
     /*<div>
        <h1 style={{color: '#54FFAD', backgroundColor:'#383838', 
          textAlign: 'center'}}>
        <Button style={{ marginLeft: "auto" }} id="discover" color='#54FFAD' text='Discover'/>
        <Button style={{ marginLeft: "auto" }} id="start" color='#54FFAD' text='Start A Project'/>
        GrowTogether
        <Button style={{ marginRight: "auto" }} id="search" color='#54FFAD' text='Search'/>
        <Button style={{ marginRight: "auto" }} id="logIn" color='#54FFAD' text='Log In'/>
        </h1>
  </div>*/
    //</header>
    

  )
}

export default Header