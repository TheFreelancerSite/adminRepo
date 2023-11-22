// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ClientsTable from "@/components/Tables/ClientsTable"



// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Tables Page | Next.js E-commerce Dashboard Template",
//   description: "This is Tables page for TailAdmin Next.js",
//   // other metadata
// };

const clientstable = () => {
  return (
    <>
      
      {/* <Breadcrumb pageName="Clients Tables" /> */}
      <div className="flex flex-col gap-10">
        <ClientsTable  />
       
      </div>
    </>
  );
};

export default clientstable;