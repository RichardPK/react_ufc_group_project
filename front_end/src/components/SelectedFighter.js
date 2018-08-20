import React, {Component} from 'react';
import FighterBarGraph from './FighterBarGraph';

class SelectedFighter extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedFighter: null
    }
    this.fetchFighterObject = this.fetchFighterObject.bind(this);
    this.prettyName = this.prettyName.bind(this);
    this.getAge = this.getAge.bind(this);
    this.getCountry = this.getCountry.bind(this);
    this.getWeightClass = this.getWeightClass.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getWeight = this.getWeight.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getAverageFightDuration = this.getAverageFightDuration.bind(this);
  }

  fetchFighterObject(){
    const url = `http://localhost:3001/api/fighters/${this.props.selectedFighter}`
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(fighter => this.setState({
      selectedFighter: fighter
    })
  )
}

componentDidMount(){
  this.fetchFighterObject();
}

getImage(){
  if(!this.state.selectedFighter){
    return null;
  }
  return(<img src={this.state.selectedFighter.left_full_body_image}/>)
}



prettyName(){
  if(!this.state.selectedFighter){
    return null;
  }
  if(!this.state.selectedFighter.nickname){
    return(
      <p>Name: {this.state.selectedFighter.first_name} {this.state.selectedFighter.last_name}</p>
    )
  }
  return(
    <p>Name: {this.state.selectedFighter.first_name} "{this.state.selectedFighter.nickname}" {this.state.selectedFighter.last_name}</p>
  )
}

getAge(){
  if(!this.state.selectedFighter){
    return null;
  }
  const currentDate = new Date();
  const fightersDOB = new Date(this.state.selectedFighter.dob);
  const parsedCurrentDate = Date.parse(currentDate);
  const parsedFightersDOB = Date.parse(fightersDOB);
  const age_millseconds = parsedCurrentDate - parsedFightersDOB
  const age = parseInt(age_millseconds/(1000 * 60 * 60 * 24 * 365.25));
  return (<p>Age: {age}</p>);
}

getCountry(){
  if(!this.state.selectedFighter){
    return null;

  }

  return(<p>Location: {this.state.selectedFighter.city_residing}, {this.state.selectedFighter.country_residing}</p>);
}

getWeightClass(){
  if(!this.state.selectedFighter){
    return null;
  }
  return(<p>Weight Class: {this.state.selectedFighter.weight_class}</p>)
}

getHeight(){
  if(!this.state.selectedFighter){
    return null;
  }
  return(<p>Height: {this.state.selectedFighter.height_ft}</p>)
}

getWeight(){
  if(!this.state.selectedFighter){
    return null;
  }
  return(<p>Weight {this.state.selectedFighter.weight}</p>)
}

getAverageFightDuration(){
  if(!this.state.selectedFighter){
    return null;
  }
  return(<p>Average Fight Duration: {this.state.selectedFighter.AverageFightTime} Minutes</p>)
}



render(){
  return(
    <React.Fragment>
      <p>Selected Fighter</p>
      {this.getImage()}
      {this.prettyName()}
      {this.getAge()}
      {this.getCountry()}
      {this.getWeightClass()}
      {this.getHeight()}
      {this.getWeight()}
      {this.getAverageFightDuration()}
      <FighterBarGraph selectedFighter={this.state.selectedFighter}/>
      <button onClick={this.props.hideSelectedPlayer}>Back to List</button>
    </React.Fragment>
  )
}
}

export default SelectedFighter;
