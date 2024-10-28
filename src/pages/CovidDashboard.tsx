import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { RootState } from "../store";
import { setSelectedState } from "../store/covidSlice";
import CovidMap from "../components/CovidMap";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CovidDashboard = () => {
    const dispatch = useDispatch();
    const { data, selectedState } = useSelector(
        (state: RootState) => state.covid
    );
    const currentData = data[selectedState];

    const updateData = (state: string) => {
        dispatch(setSelectedState(state));
    };

    const getPieData = () => {
        return [
            { name: "Active", value: currentData.activeCases },
            { name: "Recovered", value: currentData.recovered },
            { name: "Deaths", value: currentData.deaths },
        ];
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">COVID-19 India Dashboard</h1>
                <Select value={selectedState} onValueChange={updateData}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(data).map((state) => (
                            <SelectItem key={state} value={state}>
                                {state}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { title: "Total Cases", value: currentData.totalCases },
                    { title: "Active Cases", value: currentData.activeCases },
                    { title: "Recovered", value: currentData.recovered },
                    { title: "Deaths", value: currentData.deaths },
                ].map((stat, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value.toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Map */}
            <Card>
                <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <CovidMap />
                </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={getPieData()}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {getPieData().map(
                                        (entry, index) =>
                                            entry && (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                    )}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={currentData.timeline}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="active"
                                    stroke="#8884d8"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="recovered"
                                    stroke="#82ca9d"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="deaths"
                                    stroke="#ff7300"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#0088FE"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CovidDashboard;
