import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import 'bootstrap/dist/css/bootstrap.css'
import Welcome from "@/app/components/Welcome";

export default function IndexPage() {
  return <Welcome/>
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
