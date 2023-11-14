import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FreelancersTable from "@/components/Tables/FreelancersTable";




// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Tables Page | Next.js E-commerce Dashboard Template",
//   description: "This is Tables page for TailAdmin Next.js",
//   // other metadata
// };

const freelancerstable = () => {
  return (
    <>
      <Breadcrumb pageName="Freelancers Tables" />

      <div className="flex flex-col gap-10">
        <FreelancersTable/>
       
      </div>
    </>
  );
};

export default freelancerstable;