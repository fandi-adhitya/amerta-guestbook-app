import axios from "axios"

const errorFormat = (error : unknown) : string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as any)?.message
  } else {
    return (error as Error).message
  }
}

export default errorFormat
