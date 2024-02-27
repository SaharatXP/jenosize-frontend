// middleware/auth.js
export default function ({ redirect }) {
  if (process.client) {
    const accessToken = window.localStorage.getItem("accessToken");
    const user = window.localStorage.getItem("user");
    if (!accessToken || !user) {
      console.log("not logged in");
      return redirect("/login");
    }
  }
}
