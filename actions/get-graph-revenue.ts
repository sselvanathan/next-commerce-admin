
interface GraphData {
    name: string;
    total: number;
}
export const getGraphRevenue = async (storeId: string) => {


    const graphData : GraphData[] = [
        { name: "Jan", total: 0},
        { name: "Feb", total: 0},
        { name: "Mar", total: 0},
        { name: "Apr", total: 0},
        { name: "May", total: 0},
        { name: "Jun", total: 0},
        { name: "Jul", total: 0},
        { name: "Aug", total: 0},
        { name: "Sep", total: 0},
        { name: "Oct", total: 0},
        { name: "Nov", total: 0},
        { name: "Dez", total: 0}
    ];

    return graphData;
}