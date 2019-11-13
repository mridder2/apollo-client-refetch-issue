const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Test {
    number: Int
    returnsError: String
  }

  type Query {
    test: Test
  }
  type Mutation {
    updateTest: Test
  }
`;

const test = {
  number: 123,
  returnsError: new Error("Some error")
};

const resolvers = {
  Query: {
    test: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return test;
    }
  },
  Mutation: {
    updateTest: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const number = Math.round(Math.random() * 100);
      test.number = number;

      return {
        number
      };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
