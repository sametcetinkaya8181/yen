using CarbonAPI.Models;

namespace CarbonAPI.Data;

public static class WasteDatabase
{
    private static readonly List<WasteCategory> Categories = new()
    {
        new()
        {
            Type = "plastic", Label = "Plastik", Icon = "🧴",
            ProductionCo2PerKg = 6.0, LandfillCo2PerKg = 0.5,
            IncinerationCo2PerKg = 2.7, RecyclingSavingPerKg = 1.5,
            DecompositionYears = "450 yıl",
            DamageFact = "Bir plastik şişe doğada 450 yıl yok olmuyor. Her yıl 8 milyon ton plastik okyanuslara karışıyor. 2050'de okyanuslarda balıktan çok plastik olacak. Mikroplastikler artık içme suyumuzda ve kanımızda!"
        },
        new()
        {
            Type = "glass", Label = "Cam", Icon = "🫙",
            ProductionCo2PerKg = 0.8, LandfillCo2PerKg = 0.0,
            IncinerationCo2PerKg = 0.0, RecyclingSavingPerKg = 0.3,
            DecompositionYears = "1 milyon yıl",
            DamageFact = "Cam doğada 1 milyon yıl boyunca yok olmuyor! Geri dönüştürülen her 1 ton cam, 300 kg CO₂ tasarrufu sağlar. Atılan cam şişeler yaban hayatı için ölümcül olabilir."
        },
        new()
        {
            Type = "paper", Label = "Kağıt/Karton", Icon = "📦",
            ProductionCo2PerKg = 1.0, LandfillCo2PerKg = 0.6,
            IncinerationCo2PerKg = 0.4, RecyclingSavingPerKg = 0.6,
            DecompositionYears = "3 ay - 5 yıl",
            DamageFact = "Her yıl 3 milyar ağaç kağıt üretimi için kesiliyor! 1 ton kağıt üretmek için 24 ağaç kesilir. Kağıt atıkları çöplüklerin en büyük bölümünü oluşturur."
        },
        new()
        {
            Type = "metal", Label = "Metal (Alüminyum)", Icon = "🥫",
            ProductionCo2PerKg = 9.0, LandfillCo2PerKg = 0.0,
            IncinerationCo2PerKg = 0.0, RecyclingSavingPerKg = 8.0,
            DecompositionYears = "200 yıl",
            DamageFact = "Alüminyum üretimi en yüksek karbon ayak izine sahip metallerdendir! Bir alüminyum kutu doğada 200 yıl kalır. Geri dönüştürülen her 1 kg alüminyum, 8 kg CO₂ tasarrufu sağlar!"
        },
        new()
        {
            Type = "organic", Label = "Organik Atık", Icon = "🍌",
            ProductionCo2PerKg = 0.0, LandfillCo2PerKg = 0.5,
            IncinerationCo2PerKg = 0.1, RecyclingSavingPerKg = 0.4,
            DecompositionYears = "2-6 hafta",
            DamageFact = "Çöplükte çürüyen organik atıklar metan gazı üretir! Metan, CO₂'den 25 kat daha zararlı bir sera gazıdır. Kompost yaparak bu etkiyi sıfıra indirebilirsiniz."
        },
        new()
        {
            Type = "ewaste", Label = "Elektronik Atık", Icon = "🔋",
            ProductionCo2PerKg = 12.0, LandfillCo2PerKg = 3.0,
            IncinerationCo2PerKg = 5.0, RecyclingSavingPerKg = 10.0,
            DecompositionYears = "Binlerce yıl",
            DamageFact = "E-atık dünyada en hızlı büyüyen atık türü! 1 ton e-atık, 200 ton CO₂ emisyonuna eşdeğerdir. İçerdiği ağır metaller toprağı ve suyu zehirler."
        },
        new()
        {
            Type = "textile", Label = "Tekstil", Icon = "👕",
            ProductionCo2PerKg = 7.0, LandfillCo2PerKg = 1.0,
            IncinerationCo2PerKg = 2.0, RecyclingSavingPerKg = 5.0,
            DecompositionYears = "50-200 yıl",
            DamageFact = "Bir kot pantolon üretimi 10.000 litre su ve 33 kg CO₂ harcar! Her saniye bir kamyon dolusu tekstil çöpe gidiyor. Hızlı moda, gezegenimizi boğuyor!"
        }
    };

    public static WasteCategory? GetCategory(string type)
    {
        return Categories.FirstOrDefault(c => c.Type == type);
    }

    public static List<WasteCategory> GetAll()
    {
        return Categories.ToList();
    }
}
