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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });

    setIsLoading(false);

    if (response.ok) {
      router.push("/login?registerSuccess=true");
    } else {
      const data = await response.json();
      try {
        const errors = JSON.parse(data.error);
        setErrors(errors.map((error: { message: string }) => error.message));
      } catch (error) {
        console.error(error);
        setErrors([data.error]);
      }
    }
  };
  return (
    <>
      <Container
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
                  minHeight: "500px",
                }}
              >
                <CircularProgress />
              </Box>
            </>
          )}
          {!isLoading && (
            <>
              <CardHeader title="Register" />
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
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                      />
                    </FormControl>
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
                    <FormControl>
                      <TextField
                        fullWidth
                        required
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
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
                      Register
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
                  <Link href="/login">Already have an account? Login here</Link>
                </Box>
              </CardContent>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
