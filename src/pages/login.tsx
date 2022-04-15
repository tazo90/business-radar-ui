import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert } from "@components/ui/alert";
import Button from "@components/ui/button";
import { EmailField, Form, PasswordField } from "@components/ui/form/fields";
import { ErrorCode } from "@lib/auth";
import BaseLayout from "@components/layouts/base";

interface LoginValues {
  email: string;
  password: string;
  csrfToken: string;
}

export default function LoginPage({ csrfToken }: any) {
  const router = useRouter();
  const form = useForm<LoginValues>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errorMessages: { [key: string]: string } = {
    [ErrorCode.IncorrectPassword]: "Błędne hasło.",
    [ErrorCode.UserNotFound]: "Konto nie istnieje",
    [ErrorCode.InternalServerError]: "Coś poszło nie tak, spróbuj jeszcze raz.",
    [ErrorCode.ThirdPartyIdentityProviderEnabled]:
      "Konto stworzone przez identity providera.",
  };

  let callbackUrl =
    typeof router.query?.callbackUrl === "string"
      ? router.query.callbackUrl
      : "";

  // If not absolute URL, make it absolute
  if (/"\//.test(callbackUrl)) callbackUrl = callbackUrl.substring(1);
  if (!/^https?:\/\//.test(callbackUrl)) {
    callbackUrl = `http://localhost:3000/${callbackUrl}`;
  }

  const handleSubmit = async (values: any) => {
    try {
      const res = await signIn<"credentials">("credentials", {
        ...values,
        callbackUrl,
        redirect: false,
      });

      if (!res) setErrorMessage(errorMessages[ErrorCode.InternalServerError]);
      else if (!res.error) router.push(callbackUrl);
      else setErrorMessage(errorMessages[res.error] || "Coś poszło nie tak");
    } catch (err) {
      setErrorMessage(errorMessages[ErrorCode.InternalServerError]);
    }
  };

  return (
    <div className="relative -top-24 min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form
            form={form}
            className="space-y-6"
            handleSubmit={handleSubmit}
            data-testid="login-form"
          >
            <input
              defaultValue={csrfToken || undefined}
              type="hidden"
              hidden
              {...form.register("csrfToken")}
            />

            <EmailField
              id="email"
              label="Email"
              required
              {...form.register("email")}
            />

            <div className="relative">
              <div className="absolute right-0 -top-[4px]">
                <Link href="/forgot-password">
                  <a
                    tabIndex={-1}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </Link>
              </div>
              <PasswordField
                id="password"
                label="Password"
                autoComplete="current-password"
                required
                {...form.register("password")}
              />
            </div>

            {errorMessage && <Alert severity="error" title={errorMessage} />}

            <div className="flex space-y-2">
              <Button
                color="main"
                className="flex w-full justify-center"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Sign in
              </Button>
            </div>
          </Form>
        </div>

        {/* <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500">
                  <span className="mr-1">Don't have account?</span>
                  <button
                    onClick={() => router.push("/signup")}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </button>
                </span>
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
}

LoginPage.Layout = BaseLayout;
