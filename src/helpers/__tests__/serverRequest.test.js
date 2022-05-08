import serverRequest from "../serverRequest";

console.log(process.env.REACT_APP_BACKEND_URL);
const fakeHistory = {
  push: (string) => {
    console.log("the", string, "was pushed");
  },
};
it("processes custom server request", async () => {
  console.log(await serverRequest("GET", "/", {}, fakeHistory));
  expect();
});
