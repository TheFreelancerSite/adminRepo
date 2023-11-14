import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ReportsTable from "@/components/Tables/ReportsTable";
import TableTwo from "@/components/Tables/TableTwo";
import FreelancersTable from "@/components/Tables/FreelancersTable";
import ClientsTable from "@/components/Tables/ClientsTable";


import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <ClientsTable/>
        <TableTwo />
        <ReportsTable />
        <FreelancersTable/>
      </div>
    </>
  );
};

export default TablesPage;
