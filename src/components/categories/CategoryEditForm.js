import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
    width: 180,
    marginLeft: 100,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function CategoryEditForm(props) {
  const classes = useStyles();
  const [image, setImage] = useState();

  const onImageChange = (e) => {
    setImage(e.target.value);
    console.log("the image is:", image);
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
        helperText="Enter the name of the Category"
        variant="outlined"
        label={label}
        id={input.name}
        name={input.name}
        value={props.params.name}
        {...input.name}
        {...custom}
        defaultValue="Lorry"
        fullWidth
        //required
        type={type}
        //onChange={handleTextInput}
      />
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
    console.log("this are the input:", input);
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Describe the Category"
        label={label}
        id={input.name}
        name={input.name}
        //defaultValue="This is Lorry"
        value={props.params.description}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={6}
        {...custom}
        {...input.name}
        //onChange={handleDescriptionInput}
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
        helperText="Upload Category Image"
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <>
      {/* <form id="categoryForm"> */}
      <Box
        component="form"
        id="categoryForm"
        // onSubmit={onSubmit}
        sx={{
          width: 400,
          height: 450,
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        >
          <FormLabel
            style={{ color: "blue", fontSize: "1.5em" }}
            component="legend"
          >
            Category Details
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="name"
          name="name"
          type="text"
          component={renderNameField}
          value={props.params.name || ""} //try to set value, but not working
          // onChange={(e) => {
          //   props.userUpdateTextInput({
          //     name: e.currentTarget.name,
          //     value: e.currentTarget.value,
          //   });
          // }}
        />

        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderDescriptionField}
          value={props.params.description || ""} //try to set value, but not working
          // onChange={(e) => {
          //   props.userUpdateTextInput({
          //     description: e.currentTarget.name,
          //     value: e.currentTarget.value,
          //   });
          // }}
        />

        <Field name="image" type="file" component={renderImageField} />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Update Category
        </Button>
      </Box>
      {/* </form> */}
    </>
  );
}

export default reduxForm({
  form: "categoryForm",
})(CategoryEditForm);
