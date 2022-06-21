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
    width: 100,
    marginLeft: 150,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function CategoryForm(props) {
  const classes = useStyles();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const onImageChange = (e) => {
    setImage(e.target.value);
    console.log("the image is:", image);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    //console.log("the image is:", image);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    //console.log("the image is:", image);
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
        //value={input.value}
        fullWidth
        multiline={true}
        minRows={1}
        //required
        type={type}
        {...custom}
        {...input}
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
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Describe the Category"
        label={label}
        id={input.name}
        name={input.name}
        //value={input.value}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={6}
        {...custom}
        {...input}
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
    delete input.value;
    return (
      <TextField
        id={input.name}
        variant="outlined"
        type={type}
        fullWidth
        style={{ marginTop: 20 }}
        helperText="Upload Category Image"
        {...input}
        {...custom}
      />
    );
  };

  const onSubmit = (formValues) => {
    const form = new FormData();
    form.append("name", formValues.name);
    form.append("description", formValues.description);
    form.append("createdBy", props.userId);
    if (formValues.image) {
      form.append("image", formValues.image[0]);
    }

    props.onSubmit(form);
  };

  return (
    <form id="categoryForm">
      <Box
        // component="form"
        // id="categoryForm"
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
            Create A New Category
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="name"
          name="name"
          type="text"
          component={renderNameField}
        />

        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderDescriptionField}
        />

        <Field
          id="image"
          name="image"
          type="file"
          accept="image/*"
          component={renderImageField}
          floatingLabelText={"Upload Image"}
          fullWidth={true}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "categoryForm",
})(CategoryForm);
