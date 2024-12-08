import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="min-h-16 px-4 sm:px-8 flex items-center justify-between border-b">
      <span>LOGO</span>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>
    </header>
  );
};
