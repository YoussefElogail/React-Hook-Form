import { Box, Button, InputAdornment, TextField, styled } from "@mui/material";
import "./Create.css";
import React, { useState } from "react";
import { purple } from "@mui/material/colors";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Styled button using Material-UI styling
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  // @ts-ignore
  backgroundColor: theme.palette.ali.main,
  "&:hover": {
    // @ts-ignore
    backgroundColor: theme.palette.ali.main,
    scale: "0.99",
  },
}));

const Create = () => {
  // React Router hook for navigation
  const navigate = useNavigate();

  // React Hook Form hook for managing form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = ({ price, title }) => {
    // Convert price to a number
    price = +price;

    // Send a POST request to the server with form data
    fetch("http://localhost:3100/mydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price, title }),
    }).then(() => {
      // Navigate to the home page after successful submission
      navigate("/");
    });
  };

  // Return the JSX for the Create component
  return (
    <Box
      // Handle form submission using React Hook Form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      sx={{ width: "380px" }}
      // The component attribute specifies that this Box is a form
      component="form"
    >
      {/* Title TextField with validation */}
      <TextField
        {...register("title", {
          required: { value: true, message: "Required Field" },
          minLength: { value: 3, message: "Minimum 3 Characters" },
        })}
        fullWidth={true}
        label="Transaction Title"
        sx={{ mt: "22px", display: "block" }}
        InputProps={{
          // Start adornment with an emoji
          startAdornment: <InputAdornment position="start">👉</InputAdornment>,
        }}
        // Error handling for the title field
        error={Boolean(errors.title)}
        variant="filled"
        // Display error message if there is an error
        helperText={Boolean(errors.title) ? errors.title?.message.toString() : null}
      />

      {/* Price TextField with validation */}
      <TextField
        // Error handling for the price field
        error={Boolean(errors.price)}
        {...register("price", {
          required: { value: true, message: "Required Field" },
        })}
        fullWidth={true}
        label=" Amount"
        id="filled-start-adornment"
        sx={{ mt: "22px", display: "block" }}
        InputProps={{
          // Start adornment with a dollar sign
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        variant="filled"
        type="number"
        // Display error message if there is an error
        helperText={Boolean(errors.price) ? errors.price?.message.toString() : null}
      />

      {/* Submit button */}
      <ColorButton
        // Dummy onClick function (can be removed)
        onClick={(params) => {}}
        sx={{ mt: "22px" }}
        variant="contained"
        type="submit"
      >
        Submit <ChevronRight />
      </ColorButton>
    </Box>
  );
};

export default Create;
