import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAccessToken } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/user/refresh');
        const accessToken = response.data.accessToken;
        setAccessToken(accessToken);
        return accessToken;
    }
    return refresh;
};

export default useRefreshToken;
