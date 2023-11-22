import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from 'axios';

type client = {
  id: number; // Accepts null values
  isSeller: boolean | null; // Accepts null values
  imgUrl: string | null; // Accepts null values
  userName: string | null; // Accepts null values
  email: string | null; // Accepts null values
  country: string | null; // Accepts null values
  phone: string | null; // Accepts null values
  description: string | null; // Accepts null values
  createdAt: string;
  banned: number;
  banExpires: Date
};

type freelancer = {
  id: number; // Accepts null values
  isSeller: boolean | null; // Accepts null values
  imgUrl: string | null; // Accepts null values
  username: string | null; // Accepts null values
  email: string | null; // Accepts null values
  country: string | null; // Accepts null values
  phone: string | null; // Accepts null values
  description: string | null; // Accepts null values
  createdAt: string;
  banned: number;
  banExpires: Date;
};


const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    fontWeight: 400,
    markers: {
      width: 4,
      height: 4,
      strokeColor: "#3056D3", // Adjusted property name
      strokeWidth: 3,
      
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5
    },
  },
  colors: ["#3C50E0", "#80CAEE", "#FFBB44", "#FF8042", "#00C6E8", "#B15DFF"], // Add your desired colors here
  chart: {
    type: "pie",
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  dataLabels: {
    enabled: true,
    enabledOnSeries: undefined,
    formatter: function (val, opts) {
      return opts.w.globals.series[opts.seriesIndex] + "%";
    },
    textAnchor: 'middle',
    distributed: false,
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 400,
      colors: undefined
    },
  },
  labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'], // Labels for pie sections
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 25,
            formatter: function (val) {
              return val;
            }
          },
          value: {
            show: true,
            offsetY: -25,
            formatter: function (val) {
              return val + "%";
            }
          },
          total: {
            show: true,
            showAlways: false,
            label: 'Total',
            fontSize: '16px',
            fontWeight: 600,
            color: '#373d3f',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a: any, b: any) => {
                return a + b;
              }, 0) + '%';
            }
          },
        },
      },
    }
  },
};


interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

  
  const ChartBan: React.FC = () => {
    const [state, setState] = useState<ChartState>({
      series: [],
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [clientsResponse, freelancersResponse] = await Promise.all([
            axios.get<client[]>("http://localhost:3000/admin/clients", {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }),
            axios.get<freelancer[]>("http://localhost:3000/admin/freelancers", {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }),
          ]);
  
          const clients = clientsResponse.data;
          const freelancers = freelancersResponse.data;
  
          const countBanned = (arr: { banned: number }[]) => arr.filter(item => item.banned !== 0).length;
  
          const activeClients = clients.length - countBanned(clients);
          const bannedClients = countBanned(clients);
          const activeFreelancers = freelancers.length - countBanned(freelancers);
          const bannedFreelancers = countBanned(freelancers);
  
          setState({
            series: [
              { name: "Active Clients", data: [activeClients] },
              { name: "Banned Clients", data: [bannedClients] },
              { name: "Active Freelancers", data: [activeFreelancers] },
              { name: "Banned Freelancers", data: [bannedFreelancers] },
            ],
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <>
      <ReactApexChart type="pie" options={options} series={state.series} height={350} />
    </>
  );
};

export default ChartBan;