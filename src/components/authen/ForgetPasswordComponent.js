import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import AuthenService from "../../services/AuthenService";
function ForgetPasswordComponent() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const emailRequest = {
            "recipient": data.get("email")
        }
        AuthenService.sendEmailForgetPassword(emailRequest)
        .then(res => {
            alert("Chúng tôi đã gửi thông tin về email: " + data.get("email")+ " của bạn. Vui lòng kiểm tra")
            window.location.reload();
        }).catch(err => {
            alert("Email: "+ data.get("email") + ". Mà bạn gửi không hợp lệ.")
        })
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
                    Quên mật khẩu
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Gửi
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/dang-nhap" variant="body2">
                                Đăng nhập
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default ForgetPasswordComponent;