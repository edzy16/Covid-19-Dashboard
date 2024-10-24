import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CovidState, StateData } from "../types/covid";

const initialState: CovidState = {
    selectedState: "Maharashtra",
    loading: false,
    error: null,
    data: {
        Maharashtra: {
            totalCases: 8156789,
            activeCases: 15678,
            recovered: 7967890,
            deaths: 173221,
            coordinates: [19.7515, 75.7139],
            timeline: [
                {
                    date: "2024-01",
                    total: 8156700,
                    active: 15670,
                    recovered: 7967810,
                    deaths: 173220,
                },
                {
                    date: "2024-02",
                    total: 8156750,
                    active: 15675,
                    recovered: 7967850,
                    deaths: 173221,
                },
                {
                    date: "2024-03",
                    total: 8156789,
                    active: 15678,
                    recovered: 7967890,
                    deaths: 173221,
                },
            ],
        },
        Kerala: {
            totalCases: 5156789,
            activeCases: 10678,
            recovered: 5067890,
            deaths: 78221,
            coordinates: [10.8505, 76.2711],
            timeline: [
                {
                    date: "2024-01",
                    total: 5156700,
                    active: 10670,
                    recovered: 5067810,
                    deaths: 78220,
                },
                {
                    date: "2024-02",
                    total: 5156750,
                    active: 10675,
                    recovered: 5067850,
                    deaths: 78221,
                },
                {
                    date: "2024-03",
                    total: 5156789,
                    active: 10678,
                    recovered: 5067890,
                    deaths: 78221,
                },
            ],
        },
    },
};

const covidSlice = createSlice({
    name: "covid",
    initialState,
    reducers: {
        setSelectedState: (state, action: PayloadAction<string>) => {
            state.selectedState = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateStateData: (
            state,
            action: PayloadAction<{ state: string; data: StateData }>
        ) => {
            state.data[action.payload.state] = action.payload.data;
        },
    },
});

export const { setSelectedState, setLoading, setError, updateStateData } =
    covidSlice.actions;
export default covidSlice.reducer;
