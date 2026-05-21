namespace CarbonAPI.Models;

public class WasteCategory
{
    public string Type { get; set; } = "";
    public string Label { get; set; } = "";
    public string Icon { get; set; } = "";
    public double ProductionCo2PerKg { get; set; }
    public double LandfillCo2PerKg { get; set; }
    public double IncinerationCo2PerKg { get; set; }
    public double RecyclingSavingPerKg { get; set; }
    public string DamageFact { get; set; } = "";
    public string DecompositionYears { get; set; } = "";
}

public class WasteInput
{
    public string Type { get; set; } = "";
    public double KgPerWeek { get; set; }
    public string DisposalMethod { get; set; } = "landfill"; // landfill, incineration, recycling
}
