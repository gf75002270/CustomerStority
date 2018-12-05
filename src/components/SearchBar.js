import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { TextInput, StyleSheet } from 'react-native';

class SearchBar extends React.Component {
  static propTypes = {
    searchCustomers: PropTypes.func.isRequired,
    initialSearchTerm: PropTypes.string.isRequired,
  };
  state = {
    searchTerm: this.props.initialSearchTerm,
  };
  searchCustomers = (searchTerm) => {
    this.props.searchCustomers(searchTerm);
    this.inputElement.blur();
  }
  debouncedSearchCustomers = debounce(this.searchCustomers, 300);
  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearchCustomers(this.state.searchTerm);
    });
  };
  render() {
    return (
      <TextInput
        ref={(inputElement) => { this.inputElement = inputElement; }}
        value={this.state.searchTerm}
        placeholder="Search Customer"
        style={styles.input}
        onChangeText={this.handleChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  },
});

export default SearchBar;
