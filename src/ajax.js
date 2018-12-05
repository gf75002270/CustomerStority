const apiHost = "https://bakesaleforgood.com";
//const apiHostN ="https://randomapi.com/api/80bcf9248c84d642d9e85f3241199439";

export default {
  async fetchInitialCustomers() {
    try {
      const response = await fetch(apiHost + "/api/deals");
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchCustomerDetail(customerId) {
    try {
      const response = await fetch(apiHost + "/api/deals/" + customerId);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchCustomerSearchResults(searchTerm) {
    try {
      const response = await fetch(
        apiHost + "/api/deals?searchTerm=" + searchTerm
      );
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
};
