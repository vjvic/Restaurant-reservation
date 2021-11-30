import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/actions/userActions";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch();

  const {
    user,
    loading: loadingDetails,
    error: errorDetails,
  } = useSelector((state) => state.userDetails);

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    dispatch(getUserDetails("profile"));
    setEmail(user.email);
    setName(user.name);
  }, [dispatch, user.email, user.name]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorPassword("password must match");
    } else {
      dispatch(updateUserProfile({ id: user._id, email, name, password }));
    }
  };

  if (loadingDetails || loadingUpdate)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 240px)",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <Grid
      container
      sx={{ height: "calc(100vh - 350px)", marginTop: 10 }}
      spacing={3}
    >
      <Grid item lg={4}>
        <Box sx={{ maxWidth: "600px", margin: "auto" }}>
          <Box mb={5}>
            <Typography variant="h4">User Profile</Typography>
          </Box>

          {errorDetails && <Alert severity="error">{errorDetails}</Alert>}
          {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
          {successUpdate && <Alert severity="success">Update Success</Alert>}

          <Box
            component="form"
            sx={{
              "& > :not(style)": { my: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleUpdate}
          >
            <TextField
              value={email}
              label="Email"
              fullWidth
              variant="filled"
              color="secondary"
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <TextField
              value={name}
              label="Name"
              fullWidth
              variant="filled"
              color="secondary"
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <TextField
              value={password}
              label="Password"
              type="password"
              fullWidth
              variant="filled"
              color="secondary"
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <TextField
              value={confirmPassword}
              label="Confirm Password"
              type="password"
              fullWidth
              variant="filled"
              color="secondary"
              error={errorPassword.length > 0}
              helperText={errorPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{
                style: { color: "#888" },
              }}
            />

            <Button variant="contained" type="submit" sx={{ height: "45px" }}>
              UPDATE
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={8}>
        <Box mb={5}>
          <Typography variant="h4">Orders</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
