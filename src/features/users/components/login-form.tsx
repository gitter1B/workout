"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { login } from "@/features/users/lib/actions";
import { Loader2Icon } from "lucide-react";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, null);
  return (
    <div className="p-4 flex flex-col gap-4 w-96 border rounded-sm shadow-sm">
      <h2 className="text-center text-2xl font-semibold">Login Form</h2>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input id="username" name="username" />
          {state?.errors?.username &&
            state.errors.username.map((message) => {
              return (
                <p key={message} className="text-destructive">
                  {message}
                </p>
              );
            })}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input type="password" id="password" name="password" />
          {state?.errors?.password &&
            state.errors.password.map((message) => {
              return (
                <p key={message} className="text-destructive">
                  {message}
                </p>
              );
            })}
        </div>
        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? <Loader2Icon className="animate-spin" /> : null}
          Login
        </Button>
      </form>
    </div>
  );
};
