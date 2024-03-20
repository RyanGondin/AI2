import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Form from './view/form';
import List from './view/list';
import Edit from './view/edit';
import EditGenero from './view/editGenero';
import ListGenero from './view/listGenero';
import FormGenero from './view/formGenero';

function App() {
  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link className='navbar-brand' to = '/filmes/list'>MeusFilmes</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse"
          id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li className='nav-item'>
            <Link class="btn btn-success " to="filmes/create">Adicionar Filme</Link>
            </li>
            <li className='nav-item'>
            <Link class="nav-link" to="genero/list">Genero List</Link>
            </li>
            <li className='nav-item'>
            <Link class="btn btn-success " to="genero/create">Adicionar Genero</Link>
            </li>
          </ul>
          
        </div>
      </nav>
      <div class="container py-4">
        <div class="row">
          <Routes>
            <Route path="/filmes/list" element={<List />} />
            <Route path="/filmes/create" element={<Form />} />
            <Route path="/filmes/update/:filmesId" element={<Edit />}/>
            <Route path='/filmes/delete/:id'/>
            <Route path='/genero/list' element = {<ListGenero/>}/>
            <Route path='/genero/create' element = {<FormGenero/>}/>
            <Route path='/genero/update/:id' element = {<EditGenero/>}/>
            <Route path='/genero/delete/:id'/>
          </Routes>
        </div>
      </div>
    </div>
</Router >
);
}
export default App;
