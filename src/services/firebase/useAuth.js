import { useState} from "react";
function useAuth() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   return {isAuthenticated};
}
export default useAuth