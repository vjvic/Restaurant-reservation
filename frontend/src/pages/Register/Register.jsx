import React, { useEffect } from "react";
import { TextField, Button, Typography, Alert, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/actions/userActions";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { uniqueID } from "../../utils/utils";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { error, success } = useSelector((state) => state.userRegister);

  const onSubmit = (data, e) => {
    const id = uniqueID();
    const role = "user";
    dispatch(
      userRegister(
        data.username,
        data.email.toLowerCase(),
        data.password,
        id,
        role
      )
    );

    e.target.reset();
  };

  useEffect(() => {
    if (success) {
      history.push("/menu");
    }
  }, [success, history]);

  return (
    <Grid container alignItems="center" sx={{ height: "calc(100vh - 350px)" }}>
      <Grid item lg={6}>
        <Box>
          <img src="/images/register.svg" alt="register svg" width="80%" />
        </Box>
      </Grid>
      <Grid item lg={6}>
        <Box sx={{ maxWidth: "600px", margin: "auto" }}>
          <Box my={1}>
            <Typography variant="body">SIGN UP</Typography>
          </Box>

          <Box mb={5}>
            <Typography variant="h4" component="span">
              Welcome to Everyday
            </Typography>
            <Typography variant="h4" component="span" sx={{ color: "#DE8538" }}>
              {" "}
              Cravings!
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            sx={{
              "& > :not(style)": { my: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register("email")}
              label="Email"
              fullWidth
              error={errors?.email?.message.length > 0}
              helperText={errors?.email?.message}
              variant="filled"
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <TextField
              {...register("username")}
              label="Name"
              fullWidth
              error={errors?.username?.message.length > 0}
              helperText={errors?.username?.message}
              variant="filled"
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <TextField
              {...register("password")}
              label="Password"
              type="password"
              fullWidth
              error={errors?.password?.message.length > 0}
              helperText={errors?.password?.message}
              variant="filled"
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <TextField
              {...register("confirmPassword")}
              label="Confirm Password"
              type="password"
              fullWidth
              error={errors?.confirmPassword?.message.length > 0}
              helperText={errors?.confirmPassword?.message}
              variant="filled"
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <Button variant="contained" type="submit" sx={{ height: "45px" }}>
              SIGN UP
            </Button>

            <Box>
              <Typography variant="body1">
                Have an account? <Link to={"/login"}>Login</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
