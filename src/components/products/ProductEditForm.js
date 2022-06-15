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
    width: 150,
    marginLeft: 180,
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

function ProductEditForm(props) {
  const classes = useStyles();
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState();
  const [params, setParams] = useState({});
  const [selectedCity, setSelectedCity] = useState();
  const [selectedVendor, setSelectedVendor] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [vendorList, setVendorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/products/${props.params.id}`);
      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((product) => {
        console.log("this is the products:", product);
        row = {
          id: product.id,
          name: product.name,
          shortDescription: product.shortDescription,
          fullDescription: product.fullDescription,
          plateNumber: product.plateNumber,
          coverImage: product.coverImage,
          images: product.image,
          quantity: product.quantity,
          make: product.features.make,
          model: product.features.model,
          chassis: product.features.chassis,
          category: product.category[0],
          vendor: product.vendor[0],
          createdAt: product.createdAt,
          permanentLocationAddress:
            product.permanentLocation.permanentLocationAddress,
          permanentLocationLatitude:
            product.permanentLocation.permanentLocationLatitude,
          permanentLocationLongitide:
            product.permanentLocation.permanentLocationLongitide,
          availabilityStatus: product.permanentLocation.availabilityStatus,
          city: product.permanentLocation.city[0],
          startingRouteCity: product.startingRoute.city,
          dateAssigned: product.startingRoute.dateAssigned,
          assignedBy: product.startingRoute.assignedBy,
        };
      });
      setParams(row);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/vendors");
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setVendorList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/cities");
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
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
      const response = await data.get("/categories");
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const onImageChange = (e) => {
    setImage(e.target.value);
    console.log("the image is:", image);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSelectedCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSelectedCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSelectedVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  //get all vendor list
  const renderVendorList = () => {
    return vendorList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get all category list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get all city list
  const renderCityList = () => {
    return cityList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  console.log("this location city is:", params.city);
  console.log("this city list is:", cityList);
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
            value={selectedVendor ? selectedVendor : params.vendor}
            onChange={handleSelectedVendorChange}
            label="Vendor"
            style={{ marginTop: 20, width: 500 }}
          >
            {renderVendorList()}
          </Select>
          <FormHelperText>Select Vendor/Partner</FormHelperText>
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
            value={selectedCategory ? selectedCategory : params.category}
            onChange={handleSelectedCategoryChange}
            label="Category"
            style={{ marginTop: 20, width: 500 }}
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
        value={params.name}
        fullWidth
        //required
        type={type}
        {...custom}

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
        value={params.plateNumber}
        fullWidth
        //required
        type={type}
        {...custom}

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
        value={params.shortDescription}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={4}
        {...custom}
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
        value={params.fullDescription}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={12}
        {...custom}
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
        value={params.permanentLocationAddress}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={4}
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
            id="city"
            value={selectedCity ? selectedCity : params.city}
            onChange={handleSelectedCityChange}
            label="City"
            style={{ marginTop: 20, width: 500 }}
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
        value={params.permanentLocationLatitude}
        fullWidth
        //required
        type={type}
        {...custom}

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
        value={params.permanentLocationLongitide}
        fullWidth
        //required
        type={type}
        {...custom}

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
        value={params.make}
        fullWidth
        //required
        type={type}
        {...custom}

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
        value={params.model}
        fullWidth
        //required
        type={type}
        {...custom}

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
        value={params.chassis}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderImageField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        id={input.name}
        variant="outlined"
        type={type}
        name={input.name}
        fullWidth
        style={{ marginTop: 20 }}
        onChange={onImageChange}
        helperText="Upload Vehicle Image"
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <>
      <form id="productForm" className={classes.formStyles}>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "blue", fontSize: "1.5em" }}
            component="legend"
          >
            Vehicle Details
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
          <Grid container direction="row" style={{ marginTop: 20 }}>
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
          </Grid>
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
          <Field name="image" type="file" component={renderImageField} />
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={props.handleSubmit(onSubmit)}
          >
            Update Vehicle
          </Button>
        </Box>
      </form>
    </>
  );
}

export default reduxForm({
  form: "productForm",
})(ProductEditForm);
