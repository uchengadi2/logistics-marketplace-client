import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchCities } from "../../actions";
import DataGridContainer from "../DataGridContainer";
import CityEdit from "./CityEdit";
import CityDelete from "./CityDelete";

class CityList extends React.Component {
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
    this.props.fetchCities(this.props.token);
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
          //style={{ zIndex: 1302 }}
          open={this.state.editOpen}
          onClose={() => [
            this.setState({ editOpen: false }),
            history.push("/cities"),
          ]}
        >
          <DialogContent>
            <CityEdit
              token={this.props.token}
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
          //style={{ zIndex: 1302 }}
          open={this.state.deleteOpen}
          onClose={() => [
            this.setState({ deleteOpen: false }),
            history.push(`/cities`),
          ]}
        >
          <DialogContent>
            <CityDelete
              token={this.props.token}
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
            history.push(`/cities`),
          ]}
        >
          <DialogContent>
            <Typography>This is the blacklist dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  renderCitiesList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "name", headerName: "City Name", width: 300 },
      { field: "description", headerName: "Description", width: 350 },
      { field: "country", headerName: "Country", width: 250 },
      { field: "security", headerName: "Security Status", width: 70 },
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
                history.push(`/cities/edit/${params.id}`),
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
                history.push(`/cities/blacklist/${params.id}`),
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
                history.push(`/cities/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.cities.map((city) => {
      let row = {
        numbering: ++counter,
        id: city.id,
        name: city.name,
        description: city.description,
        country: city.country[0],
        security: city.securityStatus,
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
        {this.renderCitiesList()}
        {this.renderBlackListDialogForm()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { cities: Object.values(state.city) };
};

export default connect(mapStateToProps, { fetchCities })(CityList);
