import axios from "axios";
import { BaseUrl } from "./Constants";

const Instance = axios.create({
  baseURL: BaseUrl,
});

export default Instance;
