using CarbonAPI.Data;
using CarbonAPI.Models;

namespace CarbonAPI.Services;

public class CarbonCalculatorService
{
    public CarbonFootprintResponse Calculate(CarbonFootprintRequest request)
    {
        var transportation = (request.CarKmPerYear * 0.12)
                           + (request.BusKmPerYear * 0.03)
                           + (request.TrainKmPerYear * 0.004)
                           + (request.FlightHoursPerYear * 90);

        var energy = (request.ElectricityKwhPerYear * 0.5)
                   + (request.NaturalGasM3PerYear * 2.0);

        var foodDetails = new List<FoodResultItem>();
        double foodTotal = 0;
        foreach (var fi in request.Foods)
        {
            var item = FoodDatabase.FindById(fi.FoodId);
            if (item == null) continue;
            var annual = Math.Round(fi.KgPerWeek * item.Co2PerKg * 52, 1);
            foodTotal += annual;
            foodDetails.Add(new FoodResultItem
            {
                Name = item.Name,
                KgPerWeek = fi.KgPerWeek,
                AnnualCo2 = annual
            });
        }

        var wasteDetails = new List<WasteResultItem>();
        double wasteTotal = 0;
        foreach (var wi in request.WasteItems)
        {
            var cat = WasteDatabase.GetCategory(wi.Type);
            if (cat == null) continue;

            double disposalCo2 = wi.DisposalMethod switch
            {
                "incineration" => cat.IncinerationCo2PerKg,
                "recycling" => cat.RecyclingSavingPerKg * -1,
                _ => cat.LandfillCo2PerKg
            };

            var annual = Math.Round(wi.KgPerWeek * (cat.ProductionCo2PerKg + disposalCo2) * 52, 1);
            wasteTotal += annual;
            wasteDetails.Add(new WasteResultItem
            {
                Type = cat.Type,
                Label = cat.Label,
                Icon = cat.Icon,
                KgPerWeek = wi.KgPerWeek,
                AnnualCo2 = annual,
                DisposalMethod = wi.DisposalMethod,
                DamageFact = cat.DamageFact,
                DecompositionYears = cat.DecompositionYears
            });
        }

        var totalKg = transportation + energy + foodTotal + wasteTotal;
        var totalTons = Math.Round(totalKg / 1000, 2);

        var transportPct = totalKg > 0 ? Math.Round(transportation / totalKg * 100, 1) : 0;
        var energyPct = totalKg > 0 ? Math.Round(energy / totalKg * 100, 1) : 0;
        var foodPct = totalKg > 0 ? Math.Round(foodTotal / totalKg * 100, 1) : 0;
        var wastePct = totalKg > 0 ? Math.Round(wasteTotal / totalKg * 100, 1) : 0;

        return new CarbonFootprintResponse
        {
            TotalAnnualKgCO2 = Math.Round(totalKg, 0),
            TotalAnnualTonsCO2 = totalTons,
            TurkeyAverageTons = 6.3,
            WorldAverageTons = 4.7,
            TreesNeeded = totalKg > 0 ? Math.Round(totalKg / 21.7, 0) : 0,
            Breakdown = new CategoryBreakdown
            {
                Transportation = transportPct,
                Energy = energyPct,
                Food = foodPct,
                Waste = wastePct
            },
            FoodDetails = foodDetails,
            WasteDetails = wasteDetails
        };
    }
}
