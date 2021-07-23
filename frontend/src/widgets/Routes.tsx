import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Route } from "react-router-dom";

export const ProtectedRoute = ({ component, ...args }: any) => {
    return (
      <Route component={withAuthenticationRequired(component, {})} {...args} />
    );
}