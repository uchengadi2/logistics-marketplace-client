import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
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
    width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 180,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function UserEditForm(props) {
  const classes = useStyles();
  const [role, setRole] = useState("");
  const [type, setType] = useState();
  const [value, setValue] = useState("staff");
  const [params, setParams] = useState({});
  const [selectedRole, setSelectedRole] = useState();
  const [selectedType, setSelectedType] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/users/${props.params.id}`);
      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((user) => {
        console.log("this is the user:", user);
        row = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          type: user.type,
          active: user.active,
        };
      });
      setParams(row);
      setSelectedRole(row.role);
      setSelectedType(row.type);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handleUserRoleChange = (event) => {
    setRole(event.target.value);
    setSelectedRole(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    setSelectedType(event.target.value);
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
        helperText="User Name"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.name}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 15 }}

        //onChange={handleInput}
      />
    );
  };

  const renderUserRoleField = ({
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
            labelId="role"
            id="role"
            value={selectedRole ? selectedRole : params.role}
            onChange={handleUserRoleChange}
            label="Role"
            style={{ marginTop: 15, width: 500 }}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"partner_user"}>Partner User</MenuItem>
            <MenuItem value={"partner_admin"}>Partner Admin</MenuItem>
            <MenuItem value={"customer"}>Customer</MenuItem>
          </Select>
          <FormHelperText>User Role</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderEmailField = ({
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
        helperText="User Email Address"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.email}
        fullWidth
        //required
        type={type}
        {...custom}
        disabled
        style={{ marginTop: 15 }}

        //onChange={handleInput}
      />
    );
  };

  const renderTypeRadioField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box style={{ marginTop: 15 }}>
        <FormControl component="fieldset">
          <FormLabel style={{ color: "blue" }} component="legend">
            User Type
          </FormLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={selectedType ? selectedType : params.type}
            onChange={handleTypeChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value="staff"
                  control={<Radio />}
                  label="Staff"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  value="partner"
                  control={<Radio />}
                  label="Partner"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="customer"
                  control={<Radio />}
                  label="Customer"
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
    <>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          User Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="userForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Field
          label=""
          id="email"
          name="email"
          type="email"
          component={renderEmailField}
        />

        <Grid container direction="row">
          <Grid item style={{ width: "100%" }}>
            <Field
              label=""
              id="name"
              name="name"
              type="text"
              component={renderNameField}
            />
          </Grid>
        </Grid>

        <Field
          label=""
          id="role"
          name="role"
          type="text"
          component={renderUserRoleField}
        />

        <Field
          label=""
          id="type"
          name="type"
          component={renderTypeRadioField}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Update User
        </Button>
      </Box>
      {/* </form> */}
    </>
  );
}

export default reduxForm({
  form: "userForm",
})(UserEditForm);
