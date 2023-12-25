// Login.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import Styles from "../styles";
import { postApi } from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  interface UserInformation {
    email: string;
    password: string;
  }
  const classes = Styles();
  const [data, setData] = useState<UserInformation>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", data.email.trim());
    formData.append("password", data.password);

    postApi("login", formData)
      .then((res: any) => {
        if (res.status === 200 || res.status === 201) {
          localStorage.setItem("token", res.data.token);
          navigate("/order-form");
          toast.success(res.data.message);
        } else {
          toast.error(res.response.data.error);
        }
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box className={classes.background}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={2} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
