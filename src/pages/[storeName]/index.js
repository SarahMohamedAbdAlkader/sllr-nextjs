import { useRouter } from "next/router";
import StoreLayout from "./store.js";

export default function StoreContainer() {
  const router = useRouter();
  return <StoreLayout params={router.query} />;
}
