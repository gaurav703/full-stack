import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";
import "./App.css";

// Create Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

// GraphQL Queries and Mutations
const GET_COUNTS = gql`
  query {
    bookCount
    authorCount
  }
`;

const GET_ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
    }
  }
`;

// Components
const Counts = () => {
  const { loading, error, data } = useQuery(GET_COUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Counts</h2>
      <p>Number of Books: {data.bookCount}</p>
      <p>Number of Authors: {data.authorCount}</p>
    </div>
  );
};

const Books = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data.allBooks.map((book, index) => (
          <li key={index}>
            <strong>{book.title}</strong> by {book.author} (Published:{" "}
            {book.published})
            <br />
            Genres: {book.genres.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genres, setGenres] = useState("");
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_ALL_BOOKS }, { query: GET_COUNTS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const genreArray = genres.split(",").map((genre) => genre.trim());

    try {
      await addBook({
        variables: {
          title,
          author,
          published: parseInt(published),
          genres: genreArray,
        },
      });

      setTitle("");
      setAuthor("");
      setPublished("");
      setGenres("");
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Published Year:</label>
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genres (comma-separated):</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GraphQL Testing</h1>
        <Counts />
        <AddBookForm />
        <Books />
      </div>
    </ApolloProvider>
  );
}

export default App;
