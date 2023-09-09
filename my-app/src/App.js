// Модули
import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import HomePage from './Pages/HomePages';
import AuthorsPage from './Pages/AuthorsPage';
import BooksPage from './Pages/BooksPage';
import NotFoundPage from './Pages/NotFoundPage';

import BookDetalisPage from './Pages/BookDetalisPage';

const App = () => (
  <>
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" className="NavLink" activeClassName="NavLink__active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/authors" className="NavLink" activeClassName="NavLink__active">Authors</NavLink>
        </li>
        <li>
          <NavLink to="/books" className="NavLink" activeClassName="NavLink__active">Books</NavLink>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/authors" component={AuthorsPage} />
      <Route exact path="/books" component={BooksPage} />
      <Route path="/books/:bookId" component={BookDetalisPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </>
);

export default App;
