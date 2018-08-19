import React, { Component } from 'react';
import _ from 'lodash';
import List from '../components/List';
import ListFilter from '../components/ListFilter';

class ListContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      filteredItems: null,
      textFilter: null,
      weightFilter: null,
      titleFilter: null
      // weightFiltered: false
    }
    this.handleSearchBoxFilter = this.handleSearchBoxFilter.bind(this);
    this.getWeightClasses = this.getWeightClasses.bind(this);
    this.handleWeightClassFilter = this.handleWeightClassFilter.bind(this);
    this.processFiltering = this.processFiltering.bind(this);
    this.handleTitleFilter = this.handleTitleFilter.bind(this);
  }

  handleSearchBoxFilter(searchBoxFilter){
    this.setState({textFilter: searchBoxFilter}, this.processFiltering)
  }

  handleWeightClassFilter(weightClassFilter){
    this.setState({weightFilter: weightClassFilter}, this.processFiltering)
  }

  handleTitleFilter(titleFilter){
    this.setState({titleFilter: titleFilter}, this.processFiltering)
  }

  processFiltering(){
    let filteredItems = this.props.allFighters;

    if(this.state.textFilter){
      //incorporate first and last name filtering here
      let textArray = this.state.textFilter.split(' ');
      filteredItems = _.filter(filteredItems, (fighter) => {
        return _.includes(fighter.first_name.toLowerCase(), textArray[0].toLowerCase());
      });
      if(textArray.length > 1){
        filteredItems = _.filter(filteredItems, (fighter) => {
          return _.includes(fighter.last_name.toLowerCase(), textArray[1].toLowerCase());
        });
      }
    }

    if(this.state.weightFilter){
      filteredItems = _.filter(filteredItems, {'weight_class': this.state.weightFilter});
    }

    //if statement for titlefilter

    if(this.state.titleFilter){
      // console.log(this.state.titleFilter);
      if(this.state.titleFilter === 'true'){
        filteredItems = _.filter(filteredItems, {'title_holder': true});
      }
      if(this.state.titleFilter === 'false'){
        filteredItems = _.filter(filteredItems, {'title_holder': false});
      }
    }

    this.setState({filteredItems});
  }




  //generating weight classes

  getWeightClasses(){
    const allUniqByWeight = _.uniqBy(this.props.allFighters, 'weight_class');
    const allWeights = _.map(allUniqByWeight, fighter => {
      return fighter.weight_class
    })
    return allWeights;
  }

  render(){
    let generatedList = <List listedFighters={this.props.allFighters}/>;
    if(this.state.filteredItems){
      generatedList = <List listedFighters={this.state.filteredItems}/>;
    }
    return(
      <React.Fragment>
        <div className="list-container">
          <h4>Search for your fighter</h4>
          <div className="list-filter-container">
            <ListFilter
              handleFilterCreation={this.handleSearchBoxFilter} weights={this.getWeightClasses}
              onWeightSelected={this.handleWeightClassFilter}
              onTitleSelected={this.handleTitleFilter}/>
              {generatedList}
            </div>
          </div>
        </React.Fragment>

      )
    }
  }

  export default ListContainer;
