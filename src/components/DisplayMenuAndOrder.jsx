import React, { Component } from "react";
import { getData } from "../modules/productData";
import axios from "axios";
import { authenticate } from "../modules/authenticate";

class DisplayMenuAndOrder extends Component {
  state = {
    productData: [],
    message: {},
    orderDetails: {},
    showOrder: false
  };

  componentDidMount() {
    this.getProductData();
  }

  async getProductData() {
    let result = await getData();
    this.setState({ productData: result.data.products });
  }

  async addToOrder(event) {
    let id = event.target.parentElement.dataset.id;
    let result;
    if (this.state.orderDetails.hasOwnProperty("id")) {
      result = await axios.put(
        `http://localhost:3000/api/orders/${this.state.orderDetails.id}`,
        { product_id: id }
      );
    } else {
      result = await axios.post("http://localhost:3000/api/orders", {
        product_id: id
      });
    }
    this.setState({
      message: { id: id, message: result.data.message },
      orderDetails: result.data.order
    });
  }

  finalizeOrder() {
    this.setState({
      message: { id: 0, message: "Your order will be ready in 30 minutes!" }
    });
  }

  render() {
    let entreeIndex, starterIndex, dessertIndex, orderDetailsDisplay;

    if (
      Array.isArray(this.state.productData) &&
      this.state.productData.length
    ) {
      starterIndex = (
        <div id="starter-index">
          {this.state.productData.map(item => {
            if (item.category === "starter") {
              return (
                <div
                  key={item.id}
                  id={`product-${item.id}`}
                  data-id={item.id}
                  data-price={item.price}
                >
                  <h4>{item.name}</h4>
                  {item.description} {item.price}kr
                  <button id="button" onClick={this.addToOrder.bind(this)}>
                    Add to order
                  </button>
                  {parseInt(this.state.message.id) === item.id && (
                    <p class="message">{this.state.message.message}</p>
                  )}
                </div>
              );
            }
          })}
        </div>
      );
      entreeIndex = (
        <div id="entree-index">
          {this.state.productData.map(item => {
            if (item.category === "entree") {
              return (
                <div
                  key={item.id}
                  id={`product-${item.id}`}
                  data-id={item.id}
                  data-price={item.price}
                >
                  <h4>{item.name}</h4>
                  {item.description} {item.price}kr
                  <button id="button" onClick={this.addToOrder.bind(this)}>
                    Add to order
                  </button>
                  {parseInt(this.state.message.id) === item.id && (
                    <p class="message">{this.state.message.message}</p>
                  )}
                </div>
              );
            }
          })}
        </div>
      );
      dessertIndex = (
        <div id="dessert-index">
          {this.state.productData.map(item => {
            if (item.category === "dessert") {
              return (
                <div
                  key={item.id}
                  id={`product-${item.id}`}
                  data-id={item.id}
                  data-price={item.price}
                >
                  <h4>{item.name}</h4>
                  {item.description} {item.price}kr
                  <button id="button" onClick={this.addToOrder.bind(this)}>
                    Add to order
                  </button>
                  {parseInt(this.state.message.id) === item.id && (
                    <p class="message">{this.state.message.message}</p>
                  )}
                </div>
              );
            }
          })}
        </div>
      );
    }
    if (this.state.orderDetails.hasOwnProperty("products")) {
      orderDetailsDisplay = this.state.orderDetails.products.map(item => {
        return <li key={item.name}>{`${item.amount} x ${item.name}`}</li>;
      });
    }

    return (
      <>
        {this.state.message.id === 0 && (
          <h2 className="message">{this.state.message.message}</h2>
        )}
        {this.state.orderDetails.hasOwnProperty("products") && (
          <button
            onClick={() => this.setState({ showOrder: !this.state.showOrder })}
          >
            View order
          </button>
        )}
        {this.state.showOrder && (
          <>
            <ul id="order-details">{orderDetailsDisplay}</ul>
            <p>Total: {this.state.orderDetails.order_total} kr</p>
            <button onClick={this.finalizeOrder.bind(this)}>Confirm!</button>
          </>
        )}
        <h2>Starters</h2>
        {starterIndex}
        <h2>Entrees</h2>
        {entreeIndex}
        <h2>Dessert</h2>
        {dessertIndex}
      </>
    );
  }
}
export default DisplayMenuAndOrder;
