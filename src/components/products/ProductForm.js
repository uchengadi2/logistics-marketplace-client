import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Typography } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import data from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 500,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 200,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  firstSection: {
    width: 300,
  },
}));

function ProductForm(props) {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [image, setImage] = useState();
  const [cityList, setCityList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/cities`);
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ id: city._id, name: city.name });
      });
      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/categories`);
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/vendors`);
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setVendorList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //get the vendor list
  const renderVendorList = () => {
    return vendorList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the city list
  const renderCityList = () => {
    return cityList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the vendor list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const onImageChange = (e) => {
    setImage(e.target.value);
    console.log("the image is:", image);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
    setSelectedVendor(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setSelectedCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSelectedCategory(event.target.value);
  };

  const renderVendorField = ({
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
            labelId="vendor"
            id="vendor"
            value={vendor}
            onChange={handleVendorChange}
            label="Vendor"
            style={{ width: 500, marginTop: 10 }}
            {...input}
          >
            {renderVendorList()}
          </Select>
          <FormHelperText>Select Vendor</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCategoryField = ({
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
            labelId="category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            style={{ marginTop: 20, width: 500 }}
            {...input}
          >
            {renderCategoryList()}
          </Select>
          <FormHelperText>Select Vehicle Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVechicleNameField = ({
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
        helperText="Enter the name of the Vehicle"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderVehicleUniqueIdField = ({
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
        helperText="Enter the unique number of the Vehicle"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderShortDescriptionField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Enter the short description of the vehicle"
        label={label}
        id={input.name}
        // value={formInput.description}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={4}
        {...custom}
        {...input}
        // onChange={handleInput}
      />
    );
  };

  const renderFullDescriptionField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Enter the full description of the vehicle"
        label={label}
        id={input.name}
        // value={formInput.description}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={12}
        {...custom}
        {...input}
        // onChange={handleInput}
      />
    );
  };

  const renderVehiclePermanentAddressField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Enter the permanent address of this vehicle"
        label={label}
        id={input.name}
        // value={formInput.description}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={4}
        {...input}
        {...custom}
        // onChange={handleInput}
      />
    );
  };

  const renderLocationCityField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="city"
            id="city_id"
            value={city}
            onChange={handleCityChange}
            label="City"
            style={{ marginTop: 20, width: 500 }}
            {...input}
          >
            {renderCityList()}
          </Select>
          <FormHelperText>
            Select the city of the permanent address
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderLatituteField = ({
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
        helperText="Enter the address location latitute"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderLongtituteField = ({
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
        helperText="Enter the address location longtitude"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderVehicleMakeField = ({
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
        helperText="Enter the vehicle make"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderVehicleModelField = ({
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
        helperText="Enter the vehicle model"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderVehicleChassisField = ({
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
        helperText="Enter the vehicle Chasis"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderImageCoverField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    delete input.value;
    return (
      <TextField
        id={input.name}
        variant="outlined"
        type={type}
        name={input.name}
        fullWidth
        style={{ marginTop: 20 }}
        //onChange={onImageChange}
        helperText="Upload Vehicle Image Cover"
        {...input}
      />
    );
  };

  const renderProductImagesField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    delete input.value;
    return (
      <TextField
        id={input.name}
        variant="outlined"
        type={type}
        name={input.name}
        fullWidth
        style={{ marginTop: 20 }}
        //onChange={onImageChange}
        helperText="Upload This Vehicle Other Images (maximum of 5)"
        {...input}
        inputProps={{ multiple: true }}
      />
    );
  };

  const onSubmit = (formValues) => {
    const form = new FormData();
    form.append("name", formValues.name);
    form.append("shortDescription", formValues.shortDescription);
    form.append("fullDescription", formValues.fullDescription);
    form.append("plateNumber", formValues.plateNumber);
    form.append("category", formValues.category);
    form.append("vendor", formValues.vendor);
    form.append("createdBy", props.userId);
    form.append("features.make", formValues.make);
    form.append("features.model", formValues.model);
    form.append("features.chassis", formValues.chassis);

    form.append(
      "permanentLocation.permanentLocationAddress",
      formValues.permanentLocationAddress
    );

    form.append("permanentLocation.city", formValues.city);

    if (formValues.imageCover) {
      form.append("imageCover", formValues.imageCover[0]);
    }

    props.onSubmit(form);
  };

  return (
    <div>
      <form id="productForm" className={classes.formStyles}>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "blue", fontSize: "1.5em" }}
            component="legend"
          >
            <Typography variant="h5">Enter Vehicle Details</Typography>
          </FormLabel>
        </Grid>
        <Box
          sx={{
            width: 500,
            height: 420,
          }}
          noValidate
          autoComplete="off"
        >
          <Field
            label=""
            id="vendor"
            name="vendor"
            type="text"
            component={renderVendorField}
          />
          <Field
            label=""
            id="name"
            name="name"
            type="text"
            component={renderVechicleNameField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />
          <Field
            label=""
            id="plateNumber"
            name="plateNumber"
            type="text"
            component={renderVehicleUniqueIdField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />

          <Field
            label=""
            id="shortDescription"
            name="shortDescription"
            type="text"
            component={renderShortDescriptionField}
          />
          <Field
            label=""
            id="fullDescription"
            name="fullDescription"
            type="text"
            component={renderFullDescriptionField}
          />

          <Field
            label=""
            id="category"
            name="category"
            type="text"
            component={renderCategoryField}
          />
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Vehicle Permanent Location
            </FormLabel>
          </Grid>
          <Field
            label=""
            id="permanentLocationAddress"
            name="permanentLocationAddress"
            type="text"
            component={renderVehiclePermanentAddressField}
          />
          <Field
            label=""
            id="city"
            name="city"
            type="text"
            component={renderLocationCityField}
          />
          {/* <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item>
              <Field
                label=""
                id="permanentLocationLatitude"
                name="permanentLocationLatitude"
                type="number"
                component={renderLatituteField}
                style={{ width: 220 }}
              />
            </Grid>
            <Grid item>
              <Field
                label=""
                id="permanentLocationLongitide"
                name="permanentLocationLongitide"
                type="number"
                component={renderLongtituteField}
                style={{ width: 250, marginLeft: 30 }}
              />
            </Grid>
          </Grid> */}
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="make"
                name="make"
                type="text"
                component={renderVehicleMakeField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="model"
                name="model"
                type="text"
                component={renderVehicleModelField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="chassis"
                name="chassis"
                type="text"
                component={renderVehicleChassisField}
              />
            </Grid>
          </Grid>
          <Field
            name="imageCover"
            type="file"
            accept="image/*"
            component={renderImageCoverField}
          />
          {/* <Field
            name="images"
            type="file"
            accept="image/*"
            component={renderProductImagesField}
          /> */}
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={props.handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default reduxForm({
  form: "productForm",
})(ProductForm);
