"use client";

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  FormGroup,
  FormControl,
  Alert,
  Link as MuiLink,
  Box,
  CircularProgress,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import NextLink from "@/app/components/NextLink";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [logout, setLogout] = useState(false);
  const searchParams = useSearchParams();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setRegisterSuccess(searchParams.get("registerSuccess") === "true");
    setLogout(searchParams.get("logout") === "true");
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (response.ok) {
        router.push("/dashboard");
        return;
      }

      const data = await response.json();

      try {
        if (data.error?.message) {
          setErrors([data.error.message]);
        } else if (typeof data.error === "string") {
          const parsedErrors = JSON.parse(data.error);
          setErrors(
            parsedErrors.map((error: { message: string }) => error.message),
          );
        } else if (data.error) {
          setErrors([String(data.error)]);
        } else if (data.message) {
          setErrors([data.message]);
        } else {
          setErrors(["Login failed. Please try again."]);
        }
      } catch (error) {
        console.error(error);
        setErrors([data.error || "Login failed. Please try again."]);
      }
    } catch (error) {
      console.error(error);
      setErrors(["Unable to connect. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            width: "100%",
            maxWidth: 440,
            mx: "auto",
            p: 1,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 320,
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <CardHeader
                title="Login"
                slotProps={{
                  title: {
                    sx: {
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      textAlign: "center",
                    },
                  },
                }}
              />

              <CardContent>
                {registerSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Registration successful. Please login to continue.
                  </Alert>
                )}

                {logout && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Logged out successfully.
                  </Alert>
                )}

                {errors.map((error, index) => (
                  <Alert severity="error" key={index} sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                ))}

                <Box component="form" onSubmit={handleSubmit}>
                  <FormGroup
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <FormControl>
                      <TextField
                        fullWidth
                        required
                        label="Email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl>
                      <TextField
                        fullWidth
                        required
                        label="Password"
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="large"
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Login
                    </Button>
                  </FormGroup>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  <MuiLink
                    component={NextLink}
                    href="/register"
                    color="primary"
                    underline="hover"
                  >
                    Don&apos;t have an account? Register here
                  </MuiLink>
                </Box>
              </CardContent>
            </>
          )}
        </Card>
      </Container>
    </Box>
  );
}
