import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class BooksPage extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const response = await Axios.get('http://localhost:4040/books');
    console.log(response);

    this.setState({ books: response.data });
  }

  render() {
    return (
      <>
        <h1>Страница книг</h1>

        <ul>
          {this.state.books.map(book => (
            <li key={book.id}>
              <Link to={`${this.props.match.url}/${book.id}`}>
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default BooksPage;
