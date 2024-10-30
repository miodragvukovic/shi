import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { ApiResponse } from "../Interfaces";

const fetchCharacters = async ({
  pageParam = 1,
  name = "",
}): Promise<ApiResponse> => {
  const response = await axiosInstance.get(
    `character?page=${pageParam}&name=${name}`
  );
  return response.data;
};

export const fetchCharacterInfo = async (param: any): Promise<any> => {
  const response = await axiosInstance.get(`character/${param}`);
  return response.data;
};

export const useInfiniteCharacters = (name = "") => {
  return useInfiniteQuery(
    ["characters", name],
    ({ pageParam }) => fetchCharacters({ pageParam, name }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.info.next
          ? lastPage.info.next.split("=")[1]
          : undefined;
      },
    }
  );
};
