import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";

import { createProduct } from "./../../actions";

class ProductFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log("a;; the props are:", this.props);
  }

  onSubmit = (formValues) => {
    this.props.createVendor(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <div>
        <ProductForm onSubmit={this.onSubmit} token={this.props.token} />
      </div>
    );
  }
}

export default connect(null, { createProduct })(ProductFormContainer);
