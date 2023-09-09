import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// import AuthorBooks from '../components/AuthorBooks';

class AuthorsPage extends Component {
  state = {
    authors: [],
  };

  async componentDidMount() {
    const response = await Axios.get('http://localhost:4040/authors');
    console.log(response.data);

    this.setState({ authors: response.data });
  }

  render() {
    const { match } = this.props;
    return (
      <>
        <h1>Страница авторов</h1>

        <ul>
          {this.state.authors.map(author => (
            <li key={author.id}>
              <Link to={`${match.url}/${author.id}`}>{author.name}</Link>
            </li>
          ))}
        </ul>

        {/* <Route
          path={`${match.path}/:authorId`}
          render={props => {
            console.log(props)
            const bookId = Number(props.match.params.authorId);
            const author = this.state.authors.find(({ id }) => id === bookId);
        
            return author && <AuthorBooks {...props} books={author.books} />;
          }}
        /> */}
      </>
    );
  }
}

export default AuthorsPage;
