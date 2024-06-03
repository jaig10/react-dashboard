import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schemas = {
    user: {
      title: 'User',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', validation: 'string().required("First Name is required")', grid: 6 },
        { name: 'lastName', label: 'Last Name', type: 'text', validation: 'string().required("Last Name is required")', grid: 6 },
        { name: 'email', label: 'Email', type: 'email', validation: 'string().email("Invalid email").required("Email is required")', grid: 12 },
      ],
    },
    seller: {
        title: 'Create New Seller',
        subtitle: 'Fill in the details to create a new seller',
        fields: [
          { name: 'firstName', label: 'First Name', type: 'text', validation: yup.string().required('First Name is required'), grid: 6 },
          { name: 'lastName', label: 'Last Name', type: 'text', validation: yup.string().required('Last Name is required'), grid: 6 },
          { name: 'email', label: 'Email', type: 'email', validation: yup.string().email('Invalid email').required('Email is required'), grid: 6 },
          { name: 'phone', label: 'Phone', type: 'text', validation: yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid'), grid: 6 },
          { name: 'pan', label: 'PAN', type: 'text', validation: yup.string().required('PAN is required'), grid: 6 },
          { name: 'beneficiaryName', label: 'Beneficiary Name', type: 'text', validation: yup.string().required('Beneficiary Name is required'), grid: 6 },
          { name: 'accountNumber', label: 'Account Number', type: 'text', validation: yup.string().required('Account Number is required'), grid: 6 },
          { name: 'ifsc', label: 'IFSC', type: 'text', validation: yup.string().required('IFSC is required'), grid: 6 },
          { name: 'pan_image', label: 'Upload PAN Image', type: 'file', multiple: false, grid: 6 },
          { name: 'aadhar_image', label: 'Upload Aadhar Image', type: 'file', multiple: false, grid: 6 },
        ],
      },
      product: {
        title: 'Create New Product',
        subtitle: 'Fill in the details to create a new product',
        fields: [
          { name: 'title', label: 'Title', type: 'text', validation: yup.string().required('Title is required'), grid: 12 },
          { name: 'description', label: 'Description', type: 'text', validation: yup.string().required('Description is required'), grid: 12 },
          { name: 'nickname', label: 'Nickname', type: 'text', validation: yup.string(), grid: 6 },
          { name: 'brand', label: 'Brand', type: 'text', validation: yup.string(), grid: 6 },
          { name: 'color', label: 'Color', type: 'text', validation: yup.string(), grid: 6 },
          { name: 'silhouette', label: 'Silhouette', type: 'text', validation: yup.string(), grid: 6 },
          { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Not Active'], validation: yup.string(), grid: 12 },
          { name: 'images', label: 'Media', type: 'file', multiple: true, grid: 12 },
          { name: 'variants', label: 'Variants', type: 'array', fields: [
            { name: 'size', label: 'Size', type: 'text', validation: yup.string().required('Size is required'), grid: 3 },
            { name: 'price', label: 'Price', type: 'number', validation: yup.number().required('Price is required'), grid: 3 },
            { name: 'available', label: 'Available', type: 'number', validation: yup.number().required('Available quantity is required'), grid: 3 },
          ], grid: 12 }
        ],
      },
  };
  
  export default schemas;