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
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

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
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    setIsLoading(false);

    if (response.ok) {
      router.push("/dashboard");
    } else {
      const data = await response.json();
      try {
        if (data.error) {
          setErrors([data.error.message]);
        } else {
          const errors = JSON.parse(data.error);
          setErrors(errors.map((error: { message: string }) => error.message));
        }
      } catch (error) {
        console.error(error);
        setErrors([data.error]);
      }
    }
  };
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 400, padding: 2 }}>
          {isLoading && (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "350px",
                }}
              >
                <CircularProgress />
              </Box>
            </>
          )}
          {!isLoading && (
            <>
              <CardHeader title="Login" />
              {registerSuccess && (
                <Alert severity="success" sx={{ marginBottom: 2 }}>
                  Registration successful. Please login to continue.
                </Alert>
              )}
              {logout && (
                <Alert severity="success" sx={{ marginBottom: 2 }}>
                  Logged out successfully.
                </Alert>
              )}
              {errors.map((error, index) => (
                <Alert severity="error" key={index} sx={{ marginBottom: 2 }}>
                  {error}
                </Alert>
              ))}
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <FormGroup
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <FormControl>
                      <TextField
                        fullWidth
                        required
                        label="Email"
                        name="email"
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
                      sx={{ marginTop: 2 }}
                    >
                      Login
                    </Button>
                  </FormGroup>
                </form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    marginTop: 4,
                  }}
                >
                  <Link href="/register">
                    Don&apos;t have an account? Register here
                  </Link>
                </Box>
              </CardContent>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
