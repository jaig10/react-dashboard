import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { getSellerById, updateSeller } from "../../redux/sellerRedux/sellerApi";
import { uploadImageToFirebase } from "../../utils/firebaseUtils";

const Seller = () => {
  const location = useLocation();
  const sellerId = location.pathname.split("/")[2];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [panImage, setPanImage] = useState(null);
  const [aadharImage, setAadharImage] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      if (sellerId) {
        try {
          const sellerData = await getSellerById(sellerId, dispatch);
          console.log("Fetched seller data:", sellerData);
          setInitialValues({
            firstName: sellerData.firstName || "",
            lastName: sellerData.lastName || "",
            email: sellerData.email || "",
            phone: sellerData.phone || "",
            pan: sellerData.pan || "",
            beneficiary: {
              beneficiaryName: sellerData.beneficiary?.beneficiaryName || "",
              accountNumber: sellerData.beneficiary?.accountNumber || "",
              ifsc: sellerData.beneficiary?.ifsc || "",
            },
            pan_image: null,
            aadhar_image: null,
          });
        } catch (error) {
          console.error("Failed to fetch seller data:", error);
        }
      } else {
        console.error("sellerId is undefined");
      }
    };

    fetchSellerData();
  }, [sellerId, dispatch]);

  const handleFormSubmit = async (values) => {
    console.log("Form submit values:", values);
    setLoading(true);

    const sellerData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      pan: values.pan,
      beneficiary: {
        beneficiaryName: values.beneficiary.beneficiaryName,
        accountNumber: values.beneficiary.accountNumber,
        ifsc: values.beneficiary.ifsc,
      },
    };

    const uploadPromises = [];

    if (panImage) {
      uploadPromises.push(
        new Promise((resolve, reject) => {
          uploadImageToFirebase(
            panImage,
            (progress) => setProgress(progress),
            (downloadURL) => {
              sellerData.pan_image = downloadURL;
              resolve();
            },
            (error) => {
              alert("PAN Image couldn't be uploaded");
              reject(error);
            }
          );
        })
      );
    }

    if (aadharImage) {
      uploadPromises.push(
        new Promise((resolve, reject) => {
          uploadImageToFirebase(
            aadharImage,
            (progress) => setProgress(progress),
            (downloadURL) => {
              sellerData.aadhar_image = downloadURL;
              resolve();
            },
            (error) => {
              alert("Aadhar Image couldn't be uploaded");
              reject(error);
            }
          );
        })
      );
    }

    try {
      await Promise.all(uploadPromises);
      console.log("Updated seller data:", sellerData);
      await updateSeller(sellerId, sellerData, dispatch);
      setLoading(false);
    } catch (error) {
      console.error("Error updating seller:", error);
      setLoading(false);
    }
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
    <Header title="Create New Seller" subtitle="Fill in the details to create a new seller" />
    <Paper sx={{ p: 3, backgroundColor: colors.primary[400] }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>Seller Details</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="PAN"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pan}
                  name="pan"
                  error={!!touched.pan && !!errors.pan}
                  helperText={touched.pan && errors.pan}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>Beneficiary</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Beneficiary Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.beneficiaryName}
                  name="beneficiaryName"
                  error={!!touched.beneficiaryName && !!errors.beneficiaryName}
                  helperText={touched.beneficiaryName && errors.beneficiaryName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Account Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountNumber}
                  name="accountNumber"
                  error={!!touched.accountNumber && !!errors.accountNumber}
                  helperText={touched.accountNumber && errors.accountNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="IFSC"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ifsc}
                  name="ifsc"
                  error={!!touched.ifsc && !!errors.ifsc}
                  helperText={touched.ifsc && errors.ifsc}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>Documents</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ margin: "1.5rem 0 2rem 0" }}
                  >
                    Upload PAN Image
                    <input
                      type="file"
                      hidden
                      onChange={(event) => {
                        setPanImage(event.currentTarget.files[0]);
                        setFieldValue("pan_image", event.currentTarget.files[0]);
                      }}
                    />
                  </Button>
                  {panImage && <Typography>{panImage.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ margin: "1.5rem 0 2rem 0" }}
                  >
                    Upload Aadhar Image
                    <input
                      type="file"
                      hidden
                      onChange={(event) => {
                        setAadharImage(event.currentTarget.files[0]);
                        setFieldValue("aadhar_image", event.currentTarget.files[0]);
                      }}
                    />
                  </Button>
                  {aadharImage && <Typography>{aadharImage.name}</Typography>}
                </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Submit
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

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string(),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  phone: yup.string(),
  pan: yup
    .string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid Pan No"),
  beneficiary: yup.object().shape({
    beneficiaryName: yup.string(),
    accountNumber: yup.string(),
    ifsc: yup.string(),
  }),
  pan_image: yup.mixed().required("PAN Image is required"),
  aadhar_image: yup.mixed().required("Aadhar Image is required"),
});

export default Seller;
