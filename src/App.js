import React from 'react';
import './App.css';
import { Header } from './features/Components';
import {Routes,Route, Navigate} from "react-router-dom"
import { Home, Login, Post, Profile,NotFound, Signup } from './features/Pages';
import {useSelector} from "react-redux"

function App() {
  const {login} = useSelector(state =>state.auth)


  function PrivateRoute({path,login,...props}){
    return login? <Route path={path} {...props}/>:<Navigate state={{from:path}} replace to="/login"/>
  }
  return (
    <div className="App">
      <Header/>
      <Routes>
        <PrivateRoute exact path="/" login={login} element={<Home/>}/>
        <PrivateRoute path="/post/:id" login={login} element={<Post/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <PrivateRoute path="/profile" login={login} element={<Profile/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
