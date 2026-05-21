namespace CarbonAPI.Models;

public class CarbonFootprintRequest
{
    public double CarKmPerYear { get; set; }
    public double BusKmPerYear { get; set; }
    public double TrainKmPerYear { get; set; }
    public double FlightHoursPerYear { get; set; }
    public double ElectricityKwhPerYear { get; set; }
    public double NaturalGasM3PerYear { get; set; }
    public List<FoodInput> Foods { get; set; } = new();
    public List<WasteInput> WasteItems { get; set; } = new();
}
