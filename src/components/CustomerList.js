import React from "react";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";
import CustomerItem from "./CustomerItem";

class CustomerList extends React.Component {
  static propTypes = {
    customers: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired
  };
  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.customers}
          renderItem={({ item }) => (
            <CustomerItem customer={item} onPress={this.props.onItemPress} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#eee",
    width: "100%"
  }
});

export default CustomerList;
