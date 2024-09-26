import { AuthProvider } from "./AuthContext";
import { UIContextProvider } from "./UIContext";

export default function ContextProvider({ children }) {
  return (
    <AuthProvider>
      <UIContextProvider>
        <>{children}</>
      </UIContextProvider>
    </AuthProvider>
  );
}
