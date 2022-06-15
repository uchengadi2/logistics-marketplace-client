import React from "react";
import { connect } from "react-redux";
import { createCurrency } from "../../../actions";
import CurrencyForm from "./CurrencyForm";

class CurrencyFormContainer extends React.Component {
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
    this.props.createCurrency(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <div>
        <CurrencyForm onSubmit={this.onSubmit} />
       
      </div>
    );
  }
}

export default connect(null, { createCurrency })(CurrencyFormContainer);
