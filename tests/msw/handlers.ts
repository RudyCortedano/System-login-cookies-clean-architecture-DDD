import { http, HttpResponse } from "msw";

type LoginRequestBody = {
  email: string;
  password: string;
};

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RequestResetBody = {
  email: string;
  frontBaseUrl: string;
};

export const handlers = [
  http.post("*/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequestBody;

    if (body?.password === "123456") {
      return HttpResponse.json({
        id: "user-123",
        email: body.email,
        firstName: "Tincu",
        lastName: "Pareda",
      });
    }

    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }),
  // -----------------------------------------------------------------------//
  // -----------------------------------------------------------------------//
  http.post("*/auth/register", async ({ request }) => {
    const body = (await request.json()) as RegisterBody;

    if (body.email === "exists@test.com") {
      return HttpResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    return HttpResponse.json({
      id: "user-999",
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    });
  }),
  // -----------------------------------------------------------------------//
  // -----------------------------------------------------------------------//
  http.get("*/auth/verify/:code", async ({ params }) => {
    const { code } = params as { code: string };

    if (code === "valid-code") {
      return HttpResponse.json({
        message: "Account verified successfully",
      });
    }

    return HttpResponse.json(
      { message: "Invalid verification code" },
      { status: 400 },
    );
  }),
  // -----------------------------------------------------------------------//
  // -----------------------------------------------------------------------//
  http.post("*/auth/reset_password", async ({ request }) => {
    const body = (await request.json()) as RequestResetBody;

    if (body.email === "tincu@test.com") {
      return HttpResponse.json({
        message: "Reset email sent successfully",
      });
    }

    return HttpResponse.json({ message: "Email not found" }, { status: 404 });
  }),
  // -----------------------------------------------------------------------//
  // -----------------------------------------------------------------------//
  http.post("*/auth/reset_password/:code", async ({ params, request }) => {
    const { code } = params as { code: string };
    const body = (await request.json()) as { password: string };

    if (!body.password) {
      return HttpResponse.json(
        { message: "Password is required" },
        { status: 400 },
      );
    }

    if (code === "valid-reset-token") {
      return HttpResponse.json({
        message: "Password reset successfully",
      });
    }

    return HttpResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 },
    );
  }),
  // -----------------------------------------------------------------------//
  // -----------------------------------------------------------------------//
  http.get("*/auth/verify_changePassword/:code", async ({ params }) => {
    const { code } = params as { code: string };

    if (code === "valid-change-code") {
      return HttpResponse.json({
        id: "user-999",
        authPasswordChange: true,
      });
    }

    return HttpResponse.json(
      { message: "Verification code not found" },
      { status: 404 },
    );
  }),
  // -----------------------------------------------------------------------//
  // -----------------------------------------------------------------------//
  http.get("*/user/profile", async ({ request }) => {
    const isAuthenticated = request.headers.get("x-test-auth") === "true";

    if (!isAuthenticated) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return HttpResponse.json({
      id: "user-999",
      firstName: "Tincu",
      lastName: "Pareda",
      email: "tincu@test.com",
    });
  }),
  // -----------------------------------------------------------------------//
  // -----------------------------------------------------------------------//
];
