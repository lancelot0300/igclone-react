import { FC } from "react";
import { Navigate } from "react-router-dom";

 interface IProtectedRouteProps {
    redirectPath: string;
    children: JSX.Element;
    isAllowed: boolean;
}

export const ProtectedRoute:FC<IProtectedRouteProps> = ({
    isAllowed,
    redirectPath = '/',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} />;
    }
  
    return children;
  };
  