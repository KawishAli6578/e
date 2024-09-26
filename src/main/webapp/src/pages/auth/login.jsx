import { Box, Button, Grid, Typography } from "@mui/material";
import { borderRadius, styled } from "@mui/system";
import MainCard from "components/MainCard";
import Logo from "components/logo/kumoship_logo.png"; // Make sure this path is correct
import { Controller, useForm } from "react-hook-form";
import FormInput from "components/form-elements/FormInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import useAuth from "contexts/AuthContext";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { login } = useAuth();
  const { control, handleSubmit, setError } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(loginValidationSchema),
  });

  const submitHandler = async (data) => {
    await login(data);
    return true;
  };

  return (
    <Container>
      <MainCard
        sx={{ maxWidth: "700px", padding: "20px", paddingTop: "0px" }}
        borderRadius={10}
      >
        <LogoContainer>
          <LogoMain src={Logo} alt="Logo" />
        </LogoContainer>
        <TextContainer>Please enter your login information</TextContainer>
        <FormContainer onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({
                  field: { name, onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    type="email"
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
                name="password"
                control={control}
                render={({
                  field: { name, onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    type="text"
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
          <ForgetTextContainer>
            <ForgetLink to="/forgot-password">Forgot Password?</ForgetLink>
          </ForgetTextContainer>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#004D40", // Dark green color
              width: "100%",
              marginTop: "16px",

              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#003D33", // Slightly darker on hover
              },
            }}
            type="submit"
          >
            Sign In
          </Button>
          <Box
            sx={{
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#004D40" }}
            >
              Don't have an account?{" "}
              <span style={{ fontWeight: "600" }}>Create an account</span>
            </Link>
          </Box>
        </FormContainer>
      </MainCard>
    </Container>
  );
};

export default Login;

const Container = styled(Box)({});
const LogoContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "40px",
});
const FormContainer = styled("form")({});
const LogoMain = styled("img")({
  width: "300px",
  objectFit: "contain",
});
const TextContainer = styled("div")({
  fontSize: "18px",
  fontWeight: "500",
  marginBottom: "20px",
});
const ForgetTextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const ForgetLink = styled(Link)(({ theme }) => ({
  fontSize: "18px",
  cursor: "pointer",
  transition: "color 0.3s ease",
  fontWeight: "500",
  marginTop: "10px",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary,
  },
  color: "#55c082",
}));
