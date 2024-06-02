import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
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
import { uploadImageToFirebase } from "../../firebaseUtils";

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
      <Header title="Seller" subtitle="Seller Details" />
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
            <Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ margin: "1.5rem 0 2rem 0" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ margin: "1.5rem 0 2rem 0" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ margin: "1.5rem 0 2rem 0" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="PAN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pan}
                name="pan"
                error={!!touched.pan && !!errors.pan}
                helperText={touched.pan && errors.pan}
                sx={{ margin: "1.5rem 0 2rem 0" }}
              />
              <Box sx={{ marginTop: "2rem" }}>
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "0 0 5px 0" }}
                >
                  Beneficiary
                </Typography>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Beneficiary Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.beneficiary.beneficiaryName}
                    name="beneficiary.beneficiaryName"
                    error={
                      !!touched.beneficiary?.beneficiaryName &&
                      !!errors.beneficiary?.beneficiaryName
                    }
                    helperText={
                      touched.beneficiary?.beneficiaryName &&
                      errors.beneficiary?.beneficiaryName
                    }
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Account Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.beneficiary.accountNumber}
                    name="beneficiary.accountNumber"
                    error={
                      !!touched.beneficiary?.accountNumber &&
                      !!errors.beneficiary?.accountNumber
                    }
                    helperText={
                      touched.beneficiary?.accountNumber &&
                      errors.beneficiary?.accountNumber
                    }
                    sx={{ margin: "1.5rem 0 2rem 0" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="IFSC"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.beneficiary.ifsc}
                    name="beneficiary.ifsc"
                    error={
                      !!touched.beneficiary?.ifsc && !!errors.beneficiary?.ifsc
                    }
                    helperText={
                      touched.beneficiary?.ifsc && errors.beneficiary?.ifsc
                    }
                    sx={{ margin: "1.5rem 0 2rem 0" }}
                  />
                </Box>
              </Box>
              <Box sx={{ marginTop: "2rem" }}>
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "0 0 5px 0" }}
                >
                  Documents
                </Typography>
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
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {loading ? `Uploading... ${progress}%` : "Submit"}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
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
