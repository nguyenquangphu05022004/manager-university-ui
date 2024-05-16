import { useState } from "react";
import AuthenService from "../../services/AuthenService";
import Token from "../../services/Token";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

function ChangePasswordComponent() {
    document.title = "Đổi mật khẩu"


    const handleChange = (oldPass, newPass) => {
        AuthenService.changePassword(oldPass, newPass)
            .then((res) => {
                AuthenService.logout()
                .then(res1 => 
                    { 
                        window.localStorage.removeItem('data');
                        window.location.pathname="/trang-chu"
                })
                    .catch(err1 => console.log(err1))
            }).catch(err => alert("Mật khẩu cũ không hợp lệ"))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        handleChange(data.get("old_password"), data.get("new_password"))

    };
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
                    Đổi mật khẩu
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="old_password"
                        label="Mật khẩu cũ"
                        name="old_password"
                        autoComplete="password"
                        type={"password"}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="new_password"
                        label="Mật khẩu mới"
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
                        Đổi mật khẩu
                    </Button>
                </Box>
            </Box>
        </Container>
        // <div className="container">
        //     <br />
        //     {message === 'warning' ? (<Alert variant="filled" severity="warning">
        //         Mật khẩu cũ sai, vui lòng kiểm tra lại.
        //     </Alert>) : ""}
        //     {message === 'success' ? (<Alert variant="filled" severity="success">
        //         Đổi mật khẩu thành công.
        //     </Alert>): ""}
        //     <form method="post">
        //         <br />
        //         <div className="mb-3">
        //             <label for="exampleInputEmail1" className="form-label">Mật khẩu hiện tại</label>
        //             <input type="password" className="form-control" id="exampleInputEmail1"
        //                 aria-describedby="emailHelp" value = {rePassword}
        //
        //                 onChange={(e) => setRePassword(e.target.value)
        //                 }
        //             />
        //         </div>
        //         <div className="mb-3">
        //             <label for="exampleInputPassword1" className="form-label">Mật khẩu mới</label>
        //             <input type="password" className="form-control"
        //                 id="exampleInputPassword1" value = {password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //         </div>
        //         <button type="submit" className="btn btn-primary" onClick={handleChange}>Submit</button>
        //     </form>
        // </div>
    )


}
export default ChangePasswordComponent;