import { Box, Button, TextField, Typography, Grid, Paper, useTheme, CircularProgress, IconButton, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Formik, FieldArray } from 'formik';
import * as yup from "yup";
import schemas from "../../helpers/schemas";
import { uploadImageToFirebase } from "../../utils/firebaseUtils";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import { handleApiCall } from "../../redux/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { entity } = useParams();
  const schema = schemas[entity];
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state[entity]);

  const [uploadedFiles, setUploadedFiles] = useState({});

  if (!schema) {
    return <Typography variant="h5">Invalid entity</Typography>;
  }

  const validationSchema = yup.object().shape(
    schema.fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {})
  );

  const initialValues = schema.fields.reduce((acc, field) => {
    if (field.type === 'array') {
      acc[field.name] = [];
    } else {
      acc[field.name] = field.type === 'file' && field.multiple ? [] : '';
    }
    return acc;
  }, {});

  const handleFormSubmit = async (values) => {
    const uploadPromises = [];
    for (const field of schema.fields) {
      if (field.type === 'file' && field.multiple) {
        const files = values[field.name];
        const urls = [];
        for (const file of files) {
          const urlPromise = new Promise((resolve, reject) => {
            uploadImageToFirebase(file, null, resolve, reject);
          });
          uploadPromises.push(urlPromise);
          urls.push(await urlPromise);
        }
        values[field.name] = urls;
      }
    }
    await Promise.all(uploadPromises);

    handleApiCall(entity, values, dispatch);
  };

  const handleFileChange = (event, fieldName, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue(fieldName, files);
    setUploadedFiles((prev) => ({
      ...prev,
      [fieldName]: files,
    }));
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={4}>{schema.title}</Typography>
      <Typography variant="subtitle1" mb={4}>{schema.subtitle}</Typography>
      <Paper sx={{ p: 3, backgroundColor: colors.primary[400] }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {schema.fields.map((field) => (
                  <Grid item xs={12} sm={field.grid || 12} key={field.name}>
                    {field.type === 'file' ? (
                      <>
                        <Button
                          variant="contained"
                          component="label"
                          sx={{ margin: "1.5rem 0 2rem 0" }}
                        >
                          {field.label}
                          <input
                            type="file"
                            hidden
                            multiple={field.multiple}
                            onChange={(event) => handleFileChange(event, field.name, setFieldValue)}
                          />
                        </Button>
                        {uploadedFiles[field.name] && uploadedFiles[field.name].map((file, index) => (
                          <Typography key={index}>{file.name}</Typography>
                        ))}
                      </>
                    ) : field.type === 'array' ? (
                      <FieldArray name={field.name}>
                        {({ push, remove, form }) => (
                          <Box>
                            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>{field.label}</Typography>
                            {form.values[field.name].map((variant, index) => (
                              <Grid container spacing={2} key={index}>
                                {field.fields.map((subField) => (
                                  <Grid item xs={12} sm={subField.grid || 12} key={subField.name}>
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      label={subField.label}
                                      type={subField.type}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={variant[subField.name]}
                                      name={`${field.name}[${index}].${subField.name}`}
                                      error={!!touched[field.name]?.[index]?.[subField.name] && !!errors[field.name]?.[index]?.[subField.name]}
                                      helperText={touched[field.name]?.[index]?.[subField.name] && errors[field.name]?.[index]?.[subField.name]}
                                    />
                                  </Grid>
                                ))}
                                <Grid item xs={12} sm={3}>
                                  <IconButton
                                    onClick={() => remove(index)}
                                    color="error"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            ))}
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => push({ size: "", price: 0, available: 0 })}
                            >
                              Add Variant
                            </Button>
                          </Box>
                        )}
                      </FieldArray>
                    ) : field.type === 'select' ? (
                      <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          value={values[field.name]}
                          onChange={handleChange}
                          label={field.label}
                          name={field.name}
                        >
                          {field.options.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={field.label}
                        type={field.type}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[field.name]}
                        name={field.name}
                        error={!!touched[field.name] && !!errors[field.name]}
                        helperText={touched[field.name] && errors[field.name]}
                      />
                    )}
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    disabled={isFetching}
                  >
                    {isFetching ? <CircularProgress size={24} /> : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;
