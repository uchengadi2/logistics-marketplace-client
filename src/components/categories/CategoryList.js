import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchCategories } from "../../actions";
import CategoryEdit from "./CategoryEdit";
import CategoryDelete from "./CategoryDelete";
import DataGridContainer from "../DataGridContainer";

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      id: null,
      // params: { name: "", description: "" },
      params: {},
    };
  }
  componentDidMount() {
    this.props.fetchCategories();
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
          style={{ zIndex: 1302 }}
          open={this.state.editOpen}
          onClose={() => [
            this.setState({ editOpen: false }),
            history.push("/categories"),
          ]}
        >
          <DialogContent>
            <CategoryEdit
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
            history.push(`/categories`),
          ]}
        >
          <DialogContent>
            <CategoryDelete
              token={this.props.token}
              id={this.state.id}
              handleDialogOpenStatus={this.handleDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "name", headerName: "Category Name", width: 300 },
      { field: "description", headerName: "Description", width: 450 },
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
                  // params: {
                  //   name: params.row.name,
                  //   description: params.row.description,
                  // },
                }),
                history.push(`/categories/edit/${params.id}`),
                //console.log("the row data is:", params.row),
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
                history.push(`/categories/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];

    this.props.categories.map((category) => {
      let row = {
        numbering: ++counter,
        id: category.id,
        name: category.name,
        description: category.description,
      };
      rows.push(row);
    });

    return <DataGridContainer columns={columns} rows={rows} />;
  };
  render() {
    //console.log("the props is", this.props.categories);

    return (
      <>
        {this.renderDeleteDialogForm()}
        {this.renderEditDialogForm()}
        {this.renderList()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: Object.values(state.category) };
};
export default connect(mapStateToProps, { fetchCategories })(CategoryList);
