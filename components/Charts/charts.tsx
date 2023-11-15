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
};


const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const options: ApexOptions = {
    legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
        // events: {
        //   beforeMount: (chart) => {
        //     chart.windowResizeHandler();
        //   },
        // },
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
            enabled: true,
            color: "#623CEA14",
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },

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
    stroke: {
        width: [2, 2],
        curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
            size: undefined,
            sizeOffset: 5,
        },
    },
    xaxis: {
        type: "category",
        categories: [], // Dynamic categories based on months
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

interface ChartOneState {
    series: {
        name: string;
        data: number[];
    }[];
}
const ChartOne: React.FC = () => {
    const [state, setState] = useState<ChartOneState>({
        series: [
            {
                name: "Clients",
                data: [],
            },
            {
                name: "Freelancers",
                data: [],
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientsResponse = await axios.get("http://localhost:3000/admin/clients", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const freelancersResponse = await axios.get("http://localhost:3000/admin/freelancers", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const clients = clientsResponse.data; // assuming the response directly contains the client data
                const freelancers = freelancersResponse.data; // assuming the response directly contains the freelancer data
                console.log("clients", clients)
                console.log("freelancers", freelancers)

                const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
                const clientData = months.map((month, index) => {
                    const count = clients.filter((client:client) => {
                        // Extract month from createdAt field
                        const clientCreationMonth = new Date(client.createdAt).getMonth();
                        // Compare it with the index of the current month in your months array
                        console.log("monthcreatedAt",clientCreationMonth)
                        return clientCreationMonth === index;
                    }).length;
                    console.log(`Month: ${month}, Count: ${count}`);
                    return count;
                });
                
                const freelancerData = months.map((month, index) => {
                    const count = freelancers.filter((freelancer:freelancer) => {
                        // Extract month from createdAt field
                        const freelancerCreationMonth = new Date(freelancer.createdAt).getMonth();
                        // Compare it with the index of the current month in your months array
                        return freelancerCreationMonth === index;
                    }).length;
                    console.log(`Month: ${month}, Count: ${count}`);
                    return count;
                });
                console.log("clientData", clientData)
                console.log("freelancerData", freelancerData)
                setState({
                    series: [
                        {
                            name: "Clients",
                            data: clientData,
                        },
                        {
                            name: "Freelancers",
                            data: freelancerData,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            {/* ... rest of your JSX */}
            <div>
                <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
                    <ReactApexChart
                        options={{
                            ...options,
                            xaxis: {
                                ...options.xaxis,
                                categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], // Add your months here
                            },
                        }}
                        series={state.series}
                        type="area"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartOne;