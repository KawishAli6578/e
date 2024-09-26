import { Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import MainCard from "components/MainCard";
import { Controller, useForm } from "react-hook-form";
import FormInput from "components/form-elements/FormInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import useAuth from "contexts/AuthContext";

const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("UserName is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
});

// Initial form values
const initialValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const Register = () => {
  const { register } = useAuth();

  const { control, handleSubmit, setError } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(RegisterValidationSchema),
  });

  const submitHandler = async (data) => {
    await register(data);
    return true;
  };

  return (
    <Container>
      <MainCard
        sx={{ maxWidth: "700px", padding: "20px", paddingTop: "0px" }}
        borderRadius={10}
      >
        <LogoContainer>
          <HeadingContainer>Sign Up</HeadingContainer>
        </LogoContainer>
        <TextContainer>Create an account to continue</TextContainer>
        <FormContainer onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                render={({
                  field: { name, onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    type="text"
                    name={name}
                    label="Name"
                    value={value}
                    sx={{
                      borderRadius: "10px",
                    }}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={error ? error.message : false}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lastName"
                control={control}
                render={({
                  field: { name, onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    type="text"
                    name={name}
                    label="Last Name"
                    value={value}
                    sx={{
                      borderRadius: "10px",
                    }}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={error ? error.message : false}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({
                  field: { name, onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    type="text"
                    name={name}
                    label="Email"
                    value={value}
                    sx={{
                      borderRadius: "10px",
                    }}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={error ? error.message : false}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                render={({
                  field: { name, onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    type="phone"
                    name={name}
                    label="Phone"
                    value={value}
                    sx={{
                      borderRadius: "10px",
                    }}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={error ? error.message : false}
                  />
                )}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({
                  field: { name, onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    type="password"
                    name={name}
                    label="Password"
                    value={value}
                    sx={{
                      borderRadius: "10px",
                    }}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={error ? error.message : false}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#004D40", // Dark green color
              width: "100%",
              paddingTop: "10px",
              paddingBottom: "10px",

              marginTop: "20px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#003D33", // Slightly darker on hover
              },
            }}
          >
            Sign Up
          </Button>
          <Box
            sx={{
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <Link
              to="/login "
              style={{ textDecoration: "none", color: "#004D40" }}
            >
              If already have an account?{" "}
              <span style={{ fontWeight: "600" }}>Login</span>
            </Link>
          </Box>
        </FormContainer>
      </MainCard>
    </Container>
  );
};

export default Register;

const Container = styled(Box)({});
const LogoContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "40px",
  color: "#004D40",
});
const FormContainer = styled("form")({});

const TextContainer = styled("div")({
  fontSize: "18px",
  fontWeight: "500",
  marginBottom: "20px",
});
const HeadingContainer = styled("div")({
  fontSize: "50px",
  fontWeight: "bold",
});
