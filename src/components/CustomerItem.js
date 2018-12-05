import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { priceDisplay } from "../util";

class CustomerItem extends React.Component {
  static propTypes = {
    customer: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  };
  handlePress = () => {
    this.props.onPress(this.props.customer.key);
  };
  render() {
    const { customer } = this.props;
    return (
      <TouchableOpacity style={styles.customer} onPress={this.handlePress}>
        <Image source={{ uri: customer.media[0] }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{customer.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{customer.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(customer.price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 12
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#ccc"
  },
  info: {
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#bbb",
    borderWidth: 1,
    borderTopWidth: 0
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  footer: {
    flexDirection: "row"
  },
  cause: {
    flex: 2
  },
  price: {
    flex: 1,
    textAlign: "right"
  }
});

export default CustomerItem;
