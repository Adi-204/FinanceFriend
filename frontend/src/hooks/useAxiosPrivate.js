import axiosPrivate from "../api/axios.js";
import { useEffect } from "react";
import useAuth from "./useAuth.js";
import useRefreshToken from "./useRefreshToken.js";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { accessToken } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) =>{
                if(accessToken){
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (err) =>{
                return Promise.reject(err);
            }
        )
        
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (res) =>{
                return res;
            },
            async(err)=>{
                const originalConfig = err.config;
                const status = err.response.status;
                if(!status){
                    return Promise.reject(err);
                }
                if(status === 403 && !originalConfig._retry){
                    originalConfig._retry = true;
                    const refresh = useRefreshToken();
                    const newAccessToken = await refresh();
                    originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(originalConfig);
                }
                return Promise.reject(err);
            } 
        )        

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken,refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;
