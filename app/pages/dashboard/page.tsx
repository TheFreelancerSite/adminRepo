import { Metadata } from "next";
import HomePage from '../../../components/Dashboard/HomePage'

export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap 	">
        
        <HomePage />
      </div>
    </>
  );
}