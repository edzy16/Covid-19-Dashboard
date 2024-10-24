export interface CovidState {
    selectedState: string;
    loading: boolean;
    error: string | null;
    data: {
        [key: string]: StateData;
    };
}

export interface StateData {
    totalCases: number;
    activeCases: number;
    recovered: number;
    deaths: number;
    coordinates: [number, number];
    timeline: TimelineData[];
}

export interface TimelineData {
    date: string;
    total: number;
    active: number;
    recovered: number;
    deaths: number;
}
