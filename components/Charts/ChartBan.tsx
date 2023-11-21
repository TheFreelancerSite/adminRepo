import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
export interface ChartData {
  name: string;
  data: number[];
}
const ChartBan = () => {
  const [state, setState] = useState<ChartData[]>([
    {
      name: "Clients",
      data: [], // Default empty data
    },
    {
      name: "Freelancers",
      data: [], // Default empty data
    },
  ]);

  const options = {
    labels: ['Banned', 'Unbanned'],
    responsive: [{
      breakpoint: undefined,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:3000/user/getUsers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const users = usersResponse.data; // Assuming the response directly contains the client data

        // Process the data into the required format for the chart
        const formattedData: ChartData[] = [
          {
            name: "Clients",
            data: [users.clientsBannedCount, users.clientsUnbannedCount],
          },
          {
            name: "Freelancers",
            data: [users.freelancersBannedCount, users.freelancersUnbannedCount],
          },
        ];

        setState(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ApexChart type="pie" options={options} series={state} height={400} width={500} />
    </div>
  );
}

export default ChartBan;
