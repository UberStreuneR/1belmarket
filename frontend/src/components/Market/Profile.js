import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    profileClose,
    selectProfileOpen,
} from "../../redux/slices/widgetsSlice";
import {
    useLoginUserMutation,
    useSignupUserMutation,
} from "../../redux/slices/apiSlice";
import {
    setUser,
    addUser,
    clearUser,
    selectUser,
} from "../../redux/slices/userSlice";
import { clearToken, setToken } from "../../redux/slices/authSlice";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Button,
    Box,
    TextField,
    Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Profile() {
    const dispatch = useDispatch();
    const open = useSelector(selectProfileOpen);

    const [loginFormError, setLoginFormError] = useState(false);
    const [loginFormHelperText, setLoginFormHelperText] = useState("");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [signUpFormError, setSignUpFormError] = useState(false);
    const [signUpFormHelperText, setSignUpFormHelperText] = useState("");

    const [signupUsername, setSignupUsername] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword1, setSignupPassword1] = useState("");
    const [signupPassword2, setSignupPassword2] = useState("");

    const user = useSelector(selectUser);
    const [
        loginMutation,
        {
            isError: isLoginError,
            error: loginError,
            isSuccess: isLoginSuccess,
            isUninitialized: isLoginUninitialized,
            isLoading: isLoginLoading,
        },
    ] = useLoginUserMutation();
    const [signupMutation] = useSignupUserMutation();
    const loggedIn = Object.keys(user).length !== 0;
    const [signUp, setSignUp] = useState(false);

    const handleClose = () => {
        dispatch(profileClose());
    };

    const handleLoginClicked = () => {
        const login = loginMutation({
            username: loginUsername,
            password: loginPassword,
        })
            .then(res => {
                if (res.data) {
                    dispatch(
                        addUser({
                            username: res.data.username,
                            email: res.data.email,
                        })
                    );
                    dispatch(setToken({ token: res.data.token }));
                    setLoginFormError(false);
                    setLoginFormHelperText("");
                } else {
                    console.log(res.error.data);
                    setLoginFormError(true);
                    setLoginFormHelperText(res.error.data);
                }
            })
            .catch(err => {
                console.log(err);
                setLoginFormError(true);
                setLoginFormHelperText(err);
            });
    };

    const handleLogoutClicked = () => {
        dispatch(clearUser());
        dispatch(clearToken());
    };

    const signupProperties = [
        signupUsername,
        signupEmail,
        signupPassword1,
        signupPassword2,
    ];

    const [signUpEnabled, setSignUpEnabled] = useState(false);
    useEffect(() => {
        let allNotEmpty = signupProperties.reduce(
            (prev, item) => item != "",
            false
        );
        let passwordsMatch = signupPassword1 === signupPassword2;
        setSignUpEnabled(allNotEmpty && passwordsMatch);
    }, [...signupProperties]);

    const handleSignupClicked = () => {
        signupMutation({
            username: signupUsername,
            email: signupEmail,
            password1: signupPassword1,
            password2: signupPassword2,
        })
            .then(res => {
                if (res.data) {
                    dispatch(setUser(res.data));
                    dispatch(setToken({ token: res.data.token }));
                    setSignUpFormError(false);
                    setSignUpFormHelperText("");
                } else {
                    try {
                        const errors = res.error.data;
                        const error_msg = Object.values(errors).reduce(
                            (prev, current) => prev + "\n" + current[0],
                            ""
                        );
                        setSignUpFormError(true);
                        setSignUpFormHelperText(error_msg);
                    } catch {
                        setSignUpFormError(true);
                        setSignUpFormHelperText(res.error.data);
                    }
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth={true}>
            <DialogTitle
                id="alert-dialog-title"
                variant={"h4"}
                sx={{ display: "flex", justifyContent: "space-between" }}>
                Profile
                <IconButton onClick={() => dispatch(profileClose())}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers={true}>
                {loggedIn ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                        <Typography variant="h6">
                            Username: {user.username}
                        </Typography>
                        <Typography variant="h6" sx={{ my: 2 }}>
                            E-mail: {user.email}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleLogoutClicked}>
                            Logout
                        </Button>
                    </Box>
                ) : !signUp ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                        <Typography variant={"h5"}>Log in</Typography>
                        <TextField
                            variant="outlined"
                            label="username"
                            error={loginFormError}
                            sx={{ my: 2 }}
                            onChange={e => setLoginUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            label="password"
                            type="password"
                            error={loginFormError}
                            helperText={loginFormHelperText}
                            sx={{ mb: 2 }}
                            onChange={e => setLoginPassword(e.target.value)}
                        />
                        <Box>
                            <Link
                                sx={{ mr: 2, cursor: "pointer" }}
                                onClick={() => setSignUp(true)}>
                                Go to sign up
                            </Link>
                            <Button
                                variant="contained"
                                onClick={handleLoginClicked}>
                                Log in
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                        <Typography variant={"h5"}>Sign up</Typography>
                        <TextField
                            variant="outlined"
                            label="username"
                            sx={{ my: 2 }}
                            error={signUpFormError}
                            onChange={e => setSignupUsername(e.target.value)}
                            required
                        />
                        <TextField
                            variant="outlined"
                            label="email"
                            sx={{ mb: 2 }}
                            error={signUpFormError}
                            onChange={e => setSignupEmail(e.target.value)}
                            required
                        />
                        <TextField
                            variant="outlined"
                            label="password"
                            type="password"
                            error={signUpFormError}
                            onChange={e => setSignupPassword1(e.target.value)}
                            required
                        />
                        <TextField
                            variant="outlined"
                            label="repeat password"
                            type="password"
                            sx={{ my: 2 }}
                            error={signUpFormError}
                            helperText={signUpFormHelperText}
                            onChange={e => setSignupPassword2(e.target.value)}
                            required
                        />

                        <Box>
                            <Link
                                sx={{ mr: 2, cursor: "pointer" }}
                                onClick={() => setSignUp(false)}>
                                Go to login
                            </Link>
                            <Button
                                variant="contained"
                                onClick={handleSignupClicked}
                                disabled={!signUpEnabled}>
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default Profile;
