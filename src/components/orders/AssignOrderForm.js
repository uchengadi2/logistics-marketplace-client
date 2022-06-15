import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 250,
    marginLeft: 130,
    marginTop: 30,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function AssignOrderForm(props) {
  const classes = useStyles();

  const [vendor, setVendor] = useState();
  const [product, setProduct] = useState();
  const [vendorTypeCategory, setVendorTypeCategory] = useState();

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handleVendorTypeCategoryChange = (event) => {
    setVendorTypeCategory(event.target.value);
  };

  const renderOrderForAssignmentField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Order Number"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderOrderedCategoryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Ordered Category"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderNumberOfVehicleOrderedInCategoryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Ordered number of Vehicle"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderVendorListField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="vendorlist"
            id="vendorlist"
            value={vendor}
            onChange={handleVendorChange}
            label="Vendor"
            style={{ width: 250, marginTop: 15 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select Partner/Vendor </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorProductsField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="productlist"
            id="productlist"
            value={product}
            onChange={handleProductChange}
            label="Vendor Product"
            style={{ width: 250, marginTop: 15, marginLeft: 5 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Choose Product/Vehicle </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductImageField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Product Image"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        multiline={true}
        minRows={7}

        //onChange={handleInput}
      />
    );
  };

  const renderProductDetailField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Product Details"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        multiline={true}
        minRows={7}

        //onChange={handleInput}
      />
    );
  };

  const renderSelectProductNumberForAssignmentField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Enter number of product to assign to Vendor"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderRemainingOrderedPoductNumberField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Remaining Unassigned number of Product"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        disabled
        style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderSelectableVendorCategoryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Choose the required type of Vendors/Partners to execute this task
          </FormLabel>
          <RadioGroup
            aria-label="vendorTypeCategory"
            name="vendorTypeCategory"
            value={vendorTypeCategory}
            onChange={handleVendorTypeCategoryChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value="city"
                  control={<Radio />}
                  label="Vendors in the same City/City Cluster  with Consignment Location"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  value="state"
                  control={<Radio />}
                  label="Vendors in the same State with Consignment Location"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="country"
                  control={<Radio />}
                  label="Vendors in the same Country with Consignment Location"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Assign Order to Partner/Vendor
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="assignOrderForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 420,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Grid container direction="row" style={{ marginTop: 15 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="orderforassignment"
              name="orderforassignment"
              type="text"
              component={renderOrderForAssignmentField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="orderedcategory"
              name="orderedcategory"
              type="text"
              component={renderOrderedCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="numberofvehicleordered"
              name="numberofvehicleordered"
              type="number"
              component={renderNumberOfVehicleOrderedInCategoryField}
            />
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 25 }}>
          <Field
            label=""
            id="selectablevendorslist"
            name="selectablevendorslist"
            type="number"
            component={renderSelectableVendorCategoryField}
          />
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "49%" }}>
            <Field
              label=""
              id="vendor"
              name="vendor"
              type="text"
              component={renderVendorListField}
            />
          </Grid>
          <Grid item style={{ width: "49%", marginLeft: 5 }}>
            <Field
              label=""
              id="vendorproducts"
              name="vendorproducts"
              type="text"
              component={renderVendorProductsField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "49%" }}>
            <Field
              label=""
              id="productimage"
              name="productimage"
              type="image"
              component={renderProductImageField}
            />
          </Grid>
          <Grid item style={{ width: "50%", marginLeft: 5 }}>
            <Field
              label=""
              id="productdetails"
              name="productdetails"
              type="text"
              component={renderProductDetailField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "50%" }}>
            <Field
              label=""
              id="productnumbertoassign"
              name="productnumbertoassign"
              type="number"
              component={renderSelectProductNumberForAssignmentField}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginLeft: 10 }}>
            <Field
              label=""
              id="remainingproductnumber"
              name="remainingproductnumber"
              type="number"
              component={renderRemainingOrderedPoductNumberField}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Assign Order to Vendor
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "assignOrderForm",
})(AssignOrderForm);
