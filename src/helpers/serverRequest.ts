import axios from "axios";
import { Method } from "axios";
import { History } from "history/index";

export default async function serverRequest(
  requestType: Method,
  requestURL: string,
  requestPayload: any,
  history: History
) {
  try {
    let authToken: string = localStorage.getItem("closetlyToken");
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
