import axios from "axios";

export async function fetcher(url) {
  const rsp = await axios.get(url);
  if (rsp.status === 200) {
    return rsp.data;
  } else {
    throw new Error(rsp.statusText);
  }
}
