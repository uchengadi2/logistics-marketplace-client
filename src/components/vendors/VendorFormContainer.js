import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VendorForm from "./VendorForm";

import { createVendor } from "./../../actions";

class VendorFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log("all the props are:", this.props);
  }

  onSubmit = (formValues) => {
    this.props.createVendor(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <div>
        <VendorForm onSubmit={this.onSubmit} token={this.props.token} />
      </div>
    );
  }
}

export default connect(null, { createVendor })(VendorFormContainer);
