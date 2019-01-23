import React, { PureComponent } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'

class App extends PureComponent {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor');
    this.state = {
      persons: [
        {id : 'a1', name: 'Max', age:28},
        {id : 'a2', name: 'Manu', age:29},
        {id : 'a3', name: 'Stephanie', age:26}
      ]
    }
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[App.js] Inside shouldComponentUpdate', nextProps, nextState);
  }

  componentWillMount () {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidUpdate() {
    console.log('[App.js] Inside componentDidUpdate');
  }

  // state = {
  //   persons: [
  //     {id : 'a1', name: 'Max', age:28},
  //     {id : 'a2', name: 'Manu', age:29},
  //     {id : 'a3', name: 'Stephanie', age:26}
  //   ]
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons =  [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {
      persons: persons
    } )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState(
      {
        persons: persons
      }
    );
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState(
      {showPersons: !doesShow}
    );
  }


  render() {
    console.log('[App.js] Inside render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
            persons = {this.state.persons}
            clicked = {this.deletePersonHandler}
            changed = {this.nameChangedHandler} />;   
    }
    return (
      <div className={classes.App}>
      <button onClick = {() => {this.setState({showPersons: true})}}>Show Persons</button>
      <Cockpit 
      appTitle = {this.props.title}
      showPersons = {this.state.showPersons}
      persons = {this.state.persons}
      clicked = {this.togglePersonHandler}
      />
      {persons}
      </div>
    );
  }
}

export default App;
