import { Checkbox } from "@mui/material";
import InputField from "../_components/InputField";
import SignUpNav from "../_components/SignUpNav";
import PasswordField from "../_components/PasswordField";
import { signIn } from "@/auth";
import UserModel from "@/models/User";
import bcrypt, { hash } from "bcryptjs";
import { connectToDatabase } from "@/lib/database";

function SignupPage() {
  return (
    <div className="flex h-svh flex-col items-center justify-between px-3 py-3">
      <SignUpNav heading="Signup" />
      <form
        className="flex flex-col items-center gap-5 px-7"
        action={async (formData) => {
          "use server";
          const email = formData.get("Email");
          const password = formData.get("password");
          const formType = formData.get("formType");
          console.log(email, password, formType);
          if (!email || !password) throw new Error("Enter in all fields");
          const hashpass = await bcrypt.hash(password, 8);
          await connectToDatabase();
          await UserModel.create({ email, password: hashpass });

          await signIn("Credentials", formData);
        }}
      >
        <h1 className="from-accent-tint-900 text-7xl font-semibold tracking-wide">
          Cupid
        </h1>
        <span className="font-semibold text-accent-tint-700">
          Continue with the Email
        </span>
        <input
          type="text"
          hidden
          aria-hidden
          defaultValue="signup"
          name="formType"
        />
        <InputField label="Email" />
        <PasswordField name="password" />
        <div className="align-top">
          <Checkbox aria-label="Checkbox" name="checkbox" />
          <span>
            I agree to <a>terms & conditions</a>
          </span>
        </div>

        <button className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
