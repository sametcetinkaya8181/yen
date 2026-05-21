namespace CarbonAPI.Models;

public class CarbonFootprintResponse
{
    public double TotalAnnualKgCO2 { get; set; }
    public double TotalAnnualTonsCO2 { get; set; }
    public double TurkeyAverageTons { get; set; }
    public double WorldAverageTons { get; set; }
    public double TreesNeeded { get; set; }
    public CategoryBreakdown Breakdown { get; set; } = new();
    public List<FoodResultItem> FoodDetails { get; set; } = new();
    public List<WasteResultItem> WasteDetails { get; set; } = new();
}

public class CategoryBreakdown
{
    public double Transportation { get; set; }
    public double Energy { get; set; }
    public double Food { get; set; }
    public double Waste { get; set; }
}

public class FoodResultItem
{
    public string Name { get; set; } = "";
    public double KgPerWeek { get; set; }
    public double AnnualCo2 { get; set; }
}

public class WasteResultItem
{
    public string Type { get; set; } = "";
    public string Label { get; set; } = "";
    public string Icon { get; set; } = "";
    public double KgPerWeek { get; set; }
    public double AnnualCo2 { get; set; }
    public string DisposalMethod { get; set; } = "";
    public string DamageFact { get; set; } = "";
    public string DecompositionYears { get; set; } = "";
}
