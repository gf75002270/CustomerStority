import React from "react";

import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  StyleSheet
} from "react-native";
import ajax from "../ajax";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";
import SearchBar from "./SearchBar";

class App extends React.Component {
  titleXPos = new Animated.Value(0);
  state = {
    customers: [],
    customersFromSearch: [],
    currentCustomerId: null,
    activeSearchTerm: "",
  };
  animateTitle = (direction = 1) => {
    const width = Dimensions.get("window").width - 150;
    Animated.timing(this.titleXPos, {
      toValue: direction * (width / 2),
      duration: 1000,
      easing: Easing.ease
    }).start(({ finished }) => {
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  };
  async componentDidMount() {
    this.animateTitle();
    const customers = await ajax.fetchInitialCustomers();
    this.setState({ customers });
  }
  searchCustomers = async searchTerm => {
    let customersFromSearch = [];
    if (searchTerm) {
      customersFromSearch = await ajax.fetchCustomerSearchResults(searchTerm);
    }
    this.setState({ customersFromSearch, activeSearchTerm: searchTerm });
  };
  setCurrentCustomer = (customerId) => {
    this.setState({
      currentCustomerId: customerId,
    });
  };
  unsetCurrentCustomer = () => {
    this.setState({
      currentCustomerId: null
    });
  };
  currentCustomer = () => {
    return this.state.customers.find(
      (customer) => customer.key === this.state.currentCustomerId
    );
  };
  render() {
    if (this.state.currentCustomerId) {
      return (
        <View style={styles.main}>
          <CustomerDetail
            initialCustomerData={this.currentCustomer()}
            onBack={this.unsetCurrentCustomer}
          />
        </View>
      );
    }
    const customersToDisplay =
      this.state.customersFromSearch.length > 0
        ? this.state.customersFromSearch
        : this.state.customers;

    if (customersToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar
            searchCustomers={this.searchCustomers}
            initialSearchTerm={this.state.activeSearchTerm}
          />
          <CustomerList
            customers={customersToDisplay}
            onItemPress={this.setCurrentCustomer}
          />
        </View>
      );
    }
    return (
      <Animated.View style={[{ left: this.titleXPos }, styles.container]}>
        <Text style={styles.header}>STORITY</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    marginTop: 30
  },
  header: {
    fontSize: 40
  }
});

export default App;
