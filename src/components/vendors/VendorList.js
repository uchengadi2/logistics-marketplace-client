import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchVendors } from "../../actions";
import DataGridContainer from "../DataGridContainer";
import VendorEdit from "./VendorEdit";
import VendorDelete from "./VendorDelete";

class VendorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      blacklistOpen: false,
      id: null,
      params: {},
    };
  }
  componentDidMount() {
    this.props.fetchVendors(this.props.token);
  }

  handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ deleteOpen: false });
  };

  handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ editOpen: false });
  };

  renderEditDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          open={this.state.editOpen}
          onClose={() => [
            this.setState({ editOpen: false }),
            history.push("/vendors"),
          ]}
        >
          <DialogContent>
            <VendorEdit
              token={this.props.token}
              userId={this.props.userId}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderDeleteDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          // style={{ zIndex: 1302 }}
          open={this.state.deleteOpen}
          onClose={() => [
            this.setState({ deleteOpen: false }),
            history.push(`/vendors`),
          ]}
        >
          <DialogContent>
            <VendorDelete
              token={this.props.token}
              userId={this.props.userId}
              id={this.state.id}
              handleDialogOpenStatus={this.handleDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderBlackListDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.blacklistOpen}
          onClose={() => [
            this.setState({ blacklistOpen: false }),
            history.push(`/vendors`),
          ]}
        >
          <DialogContent>
            <Typography>This is the blacklist dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderVendorList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 50 },
      { field: "name", headerName: "Vendor Name", width: 300 },
      { field: "description", headerName: "Description", width: 450 },
      { field: "country", headerName: "Country", width: 200 },
      { field: "contactPersonName", headerName: "Contact Name", width: 200 },
      {
        field: "editaction",
        headerName: "",
        width: 30,
        description: "Update row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <EditRoundedIcon
              onClick={() => [
                this.setState({
                  editOpen: true,
                  id: params.id,
                  params: params.row,
                }),
                history.push(`/vendors/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "blacklistaction",
        headerName: "",
        width: 30,
        description: "Blacklist city",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <CancelRoundedIcon
              style={{ color: "black" }}
              onClick={() => [
                this.setState({ blacklistOpen: true, id: params.id }),
                history.push(`/vendors/blacklist/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "deleteaction",
        headerName: "",
        width: 30,
        description: "Delete row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <DeleteRoundedIcon
              style={{ color: "red" }}
              onClick={() => [
                this.setState({ deleteOpen: true, id: params.id }),
                history.push(`/vendors/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];

    this.props.vendors.map((vendor) => {
      let row = {
        numbering: ++counter,
        id: vendor.id,
        name: vendor.name,
        description: vendor.description,
        city: vendor.location.locationCity[0],
        country: vendor.vendorCountry[0],
        contactPersonName: vendor.contactPerson.contactPersonName,
      };
      rows.push(row);
    });

    return <DataGridContainer columns={columns} rows={rows} />;
  };
  render() {
    return (
      <>
        {this.renderDeleteDialogForm()}
        {this.renderEditDialogForm()}
        {this.renderVendorList()}
        {this.renderBlackListDialogForm()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { vendors: Object.values(state.vendor) };
};

export default connect(mapStateToProps, { fetchVendors })(VendorList);
