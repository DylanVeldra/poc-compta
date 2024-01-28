import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    router.push("/login");
  });
  return <div>Logout page</div>;
};

export default Logout;
