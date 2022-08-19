import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, {AxiosRequestConfig} from "axios"

const apiInstance = axios.create({
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})

apiInstance.interceptors.request.use(
	async (config: AxiosRequestConfig) => {
		const token = await AsyncStorage.getItem("token") || ""
		
    if (token) {
			config.headers!["token"] = token
		}

		return config
	},
	(error) => {
		Promise.reject(error)
	}
)


apiInstance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
    if(error?.response?.status == 403){
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response)
  }
)

export default apiInstance