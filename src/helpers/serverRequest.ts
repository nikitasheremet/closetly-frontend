import axios from "axios";
import { Method } from "axios";
import { History } from "history/index";

export default async function serverRequest(
  requestType: Method,
  requestURL: string,
  requestPayload: any,
  history: History,
  disableAuthTokenCheck = false
) {
  try {
    let authToken: string = localStorage.getItem("closetlyToken");
    console.log("authToken exists", !!authToken);
    if (authToken || disableAuthTokenCheck) {
      try {
        const result = await axios({
          method: requestType,
          url: `${process.env.REACT_APP_BACKEND_URL}/${requestURL}`,
          data: requestPayload,
          headers: { Authorization: `Basic ${authToken}` },
        });
        return result.data;
      } catch (err) {
        throw err;
      }
    }
    throw "authToken isnt present";
  } catch (err) {
    console.log(err);
    history.push("/login");
  }
}
