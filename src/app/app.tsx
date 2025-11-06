import { useEffect } from "react";
import { mapDispatchToProps } from "./core/state/reducer/auth";
import AppRoutes from "./modules/routes";
import { RootState } from "./core/state/store";
import { useSelector } from "react-redux";
import Loader from "../app/core/components/Loader";

const App = () => {
  const { getCurrentUser } = mapDispatchToProps();
  const { loading } = useSelector((state: RootState) => state.auth.user);

  const { data } = useSelector((state: RootState) => state.auth.login);

  useEffect(() => {
    if (!loading && data?.access_token) getCurrentUser();
  }, [data?.access_token]);

  return (
    <>
      {!loading && (
        <>
          <AppRoutes />
        </>
      )}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </>
  );
};

export default App;
