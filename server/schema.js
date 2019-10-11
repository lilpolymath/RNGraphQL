const { gql } = require("apollo-server");

// Note that the exclamation mark is to signify that it is required.
const typeDefs = gql`
    type Query{
        pokemon(id: ID!): Pokemon
    }
    
    type Pokemon {
        id: ID!,
        name: String,
        desc: String,
        pic: String,
        types: [PokemonType!]!
    }

    types PokemonType {
        name: String
        id: Int!
    }
`;

module.exports = typeDefs;
