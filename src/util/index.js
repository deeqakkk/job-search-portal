export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const capitalizeFirstLetter = (str = "") => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const filterData = (filter, jdList) => {
  let filteredList = jdList;

  if (filter?.roles?.length > 0) {
    filteredList = filteredList?.filter((jd) =>
      filter?.roles?.includes(jd?.jobRole)
    );
  }
  if (filter?.experience) {
    filteredList = filteredList?.filter(
      (jd) => jd?.minExp <= filter?.experience
    );
  }
  if (filter?.minPay) {
    filteredList = filteredList?.filter(
      (jd) => jd?.minJdSalary >= filter?.minPay
    );
  }
  if (filter?.locationType?.length > 0) {
    filteredList = filteredList?.filter((jd) =>
      filter?.locationType?.includes(jd?.location.toLowerCase())
    );
  }

  if (filter?.location?.length > 0) {
    filteredList = filteredList?.filter((jd) =>
      filter?.location?.includes(jd?.location.toUpperCase())
    );
  }

  if (filter?.name) {
    filteredList = filteredList?.filter((jd) =>
      jd?.companyName?.toLowerCase().includes(filter?.name?.toLowerCase())
    );
  }

  return filteredList;
};
