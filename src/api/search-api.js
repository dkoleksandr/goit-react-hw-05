import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const getSearchApi = async (searchQuery, page) => {
  const { data } = await axios.get("/search/photos", {
    params: {
      query: searchQuery,
      client_id: '6FT8qaNMbVdsDnvvjia-ve_gP6sr4q8g672jAkrxEfk',
      per_page: 9,
      page,
    },
  });
  return data.results;
};
