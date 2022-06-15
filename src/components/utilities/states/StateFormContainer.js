import React from "react";
import { connect } from "react-redux";
import { createState } from "../../../actions";
import StateForm from "./StateForm";

class StateFormContainer extends React.Component {
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
    this.props.createState(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <div>
        <StateForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createState })(StateFormContainer);
