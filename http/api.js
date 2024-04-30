import axios from "../http";

export const getMainNews = async (locale) => {
  try {
    const response = await axios.get(
      `/${locale}/api/information_service/newsForHomePage/?submenu_slug=/info_service/news`,
      {
        params: { locale },
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
  }
};

export const getBanner = async () => {
  try {
    const response = await axios.get(`/api/gallery/banner/`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const mapOfUzb = async (locale, id) => {
  try {
    const response = await axios.get(
      `/${locale}/api/employee/territory/territorialInspectionByRegionId/?region_id=${id}`,
      { params: { locale, id } }
    );
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const getPartners = async (locale) => {
  try {
    const response = await axios.get(
      `/${locale}/api/partners/?0=p&1=a&2=r&3=t&4=n&5=e&6=r&7=s`
    );
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
