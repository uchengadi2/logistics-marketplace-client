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
    marginTop: 10,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 180,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function CityEditForm(props) {
  const classes = useStyles();
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [params, setParams] = useState({});
  const [selectedState, setSelectedState] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/cities/${props.params.id}`);
      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((city) => {
        console.log("this is the products:", city);
        row = {
          id: city.id,
          name: city.name,
          code: city.code,
          description: city.description,
          country: city.country[0],
          state: city.state[0],
          securityStatus: city.securityStatus,
        };
      });
      setParams(row);
      setSelectedCountry(row.country);
      setSelectedState(row.state);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/states", {
        params: { country: selectedCountry },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [selectedCountry]);

  const handleSelectedStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSelectedCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setStateList([]);
  };

  //get all country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get all state list
  const renderStateList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderNameField = ({
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
        helperText="Enter the name of the city"
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

  const renderCityCodeField = ({
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
        helperText="Enter the code for this City"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.code}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderStateField = ({
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
            labelId="state"
            id="state"
            value={selectedState ? selectedState : params.state}
            onChange={handleSelectedStateChange}
            label="State"
            style={{ marginTop: 20, width: 500 }}
          >
            {renderStateList()}
          </Select>
          <FormHelperText>
            Select State/Region/Province where City is located
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCountryField = ({
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
            labelId="country"
            id="country"
            value={selectedCountry ? selectedCountry : params.country}
            onChange={handleSelectedCountryChange}
            label="Country"
            style={{ marginTop: 20, width: 500 }}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Country where city is located</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderDescriptionField = ({
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
        helperText="Describe the city"
        label={label}
        id={input.name}
        value={params.description}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={5}
        {...custom}
        // onChange={handleInput}
      />
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
          City Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="cityForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 420,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Grid container direction="row">
          <Grid item style={{ width: "65%" }}>
            <Field
              label=""
              id="name"
              name="name"
              type="text"
              component={renderNameField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="code"
              name="code"
              type="text"
              component={renderCityCodeField}
            />
          </Grid>
        </Grid>

        <Field
          label=""
          id="country"
          name="country"
          type="text"
          component={renderCountryField}
        />

        <Field
          label=""
          id="state"
          name="state"
          type="text"
          component={renderStateField}
        />

        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderDescriptionField}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Update City
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "cityForm",
})(CityEditForm);
