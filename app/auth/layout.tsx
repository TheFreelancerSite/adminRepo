"use client";
import "../globals.css";
import "../data-tables-css.css";
import "../satoshi.css";
import { useState, useEffect } from "react";

import Loader from "@/components/common/Loader";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (


            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>



          )}

        </div>
      </body>
    </html>
  );
}
