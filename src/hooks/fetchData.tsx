import axiosInstance from "../api/axiosInstance";

export const fetchData = async (
  target: string,
  id: string
): Promise<Location> => {
  const response = await axiosInstance.get(`/${target}/${id}`);
  return response.data;
};
