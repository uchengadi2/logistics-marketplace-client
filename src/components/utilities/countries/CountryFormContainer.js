import React from "react";
import { connect } from "react-redux";
import { createCountry } from "../../../actions";
import CountryForm from "./CountryForm";

class CountryFormContainer extends React.Component {
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
    this.props.createCountry(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <div>
        <CountryForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createCountry })(CountryFormContainer);
