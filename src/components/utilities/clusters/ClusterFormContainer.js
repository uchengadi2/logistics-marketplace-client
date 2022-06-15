import React from "react";
import { connect } from "react-redux";
import { createCluster } from "../../../actions";
import ClusterForm from "./ClusterForm";

class ClusterFormContainer extends React.Component {
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
    this.props.createCluster(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <>
        <ClusterForm onSubmit={this.onSubmit} />
      </>
    );
  }
}

export default connect(null, { createCluster })(ClusterFormContainer);
