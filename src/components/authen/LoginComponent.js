import { useState } from "react";
import AuthenService from "../../services/AuthenService";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
function LoginComponent() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const requestAuth = {
            username: data.get("username"),
            password: data.get("password")
        }
        AuthenService.login(requestAuth).then((response) => {
            window.localStorage.setItem("data", JSON.stringify(response.data));
                window.location.pathname = "/"

        }).catch((err) => { console.error(err); })
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const requestAuth = {

        }
    
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                       Đăng nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/quen-mat-khau" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        // <form method="post">
        //     <div className="mb-3">
        //         <label for="exampleInputEmail1" className="form-label">Username</label>
        //         <input type="text" className="form-control" id="exampleInputEmail1"
        //             aria-describedby="emailHelp"
        //             onChange={(e) => setUsername(e.target.value)}
        //         />
        //     </div>
        //     <div className="mb-3">
        //         <label for="exampleInputPassword1" className="form-label">Password</label>
        //         <input type="password" className="form-control"
        //             id="exampleInputPassword1"
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //     </div>
        //     {/* <div className="mb-3 form-check">
        //         <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        //             <label className="form-check-label" for="exampleCheck1">Check me out</label>
        //     </div> */}
        //     <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
        // </form>
    );
}
export default LoginComponent;