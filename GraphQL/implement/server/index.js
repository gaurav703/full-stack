const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Sample data
let books = [
  {
    title: "Clean Code",
    author: "Robert Martin",
    published: 2008,
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    author: "Robert Martin",
    published: 2002,
    genres: ["agile", "software"],
  },
  {
    title: "Refactoring, edition 2",
    author: "Martin Fowler",
    published: 2019,
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    author: "Joshua Kerievsky",
    published: 2008,
    genres: ["refactoring"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    author: "Sandi Metz",
    published: 2012,
    genres: ["refactoring", "agile"],
  },
];

let authors = [
  { name: "Robert Martin", born: null },
  { name: "Martin Fowler", born: null },
  { name: "Fyodor Dostoevsky", born: null },
  { name: "Joshua Kerievsky", born: null },
  { name: "Sandi Metz", born: null },
];

// GraphQL Schema
const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

// Resolvers
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books;
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (book) => book.author === args.author
        );
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(args.genre)
        );
      }
      return filteredBooks;
    },
    allAuthors: () => {
      return authors.map((author) => ({
        ...author,
        bookCount: books.filter((book) => book.author === author.name).length,
      }));
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const existingAuthor = authors.find(
        (author) => author.name === args.author
      );
      if (!existingAuthor) {
        authors.push({ name: args.author, born: null });
      }
      const newBook = { ...args };
      books.push(newBook);
      return newBook;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) return null;
      author.born = args.setBornTo;
      return author;
    },
  },
};

// Setup Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Setup Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🚀 GraphQL API at http://localhost:${PORT}/graphql`);
});
