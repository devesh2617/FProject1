import { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import Styles from "../styles";
import formatObjectValues from "../utils/formatObjectValues";
import { postApi } from "../api/axios";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const AdminPanel = () => {
  const classes = Styles();
  // State to manage form data
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [role, setRole] = useState<string>("");

  // Function to handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleUserSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = formatObjectValues(userData);

    postApi("admin/create-user", body)
      .then((res: any) => {
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
          setUserData({
            firstName: "",
            lastName: "",
            email: "",
            role: "",
          });
        } else {
          toast.error(res.response.data.error);
        }
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  const handleRoleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = role.trim();
    console.log(body);
    postApi("admin/create-role", { role: body })
      .then((res: any) => {
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
        } else {
          toast.error(res.response.data.error);
        }
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  return (
    <div className={classes.adminContainer}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={2} className={classes.adminForm}>
          <Typography variant="h5">Create User</Typography>
          <form onSubmit={handleUserSubmit}>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              required
              value={userData.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              required
              value={userData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Role"
              type="role"
              name="role"
              required
              value={userData.role}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Create User
            </Button>
          </form>
        </Paper>
      </Container>
      <Container component="main" maxWidth="xs">
        <Paper elevation={2} className={classes.adminForm}>
          <Typography variant="h5">Create Role</Typography>
          <form onSubmit={handleRoleSubmit}>
            <TextField
              label="Role"
              type="text"
              name="role"
              required
              value={role}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRole(e.target.value)
              }
              fullWidth
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary">
              Create Role
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminPanel;
