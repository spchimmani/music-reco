import { useEffect } from "react";
import { useSearchParams , useNavigate} from "react-router-dom";
import axios from "axios";

function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authCodefromURL = searchParams.get("code");
    if (authCodefromURL) {
      // Send code to backend to exchange for access token
      axios.post("http://localhost:8000/spotify/callback", { code: authCodefromURL })
      .then(res => {
        console.log("FULL RESPONSE:", res);
        console.log("Access token response:", res.data.access_token);
        console.log("Refresh token:", res.data.refresh_token);
        if (res.data.access_token) {
          // Store tokens in local storage or context
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          // Redirect to home page or wherever you want
          navigate("/home");
        }
      });
    }
  }, [searchParams]);

  return <div>Authenticating with Spotify...</div>;
}

export default Callback;