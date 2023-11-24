import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from 'axios';

type User = {
  id: number;
  isSeller: boolean | null;
  imgUrl: string | null;
  username: string | null;
  email: string | null;
  country: string | null;
  phone: string | null;
  description: string | null;
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
      strokeColor: "#3056D3",
      strokeWidth: 3,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5,
    },
  },
  colors: ["#3C50E0", "#80CAEE", "#FFBB44", "#FF8042", "#00C6E8", "#B15DFF"],
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
    },
  },
  labels: ['Active Clients', 'Banned Clients', 'Active Freelancers', 'Banned Freelancers'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 25,
            formatter: function (val) {
              return val;
            },
          },
          value: {
            show: true,
            offsetY: -25,
            formatter: function (val) {
              return val + "%";
            },
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
            },
          },
        },
      },
    },
  },
};

interface ChartState {
  series: number[];
}

const ChartBan: React.FC = () => {
  const [state, setState] = useState<ChartState>({
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use axios.all to make multiple requests concurrently
        const [clientsResponse, freelancersResponse] = await axios.all([
          axios.get<User[]>("http://localhost:3000/admin/clients", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get<User[]>("http://localhost:3000/admin/freelancers", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);
  
        const countBanned = (arr: User[]) => arr.filter(item => item.banned !== 0).length;
  
        const activeClients = clientsResponse.data.length - countBanned(clientsResponse.data);
        const bannedClients = countBanned(clientsResponse.data);
        const activeFreelancers = freelancersResponse.data.length - countBanned(freelancersResponse.data);
        const bannedFreelancers = countBanned(freelancersResponse.data);
  
        console.log("Clients Response:", clientsResponse);
        console.log("Freelancers Response:", freelancersResponse);
  
        setState({
          series: [activeClients, bannedClients, activeFreelancers, bannedFreelancers],
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
