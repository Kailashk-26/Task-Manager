import { LockIcon, Mail, User } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

const Login = () => {
  const [state, setState] = useState("login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };
  return (
      <div className="flex items-center justify-center h-screen bg-neutral-600">
        <form
            onSubmit={handleSubmit}
            className=" sm:w-87 text-center border border-zinc-300/60 rounded-2xl px-8 bg-sky-200"
        >
            <h1 className="text-black text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Register"}
            </h1>
            <p className="text-black  text-sm mt-2 pb-6">
                Please {state === "login" ? "sign in" : "sign up"} to continue
            </p>

            {state !== "login" && (
                <div className="flex items-center w-full mt-4 bg-zinc-800 border border-zinc-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <User className="text-zinc-400"/>
                    <input type="text" placeholder="Name" className="bg-transparent text-zinc-200 placeholder-zinc-500 outline-none text-sm w-full h-full" name="name" value={data.name} onChange={onChangeHandler} required />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-zinc-800 border border-zinc-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail className="text-zinc-400"/>
                <input type="email" placeholder="Email" className="bg-transparent text-zinc-200 placeholder-zinc-500 outline-none text-sm w-full h-full" name="email" value={data.email} onChange={onChangeHandler} required />
            </div>

            <div className="flex items-center w-full mt-4 bg-zinc-800 border border-zinc-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <LockIcon className="text-zinc-400"/>
                <input type="password" placeholder="Password" className="bg-transparent text-zinc-200 placeholder-zinc-500 outline-none text-sm w-full h-full pr-4" name="password" value={data.password} onChange={onChangeHandler} required />
            </div>


            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-cyan-500 hover:opacity-90 transition-opacity" >
                {state === "login" ? "Login" : "Create Account"}
            </button>

            <p className="text-black text-sm mt-3 mb-11">
                {state === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                <button type="button" className="text-gray-600 " onClick={() => setState((prev) => prev === "login" ? "register" : "login")} >
                    {state === "login" ? "Register" : "Login"}
                </button>
            </p>
        </form>
      </div>
    );
}

export default Login