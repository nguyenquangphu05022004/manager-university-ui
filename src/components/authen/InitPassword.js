import { useState } from "react";
import AuthenService from "../../services/AuthenService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function ChangePasswordComponent() {
    document.title = "Đổi mật khẩu"
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const codeParam = params.get('code');

    const handleChange = (username, password) => {
        AuthenService.initPassword(username, codeParam, password)
            .then((res) => {
                window.location.href=window.location.origin + "/dang-nhap"
            }).catch(err => alert("Code: " + codeParam + " không hợp lệ"))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        handleChange(data.get("username"),data.get("new_password"))

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
                    Khởi tạo mật khẩu mới
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Tên đăng nhập"
                            name="username"
                            autoComplete="text"
                            type={"text"}
                            autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="new_password"
                        label="Mật khẩu"
                        name="new_password"
                        autoComplete="password"
                        type={"password"}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="new_password_re"
                        label="Nhập lại mật khẩu"
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
    )

}
export default ChangePasswordComponent;