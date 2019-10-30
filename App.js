import React, { Component } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://192.168.43.95:4000/graphql",
});

import Pokemon from "./components/Pokemon";
import getRandomInt from "./helpers/getRandomInt";

export default class App extends Component {
  state = {
    query: null,
  };

  getQuery = () => {
    const randomID = getRandomInt(1, 807);
    return `
      query GetPokemonById {
        pokemon(id: ${randomID}) {
          id,
          name,
          desc,
          pic,
          types {
            id,
            name
          }
        }
      }
    `;
  };

  onGetNewPokemon = () => {
    const result = this.getQuery();
    this.setState({
      query: result,
    });
  };

  componentDidMount() {
    this.onGetNewPokemon();
  }

  render() {
    const { query } = this.state;
    if (!query) return null;

    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`
            ${query}
          `}
        >
          {({ loading, error, data }) => {
            if (loading || error)
              return <ActivityIndicator size="large" color="#0000ff" />;
            return (
              <AppContext.Provider
                value={{ ...data.pokemon, onPress: this.onGetNewPokemon }}
                style={styles.container}
              >
                <Pokemon />
              </AppContext.Provider>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export const AppContext = React.createContext({ data: { pokemon: null } });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
