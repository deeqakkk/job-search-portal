import { delay } from "./index";

var fetching = false;
var page = 0;

export const fetchJobs = async (retry = 3) => {
  if (fetching) return;
  fetching = true;
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: page++ * 10,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );

    const data = await response.json();
    fetching = false;
    return data;
  } catch (e) {
    await delay(500);
    if (retry > 0) return fetchJobs(retry - 1);
    fetching = false;
    return null;
  }
};
