import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MySidebar from "./Components/Sidebar/Sidebar";
import StartScreen from './Components/StartScreen/StartScreen'
import Account from './Components/Account/Account';
import Item from './Components/Item/Item'
// import ItemCard from './Components/ItemCard/ItemCard'
import { getAllCollections } from './firebase//services'


const App = () => {
  const handlCategory = (category) => {
    setCategory(category)
  }
  const [allCollections, setAllCollections] = useState({})
  const [allBase, setAllBase] = useState({})
  const [category, setCategory] = useState('Главная')
  useEffect(() => {
    getAllCollections(setAllCollections, setAllBase);
  }, [])
  return (
    <>
      <MySidebar allCollections={allCollections} handlCategory={handlCategory} />
      <Switch>
        <Route path="/account" component={Account} />
        <Route path="/item" component={({ location: { state } }) => <Item item={{ ...state }} />} />
        <Route
          path='/'
          component={(props) => <StartScreen {...props} allBase={allBase} category={category} />}
        />
      </Switch>
    </>
  );
}

export default App;
