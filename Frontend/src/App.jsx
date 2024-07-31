import React from 'react'
import { useState,useEffect } from 'react'
import { BrowserRouter as Router,  Route, Routes ,Navigate}from "react-router-dom"
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import './App.css'
import Category from './components/Category/Category'
import AddCategory from './components/Category/AddCategory'
import AddSubCategory from './components/SubCategory/AddSubCategory'
import SubCategory from './components/SubCategory/SubCategory'
import Products from './components/Products/Products'
import EditProducts from './components/Products/EditProducts'
import AddProducts from './components/Products/AddProducts'
import EditCategory from './components/Category/EditCategory'
import EditSubCategory from './components/SubCategory/EditSubCategory'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
       setIsLoggedIn(true)
    }
 }, [])
  return (
<Router>
{isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn}/>}
<div className="App">
{isLoggedIn && <Sidebar />}
<Routes>
<Route path="/" element={isLoggedIn ? <Navigate to="/Dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />}/>
<Route path="/Signup" element={ <Signup />}/>
<Route path="/Dashboard"element={isLoggedIn ? <Dashboard/>  : <Navigate to="/" /> }/>
<Route path="/Category"element={isLoggedIn ? <Category/> : <Navigate to="/" /> }/>
<Route path="/SubCategory"element={isLoggedIn ? <SubCategory/> : <Navigate to="/" /> }/>
<Route path="/Products"element={ isLoggedIn ? <Products/> : <Navigate to="/" /> }/>
<Route path="/Category/Add"element={isLoggedIn ? <AddCategory/> : <Navigate to="/" /> }/>
<Route path="/Category/Edit/:id" element={isLoggedIn ? <EditCategory/> : <Navigate to="/" /> }/>
<Route path="/SubCategory/add"element={isLoggedIn ? <AddSubCategory/> : <Navigate to="/" /> }/>
<Route path="/SubCategory/edit/:id" element={ isLoggedIn ? <EditSubCategory/> : <Navigate to="/" /> }/>
<Route path="/Product/edit/:id" element={isLoggedIn ? <EditProducts/> : <Navigate to="/" /> }/>
<Route path="/Product/add"element={ isLoggedIn ? <AddProducts/> : <Navigate to="/" /> }/>
</Routes>
</div>
</Router>
  )
}

export default App
