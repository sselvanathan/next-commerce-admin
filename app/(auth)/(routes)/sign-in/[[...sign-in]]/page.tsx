import {redirect} from "next/navigation";

const LoginPage = () => {
    return redirect("api/auth/signin")
};

export default LoginPage;
