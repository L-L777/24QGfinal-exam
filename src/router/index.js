import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { Suspense } from "react";
import Loaders from "../components/Loaders";
export default function Router() {
  return <Suspense fallback={<Loaders />}>{useRoutes(routes)}</Suspense>;
}
