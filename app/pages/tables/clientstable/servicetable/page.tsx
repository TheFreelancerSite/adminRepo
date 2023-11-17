import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ServicesTable from "@/components/Tables/ServicesTable";



// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Tables Page | Next.js E-commerce Dashboard Template",
//   description: "This is Tables page for TailAdmin Next.js",
//   // other metadata
// };

const servicetable= () => {
  return (
    <>
      <Breadcrumb pageName="Services Tables" />

      <div className="flex flex-col gap-10">
        <ServicesTable  />
       
      </div>
    </>
  );
};

export default servicetable;