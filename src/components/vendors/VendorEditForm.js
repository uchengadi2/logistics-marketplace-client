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
    width: 550,
  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 150,
    marginTop: 20,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 200,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function VendorEditForm(props) {
  const classes = useStyles();
  const [value, setValue] = useState("corporate");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countryStateList, setCountryStateList] = useState([]);
  const [stateCityList, setStateCityList] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [params, setParams] = useState({});
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const [enforceGlobalPlatformPolicy, setEnforceGlobalPlatformPolicy] =
    useState("true");
  const [
    maxNumberOfPaymentInstallmentAllowed,
    setMaxNumberOfPaymentInstallmentAllowed,
  ] = useState("1");

  //spool the vendor document & data

  useEffect(() => {
    const fetchData = async () => {
      // let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/vendors/${props.params.id}`, {
        // params: { id: props.params.id },
      });

      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((vendor) => {
        row = {
          id: vendor.id,
          name: vendor.name,
          description: vendor.description,
          city: vendor.location.locationCity[0],
          country: vendor.vendorCountry[0],
          type: vendor.type,
          exemptedCities:
            vendor.exemptedCities[0] + " " + vendor.exemptedCities[1],
          contactPersonName: vendor.contactPerson.contactPersonName,
          contactPersonPhoneNumber:
            vendor.contactPerson.contactPersonPhoneNumber[0],
          contactPersonEmailAddress:
            vendor.contactPerson.contactPersonEmailAddress,
          locationCity: vendor.location.locationCity[0],
          locationState: vendor.location.locationState[0],
          locationCountry: vendor.location.locationCountry[0],
          locationAddress: vendor.location.locationAddress,
          locationLatitude: vendor.location.locationLatitude,
          locationLongititde: vendor.location.locationLongititde,
          officePhoneNumber: vendor.location.officePhoneNumber,
          bankAccountType: vendor.bankDetails.bankAccountType,
          bankCountry: vendor.bankDetails.bankCountry[0],
          bankName: vendor.bankDetails.bankName,
          bankAccountNumber: vendor.bankDetails.bankAccountNumber,
          bankAccountName: vendor.bankDetails.bankAccountName,
          bankAccountSwiftCode: vendor.bankDetails.bankAccountSwiftCode,
          bankAccountIBAN: vendor.bankDetails.bankAccountIBAN,
          bankAccountIBAN: vendor.bankDetails.bankAccountIBAN,
          enforceGlobalPlatformPolicyContract:
            vendor.contract.enforceGlobalPlatformPolicyContract,
          permittableMaximumNumberOfPaymentInstallments:
            vendor.contract.permittableMaximumNumberOfPaymentInstallments,
          initialPaymentAgreedRemittablePercentage:
            vendor.contract.initialPaymentInstallment
              .initialPaymentAgreedRemittablePercentage,
          initialPaymentAgreedDaysToPaymentRemittance:
            vendor.contract.initialPaymentInstallment
              .initialPaymentAgreedDaysToPaymentRemittance,
          initialPaymentPlatformPercentageForRetention:
            vendor.contract.initialPaymentInstallment
              .initialPaymentPlatformPercentageForRetention,
          percentageAmountForInitialInstallmentPayment:
            vendor.contract.initialPaymentInstallment
              .percentageAmountForInitialInstallmentPayment,
          secondPaymentAgreedRemittablePercentage:
            vendor.contract.secondPaymentInstallment
              .secondPaymentAgreedRemittablePercentage,
          secondPaymentAgreedDaysToPaymentRemittance:
            vendor.contract.secondPaymentInstallment
              .secondPaymentAgreedDaysToPaymentRemittance,
          secondPaymentPlatformPercentageForRetention:
            vendor.contract.secondPaymentInstallment
              .secondPaymentPlatformPercentageForRetention,
          percentageAmountForSecondInstallmentPayment:
            vendor.contract.secondPaymentInstallment
              .percentageAmountForSecondInstallmentPayment,
          thirdPaymentAgreedRemittablePercentage:
            vendor.contract.thirdPaymentInstallment
              .thirdPaymentAgreedRemittablePercentage,
          thirdPaymentAgreedDaysToPaymentRemittance:
            vendor.contract.thirdPaymentInstallment
              .thirdPaymentAgreedDaysToPaymentRemittance,
          thirdPaymentPlatformPercentageForRetention:
            vendor.contract.thirdPaymentInstallment
              .thirdPaymentPlatformPercentageForRetention,
          percentageAmountForThirdInstallmentPayment:
            vendor.contract.thirdPaymentInstallment
              .percentageAmountForThirdInstallmentPayment,
        };
      });

      setParams(row);
      setSelectedCountry(row.locationCountry);
      setSelectedState(row.locationState);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.params.id]);

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

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/cities", {
        params: { state: selectedState },
      });
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ id: city._id, name: city.name });
      });
      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [selectedState]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSelectedCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSelectedStateChange = (event) => {
    setSelectedState(event.target.value);
    setCityList([]);
  };

  const handleSelectedCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    //currentCountryStateList(event.target.value);
    setStateList([]);
    setCityList([]);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleBankCountryChange = (event) => {
    setBankCountry(event.target.value);
  };

  const handleGlobalPolicyChange = (event) => {
    setEnforceGlobalPlatformPolicy(event.target.value);
  };

  const handleMaximumPaymentInstallmentChange = (event) => {
    setMaxNumberOfPaymentInstallmentAllowed(event.target.value);
  };

  // const newParams = Object.values(params);
  // const contactPersonName = ((params || {}).contactPerson || {})
  //   .contactPersonName;

  // const percentageAmountForThirdInstallmentPayment = (
  //   (params || {}).contract ||
  //   {}.thirdPaymentInstallment ||
  //   {}
  // ).percentageAmountForThirdInstallmentPayment;

  console.log("this is initial city  list:", cityList);
  console.log("this is the selected state listttttt:", selectedState);

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

  //get the state list
  const renderStateList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the country list
  const renderCountryList = () => {
    return countryList.map((item) => {
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
        helperText="Enter the name of the Vendor"
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
        helperText="Describe the Vendor"
        label={label}
        id={input.name}
        value={params.description}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        multiline={true}
        minRows={8}
        {...custom}
        // onChange={handleInput}
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
        fullWidth
        style={{ marginTop: 20 }}
        helperText="Upload Category Image"
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
      <Box>
        <FormControl component="fieldset">
          <FormLabel style={{ color: "blue" }} component="legend">
            Vendor Type
          </FormLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={params.type}
            onChange={handleChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value="corporate"
                  control={<Radio />}
                  label="Corporate"
                />
              </Grid>

              <Grid item></Grid>
              <FormControlLabel
                value="individual"
                control={<Radio />}
                label="individual"
              />
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const renderVendorAddressField = ({
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
        helperText="Enter the Vendor Address Location"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.locationAddress}
        fullWidth
        multiline={true}
        minRows={2}
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderVendorLocationCityField = ({
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
            value={selectedCity ? selectedCity : params.locationCity}
            onChange={handleSelectedCityChange}
            label="City"
          >
            {renderCityList()}
          </Select>
          <FormHelperText>Select City</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorLocationStateField = ({
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
            labelId="locationState"
            id="locationState"
            value={selectedState ? selectedState : params.locationState}
            onChange={handleSelectedStateChange}
            label="State"
          >
            {renderStateList()}
          </Select>
          <FormHelperText>Select State/Region/Province</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorLocationCountryField = ({
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
            labelId="locationCountry"
            id="locationCountry"
            value={selectedCountry ? selectedCountry : params.locationCountry}
            onChange={handleSelectedCountryChange}
            label="Country"
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorContactNameField = ({
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
        helperText="Enter the contact Person's Name"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.contactPersonName}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderVendorPhoneNumberField = ({
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
        helperText="Enter the contact person's phone numbers"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.contactPersonPhoneNumber}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderVendorEmailAddressField = ({
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
        helperText="Enter the contact Person's email address"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.contactPersonEmailAddress}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderBankAccountTypeField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="bankAccountType"
            id="bankAccountType"
            value={params.bankAccountType}
            onChange={handleAccountTypeChange}
            label="Account Type"
          >
            <MenuItem value={"savings"}>Savings</MenuItem>
            <MenuItem value={"current"}>Current</MenuItem>
            <MenuItem value={"domicilary"}>Domicilary</MenuItem>
          </Select>
          <FormHelperText>Select Account Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderBankAccountNumberField = ({
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
        helperText="Enter the bank account number"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.bankAccountNumber}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderBankAccountNameField = ({
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
        helperText="Enter the bank account name"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.bankAccountName}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderBankCountryField = ({
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
            labelId="backCountry"
            id="bankCountry"
            value={params.bankCountry}
            onChange={handleBankCountryChange}
            label="Bank Country"
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Bank Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderBankSwiftCodeNumberField = ({
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
        helperText="Enter the bank Swift code"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.bankAccountSwiftCode}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderBankIBANField = ({
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
        helperText="Enter the bank IBAN number"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.bankAccountIBAN}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderBankNameField = ({
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
        helperText="Enter the bank name"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.bankName}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderEnforceGlobalPlatformPolicyField = ({
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
            Enforce Platform Global Policy Contract?
          </FormLabel>
          <RadioGroup
            aria-label="enforceGlobalPlatformPolicyContract"
            name="enforceGlobalPlatformPolicyContract"
            value={params.enforceGlobalPlatformPolicyContract}
            onChange={handleGlobalPolicyChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
              </Grid>

              <Grid item></Grid>
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const rendermaxNumberOfPaymentInstallmentAllowed = ({
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
            Choose maximum number of payment installments
          </FormLabel>
          <RadioGroup
            aria-label="permittableMaximumNumberOfPaymentInstallments"
            name="permittableMaximumNumberOfPaymentInstallments"
            value={params.permittableMaximumNumberOfPaymentInstallments}
            onChange={handleMaximumPaymentInstallmentChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel value={1} control={<Radio />} label="One" />
              </Grid>

              <Grid item>
                <FormControlLabel value={2} control={<Radio />} label="Two" />
              </Grid>
              <Grid item>
                <FormControlLabel value={3} control={<Radio />} label="Three" />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const renderAgreedInitialPercentagePaymentField = ({
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
        helperText="Enter initial % payment"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.initialPaymentAgreedRemittablePercentage}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderAgreedDaysToPaymentRemittanceField = ({
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
        helperText="Days from payment to remittance"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.initialPaymentAgreedDaysToPaymentRemittance}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderPlatformPercentageChargeField = ({
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
        helperText="Platform percentage charge"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.initialPaymentPlatformPercentageForRetention}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderAgreedSecondPercentagePaymentField = ({
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
        helperText="Enter second % payment"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.secondPaymentAgreedRemittablePercentage}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderAgreedSecondDaysToPaymentRemittanceField = ({
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
        helperText="Days from payment to remittance"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.secondPaymentAgreedDaysToPaymentRemittance}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderSecondPlatformPercentageChargeField = ({
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
        helperText="Platform percentage charge"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.secondPaymentPlatformPercentageForRetention}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderAgreedThirdPercentagePaymentField = ({
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
        helperText="Enter third % payment"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.thirdPaymentAgreedRemittablePercentage}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderAgreedThirdDaysToPaymentRemittanceField = ({
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
        helperText="Days from payment to remittance"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.thirdPaymentAgreedDaysToPaymentRemittance}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderThirdPlatformPercentageChargeField = ({
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
        helperText="Platform percentage charge"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.thirdPaymentPlatformPercentageForRetention}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <div className={classes.root}>
      <form id="vendorCategory" className={classes.formStyles}>
        <Grid container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "blue", fontSize: "1.5em" }}
            component="legend"
          >
            Vendor Details
          </FormLabel>
        </Grid>
        <Box
          sx={{
            width: 550,
            height: 420,
          }}
          noValidate
          autoComplete="off"
        >
          <Field
            label=""
            id="name"
            name="name"
            type="text"
            component={renderNameField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />

          <Field
            label=""
            id="description"
            name="description"
            type="text"
            component={renderDescriptionField}
          />

          <Grid container direction="column" style={{ marginTop: 30 }}>
            <Grid item>
              <Field
                label=""
                id="type"
                name="type"
                type="text"
                component={renderTypeRadioField}
              />
            </Grid>

            <Grid container style={{ marginTop: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Enter Vendor Contacts
              </FormLabel>
            </Grid>
            <Grid container direction="column" style={{ marginTop: 30 }}>
              <Grid item>
                <Field
                  label=""
                  id="locationAddress"
                  name="locationAddress"
                  type="text"
                  component={renderVendorAddressField}
                />
              </Grid>
              <Grid item container direction="row" style={{ marginTop: 20 }}>
                <Grid item>
                  <Field
                    label=""
                    id="locationCountry"
                    name="locationCountry"
                    type="text"
                    component={renderVendorLocationCountryField}
                  />
                </Grid>
                <Grid item style={{ marginLeft: 30 }}>
                  <Field
                    label=""
                    id="locationState"
                    name="locationState"
                    type="text"
                    component={renderVendorLocationStateField}
                  />
                </Grid>

                <Grid item style={{ marginLeft: 30 }}>
                  <Field
                    label=""
                    id="locationCity"
                    name="locationCity"
                    type="text"
                    component={renderVendorLocationCityField}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: 30 }}>
                <Field
                  label=""
                  id="contactPersonName"
                  name="contactPersonName"
                  type="text"
                  component={renderVendorContactNameField}
                />
              </Grid>
              <Grid item container direction="row" style={{ marginTop: 30 }}>
                <Grid item>
                  <Field
                    label=""
                    id="contactPersonPhoneNumber"
                    name="contactPersonPhoneNumber"
                    type="text"
                    component={renderVendorPhoneNumberField}
                  />
                </Grid>
                <Grid item style={{ marginLeft: 30, minWidth: "50%" }}>
                  <Field
                    label=""
                    id="contactPersonEmailAddress"
                    name="contactPersonEmailAddress"
                    type="email"
                    component={renderVendorEmailAddressField}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Enter Vendor Bank Details
              </FormLabel>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountType"
                  name="bankAccountType"
                  type="text"
                  component={renderBankAccountTypeField}
                  className={classes.dropDown}
                />
              </Grid>
              <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  type="text"
                  component={renderBankAccountNumberField}
                />
              </Grid>
              <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountName"
                  name="bankAccountName"
                  type="text"
                  component={renderBankAccountNameField}
                />
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item style={{ marginTop: 20 }}>
                <Field
                  label=""
                  id="bankCountry"
                  name="bankCountry"
                  type="text"
                  component={renderBankCountryField}
                />
              </Grid>
              <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountSwiftCode"
                  name="bankAccountSwiftCode"
                  type="text"
                  component={renderBankSwiftCodeNumberField}
                />
              </Grid>
              <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountIBAN"
                  name="bankAccountIBAN"
                  type="text"
                  component={renderBankIBANField}
                />
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              <Field
                label=""
                id="bankName"
                name="bankName"
                type="text"
                component={renderBankNameField}
              />
            </Grid>
            <FormLabel
              style={{ color: "blue", marginTop: 30 }}
              component="legend"
            >
              Vendor Contract
            </FormLabel>

            <Grid item style={{ marginTop: 20 }}>
              <Field
                label=""
                id="enforceGlobalPlatformPolicyContract"
                name="enforceGlobalPlatformPolicyContract"
                component={renderEnforceGlobalPlatformPolicyField}
              />
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              <Field
                label=""
                id="permittableMaximumNumberOfPaymentInstallments"
                name="permittableMaximumNumberOfPaymentInstallments"
                type="number"
                component={rendermaxNumberOfPaymentInstallmentAllowed}
              />
            </Grid>
            <FormLabel style={{ marginTop: 20 }} component="legend">
              Initial Payment Details
            </FormLabel>
            <Grid item container direction="row">
              <Grid item container direction="row">
                <Grid item style={{ marginTop: 20, width: "28%" }}>
                  <Field
                    label="Enter agreed initial percentage payment"
                    id="initialPaymentAgreedRemittablePercentage"
                    name="initialPaymentAgreedRemittablePercentage"
                    type="number"
                    component={renderAgreedInitialPercentagePaymentField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "38%" }}
                >
                  <Field
                    label="Enter agreed number of days to remittance"
                    id="initialPaymentAgreedDaysToPaymentRemittance"
                    name="initialPaymentAgreedDaysToPaymentRemittance"
                    type="number"
                    component={renderAgreedDaysToPaymentRemittanceField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "31%" }}
                >
                  <Field
                    label="Enter Platform Percentage Charge"
                    id="initialPaymentPlatformPercentageForRetention"
                    name="initialPaymentPlatformPercentageForRetention"
                    type="number"
                    component={renderPlatformPercentageChargeField}
                  />
                </Grid>
              </Grid>
            </Grid>
            <FormLabel style={{ marginTop: 20 }} component="legend">
              Second Payment Details
            </FormLabel>
            <Grid item container direction="row">
              <Grid item container direction="row">
                <Grid item style={{ marginTop: 20, width: "28%" }}>
                  <Field
                    label="Enter agreed initial percentage payment"
                    id="secondPaymentAgreedRemittablePercentage"
                    name="secondPaymentAgreedRemittablePercentage"
                    type="number"
                    component={renderAgreedSecondPercentagePaymentField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "38%" }}
                >
                  <Field
                    label="Enter agreed number of days to remittance"
                    id="secondPaymentAgreedDaysToPaymentRemittance"
                    name="secondPaymentAgreedDaysToPaymentRemittance"
                    type="number"
                    component={renderAgreedSecondDaysToPaymentRemittanceField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "31%" }}
                >
                  <Field
                    label="Enter Platform Percentage Charge"
                    id="secondPaymentPlatformPercentageForRetention"
                    name="secondPaymentPlatformPercentageForRetention"
                    type="number"
                    component={renderSecondPlatformPercentageChargeField}
                  />
                </Grid>
              </Grid>
            </Grid>
            <FormLabel style={{ marginTop: 20 }} component="legend">
              Third Payment Details
            </FormLabel>
            <Grid item container direction="row">
              <Grid item container direction="row">
                <Grid item style={{ marginTop: 20, width: "28%" }}>
                  <Field
                    label="Enter agreed initial percentage payment"
                    id="thirdPaymentAgreedRemittablePercentage"
                    name="thirdPaymentAgreedRemittablePercentage"
                    type="number"
                    component={renderAgreedThirdPercentagePaymentField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "38%" }}
                >
                  <Field
                    label="Enter agreed number of days to remittance"
                    id="thirdPaymentAgreedDaysToPaymentRemittance"
                    name="thirdPaymentAgreedDaysToPaymentRemittance"
                    type="number"
                    component={renderAgreedThirdDaysToPaymentRemittanceField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "31%" }}
                >
                  <Field
                    label="Enter Platform Percentage Charge"
                    id="thirdPaymentPlatformPercentageForRetention"
                    name="thirdPaymentPlatformPercentageForRetention"
                    type="number"
                    component={renderThirdPlatformPercentageChargeField}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={props.handleSubmit(onSubmit)}
          >
            Update Vendor
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default reduxForm({
  form: "vendorForm",
})(VendorEditForm);
