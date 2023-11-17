import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ReportsTable from "@/components/Tables/ReportsTable";



// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Tables Page | Next.js E-commerce Dashboard Template",
//   description: "This is Tables page for TailAdmin Next.js",
//   // other metadata
// };

const reporttable = () => {
  return (
    <>
      <Breadcrumb pageName="Repports Tables" />

      <div className="flex flex-col gap-10">
        <ReportsTable/>
       
      </div> 
    </>
  );
};

export default reporttable;