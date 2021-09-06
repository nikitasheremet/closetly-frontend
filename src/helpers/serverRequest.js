import axios from "axios";
export default async function serverRequest(
  requestType,
  requestURL,
  requestPayload,
  history
) {
  const authToken = localStorage.getItem("closetlyToken");
  if (authToken) {
    const result = await axios({
      method: requestType,
      url: `${process.env.REACT_APP_BACKEND_URL}/${requestURL}`,
      data: requestPayload,
      headers: { Authorization: `Basic ${authToken}` },
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 403) {
        history.push("/login");
      }
    });
    return result.data;
  } else {
    history.push("/login");
  }
}
