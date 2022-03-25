import axios from "axios";
export default async function serverRequest(
  requestType,
  requestURL,
  requestPayload,
  history
) {
  try {
    let authToken = localStorage.getItem("closetlyToken");
    authToken = 1;
    if (authToken) {
      try {
        const result = await axios({
          method: requestType,
          url: `${process.env.REACT_APP_BACKEND_URL}/${requestURL}`,
          data: requestPayload,
          headers: { Authorization: `Basic ${authToken}` },
        });
        return result.data;
      } catch (err) {
        console.error(err);
      }
    }
  } finally {
    history.push("/login");
  }
}
