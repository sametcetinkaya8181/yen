using CarbonAPI.Models;

namespace CarbonAPI.Data;

public static class FoodDatabase
{
    private static readonly List<FoodItem> Foods = new()
    {
        // ===== ET & KÜMES =====
        new() { Id = "beef", Name = "Sığır Eti (Antrikot)", Category = "Kırmızı Et", Co2PerKg = 27.0 },
        new() { Id = "beef_rib", Name = "Sığır Eti (Kaburga)", Category = "Kırmızı Et", Co2PerKg = 28.0 },
        new() { Id = "beef_tenderloin", Name = "Sığır Eti (Bonfile)", Category = "Kırmızı Et", Co2PerKg = 29.0 },
        new() { Id = "beef_ground", Name = "Kıyma", Category = "Kırmızı Et", Co2PerKg = 26.0 },
        new() { Id = "lamb", Name = "Kuzu Eti", Category = "Kırmızı Et", Co2PerKg = 23.0 },
        new() { Id = "lamb_rib", Name = "Kuzu Pirzola", Category = "Kırmızı Et", Co2PerKg = 24.0 },
        new() { Id = "goat", Name = "Keçi Eti", Category = "Kırmızı Et", Co2PerKg = 20.0 },
        new() { Id = "pork", Name = "Domuz Eti", Category = "Beyaz Et", Co2PerKg = 7.9 },
        new() { Id = "chicken_breast", Name = "Tavuk Göğsü", Category = "Beyaz Et", Co2PerKg = 6.9 },
        new() { Id = "chicken_leg", Name = "Tavuk But", Category = "Beyaz Et", Co2PerKg = 7.2 },
        new() { Id = "chicken_wing", Name = "Tavuk Kanat", Category = "Beyaz Et", Co2PerKg = 7.5 },
        new() { Id = "chicken_whole", Name = "Bütün Tavuk", Category = "Beyaz Et", Co2PerKg = 6.8 },
        new() { Id = "turkey", Name = "Hindi Eti", Category = "Beyaz Et", Co2PerKg = 7.1 },
        new() { Id = "duck", Name = "Ördek Eti", Category = "Beyaz Et", Co2PerKg = 9.0 },
        new() { Id = "rabbit", Name = "Tavşan Eti", Category = "Beyaz Et", Co2PerKg = 5.0 },
        new() { Id = "horse", Name = "At Eti", Category = "Kırmızı Et", Co2PerKg = 12.0 },
        new() { Id = "buffalo", Name = "Manda Eti", Category = "Kırmızı Et", Co2PerKg = 18.0 },
        new() { Id = "sucuk", Name = "Sucuk", Category = "İşlenmiş Et", Co2PerKg = 22.0 },
        new() { Id = "salami", Name = "Salam", Category = "İşlenmiş Et", Co2PerKg = 18.0 },
        new() { Id = "sausage", Name = "Sosis", Category = "İşlenmiş Et", Co2PerKg = 16.0 },
        new() { Id = "pastirma", Name = "Pastırma", Category = "İşlenmiş Et", Co2PerKg = 20.0 },
        new() { Id = "bacon", Name = "Pastırma (Bacon)", Category = "İşlenmiş Et", Co2PerKg = 12.0 },

        // ===== DENİZ ÜRÜNLERİ =====
        new() { Id = "salmon_farmed", Name = "Somon (Çiftlik)", Category = "Deniz Ürünü", Co2PerKg = 5.0 },
        new() { Id = "salmon_wild", Name = "Somon (Doğal)", Category = "Deniz Ürünü", Co2PerKg = 3.5 },
        new() { Id = "tuna_canned", Name = "Konserve Ton Balığı", Category = "Deniz Ürünü", Co2PerKg = 6.0 },
        new() { Id = "tuna_fresh", Name = "Taze Ton Balığı", Category = "Deniz Ürünü", Co2PerKg = 7.0 },
        new() { Id = "anchovy", Name = "Hamsi", Category = "Deniz Ürünü", Co2PerKg = 3.0 },
        new() { Id = "sardine", Name = "Sardalya", Category = "Deniz Ürünü", Co2PerKg = 3.0 },
        new() { Id = "mackerel", Name = "Uskumru", Category = "Deniz Ürünü", Co2PerKg = 3.5 },
        new() { Id = "sea_bass", Name = "Levrek", Category = "Deniz Ürünü", Co2PerKg = 5.5 },
        new() { Id = "sea_bream", Name = "Çipura", Category = "Deniz Ürünü", Co2PerKg = 5.0 },
        new() { Id = "trout", Name = "Alabalık", Category = "Deniz Ürünü", Co2PerKg = 4.0 },
        new() { Id = "shrimp", Name = "Karides", Category = "Deniz Ürünü", Co2PerKg = 12.0 },
        new() { Id = "mussel", Name = "Midye", Category = "Deniz Ürünü", Co2PerKg = 2.0 },
        new() { Id = "crab", Name = "Yengeç", Category = "Deniz Ürünü", Co2PerKg = 10.0 },
        new() { Id = "octopus", Name = "Ahtapot", Category = "Deniz Ürünü", Co2PerKg = 7.0 },
        new() { Id = "calamari", Name = "Kalamar", Category = "Deniz Ürünü", Co2PerKg = 6.0 },
        new() { Id = "cod", Name = "Morina", Category = "Deniz Ürünü", Co2PerKg = 4.0 },

        // ===== SÜT & SÜT ÜRÜNLERİ =====
        new() { Id = "milk_whole", Name = "Tam Yağlı Süt", Category = "Süt Ürünü", Co2PerKg = 3.2 },
        new() { Id = "milk_semi", Name = "Yarım Yağlı Süt", Category = "Süt Ürünü", Co2PerKg = 3.0 },
        new() { Id = "milk_skim", Name = "Yağsız Süt", Category = "Süt Ürünü", Co2PerKg = 2.8 },
        new() { Id = "yogurt", Name = "Yoğurt", Category = "Süt Ürünü", Co2PerKg = 3.5 },
        new() { Id = "kefir", Name = "Kefir", Category = "Süt Ürünü", Co2PerKg = 3.6 },
        new() { Id = "ayran", Name = "Ayran", Category = "Süt Ürünü", Co2PerKg = 1.8 },
        new() { Id = "cheese_cheddar", Name = "Çedar Peyniri", Category = "Peynir", Co2PerKg = 13.5 },
        new() { Id = "cheese_feta", Name = "Beyaz Peynir", Category = "Peynir", Co2PerKg = 11.0 },
        new() { Id = "cheese_mozzarella", Name = "Mozzarella", Category = "Peynir", Co2PerKg = 12.0 },
        new() { Id = "cheese_parmesan", Name = "Parmesan", Category = "Peynir", Co2PerKg = 14.0 },
        new() { Id = "cheese_blue", Name = "Mavi Peynir", Category = "Peynir", Co2PerKg = 13.0 },
        new() { Id = "cheese_cream", Name = "Krem Peynir", Category = "Peynir", Co2PerKg = 10.0 },
        new() { Id = "cheese_goat", Name = "Keçi Peyniri", Category = "Peynir", Co2PerKg = 9.0 },
        new() { Id = "cheese_processed", Name = "Eritme Peyniri", Category = "Peynir", Co2PerKg = 10.0 },
        new() { Id = "butter", Name = "Tereyağı", Category = "Süt Ürünü", Co2PerKg = 12.0 },
        new() { Id = "cream", Name = "Kaymak/Krema", Category = "Süt Ürünü", Co2PerKg = 8.0 },
        new() { Id = "ice_cream", Name = "Dondurma", Category = "Süt Ürünü", Co2PerKg = 5.0 },

        // ===== YUMURTA =====
        new() { Id = "eggs", Name = "Yumurta", Category = "Yumurta", Co2PerKg = 4.8 },
        new() { Id = "eggs_free_range", Name = "Köy Yumurtası", Category = "Yumurta", Co2PerKg = 4.0 },

        // ===== TAHILLAR =====
        new() { Id = "rice_white", Name = "Beyaz Pirinç", Category = "Tahıl", Co2PerKg = 4.0 },
        new() { Id = "rice_brown", Name = "Esmer Pirinç", Category = "Tahıl", Co2PerKg = 3.8 },
        new() { Id = "bread_white", Name = "Beyaz Ekmek", Category = "Tahıl", Co2PerKg = 1.2 },
        new() { Id = "bread_whole", Name = "Tam Buğday Ekmeği", Category = "Tahıl", Co2PerKg = 1.1 },
        new() { Id = "bread_rye", Name = "Çavdar Ekmeği", Category = "Tahıl", Co2PerKg = 1.2 },
        new() { Id = "pasta", Name = "Makarna", Category = "Tahıl", Co2PerKg = 1.3 },
        new() { Id = "noodle", Name = "Şehriye/Erişte", Category = "Tahıl", Co2PerKg = 1.4 },
        new() { Id = "bulgur", Name = "Bulgur", Category = "Tahıl", Co2PerKg = 1.0 },
        new() { Id = "couscous", Name = "Kuskus", Category = "Tahıl", Co2PerKg = 1.2 },
        new() { Id = "flour_wheat", Name = "Buğday Unu", Category = "Tahıl", Co2PerKg = 1.0 },
        new() { Id = "flour_corn", Name = "Mısır Unu", Category = "Tahıl", Co2PerKg = 1.1 },
        new() { Id = "corn", Name = "Mısır (Tane)", Category = "Tahıl", Co2PerKg = 1.0 },
        new() { Id = "oats", Name = "Yulaf", Category = "Tahıl", Co2PerKg = 1.5 },
        new() { Id = "barley", Name = "Arpa", Category = "Tahıl", Co2PerKg = 1.2 },
        new() { Id = "quinoa", Name = "Kinoa", Category = "Tahıl", Co2PerKg = 2.5 },

        // ===== BAKLAGİLLER =====
        new() { Id = "lentil_red", Name = "Kırmızı Mercimek", Category = "Baklagil", Co2PerKg = 1.9 },
        new() { Id = "lentil_green", Name = "Yeşil Mercimek", Category = "Baklagil", Co2PerKg = 1.8 },
        new() { Id = "chickpea", Name = "Nohut", Category = "Baklagil", Co2PerKg = 1.8 },
        new() { Id = "beans_dry", Name = "Kuru Fasulye", Category = "Baklagil", Co2PerKg = 2.0 },
        new() { Id = "beans_green", Name = "Taze Fasulye", Category = "Baklagil", Co2PerKg = 1.5 },
        new() { Id = "chickpea_fresh", Name = "Taze Nohut", Category = "Baklagil", Co2PerKg = 1.6 },
        new() { Id = "peas", Name = "Bezelye", Category = "Baklagil", Co2PerKg = 1.4 },
        new() { Id = "soybean", Name = "Soya Fasulyesi", Category = "Baklagil", Co2PerKg = 1.5 },
        new() { Id = "tofu", Name = "Tofu", Category = "Baklagil", Co2PerKg = 3.5 },
        new() { Id = "tempeh", Name = "Tempeh", Category = "Baklagil", Co2PerKg = 3.0 },
        new() { Id = "broad_bean", Name = "Bakla", Category = "Baklagil", Co2PerKg = 1.3 },

        // ===== SEBZELER =====
        new() { Id = "tomato", Name = "Domates", Category = "Sebze", Co2PerKg = 2.1 },
        new() { Id = "tomato_cherry", Name = "Çeri Domates", Category = "Sebze", Co2PerKg = 2.5 },
        new() { Id = "cucumber", Name = "Salatalık", Category = "Sebze", Co2PerKg = 1.5 },
        new() { Id = "pepper_green", Name = "Yeşil Biber", Category = "Sebze", Co2PerKg = 1.8 },
        new() { Id = "pepper_red", Name = "Kırmızı Biber", Category = "Sebze", Co2PerKg = 2.0 },
        new() { Id = "pepper_hot", Name = "Acı Biber", Category = "Sebze", Co2PerKg = 2.2 },
        new() { Id = "eggplant", Name = "Patlıcan", Category = "Sebze", Co2PerKg = 1.7 },
        new() { Id = "zucchini", Name = "Kabak", Category = "Sebze", Co2PerKg = 1.3 },
        new() { Id = "onion", Name = "Soğan", Category = "Sebze", Co2PerKg = 1.0 },
        new() { Id = "garlic", Name = "Sarımsak", Category = "Sebze", Co2PerKg = 1.5 },
        new() { Id = "potato", Name = "Patates", Category = "Sebze", Co2PerKg = 0.8 },
        new() { Id = "carrot", Name = "Havuç", Category = "Sebze", Co2PerKg = 0.9 },
        new() { Id = "broccoli", Name = "Brokoli", Category = "Sebze", Co2PerKg = 1.5 },
        new() { Id = "spinach", Name = "Ispanak", Category = "Sebze", Co2PerKg = 1.4 },
        new() { Id = "cabbage", Name = "Lahana", Category = "Sebze", Co2PerKg = 1.1 },
        new() { Id = "cauliflower", Name = "Karnabahar", Category = "Sebze", Co2PerKg = 1.3 },
        new() { Id = "lettuce", Name = "Marul", Category = "Sebze", Co2PerKg = 1.2 },
        new() { Id = "leek", Name = "Pırasa", Category = "Sebze", Co2PerKg = 1.0 },
        new() { Id = "mushroom", Name = "Mantar", Category = "Sebze", Co2PerKg = 2.0 },
        new() { Id = "celery", Name = "Kereviz", Category = "Sebze", Co2PerKg = 1.1 },
        new() { Id = "asparagus", Name = "Kuşkonmaz", Category = "Sebze", Co2PerKg = 3.0 },

        // ===== MEYVELER =====
        new() { Id = "apple", Name = "Elma", Category = "Meyve", Co2PerKg = 0.4 },
        new() { Id = "banana", Name = "Muz", Category = "Meyve", Co2PerKg = 0.8 },
        new() { Id = "orange", Name = "Portakal", Category = "Meyve", Co2PerKg = 0.3 },
        new() { Id = "mandarin", Name = "Mandalina", Category = "Meyve", Co2PerKg = 0.3 },
        new() { Id = "lemon", Name = "Limon", Category = "Meyve", Co2PerKg = 0.3 },
        new() { Id = "grape", Name = "Üzüm", Category = "Meyve", Co2PerKg = 0.5 },
        new() { Id = "strawberry", Name = "Çilek", Category = "Meyve", Co2PerKg = 1.5 },
        new() { Id = "watermelon", Name = "Karpuz", Category = "Meyve", Co2PerKg = 0.6 },
        new() { Id = "melon", Name = "Kavun", Category = "Meyve", Co2PerKg = 0.5 },
        new() { Id = "cherry", Name = "Kiraz", Category = "Meyve", Co2PerKg = 0.7 },
        new() { Id = "peach", Name = "Şeftali", Category = "Meyve", Co2PerKg = 0.6 },
        new() { Id = "apricot", Name = "Kayısı", Category = "Meyve", Co2PerKg = 0.6 },
        new() { Id = "pear", Name = "Armut", Category = "Meyve", Co2PerKg = 0.5 },
        new() { Id = "fig", Name = "İncir", Category = "Meyve", Co2PerKg = 0.7 },
        new() { Id = "pomegranate", Name = "Nar", Category = "Meyve", Co2PerKg = 0.8 },
        new() { Id = "kiwi", Name = "Kivi", Category = "Meyve", Co2PerKg = 0.9 },
        new() { Id = "pineapple", Name = "Ananas", Category = "Meyve", Co2PerKg = 1.2 },
        new() { Id = "mango", Name = "Mango", Category = "Meyve", Co2PerKg = 1.4 },
        new() { Id = "avocado", Name = "Avokado", Category = "Meyve", Co2PerKg = 2.5 },
        new() { Id = "coconut", Name = "Hindistan Cevizi", Category = "Meyve", Co2PerKg = 1.8 },
        new() { Id = "dried_apricot", Name = "Kuru Kayısı", Category = "Kuru Meyve", Co2PerKg = 2.5 },
        new() { Id = "dried_fig", Name = "Kuru İncir", Category = "Kuru Meyve", Co2PerKg = 2.3 },
        new() { Id = "raisin", Name = "Kuru Üzüm", Category = "Kuru Meyve", Co2PerKg = 2.0 },

        // ===== KURUYEMİŞ & TOHUM =====
        new() { Id = "almond", Name = "Badem", Category = "Kuruyemiş", Co2PerKg = 2.5 },
        new() { Id = "walnut", Name = "Ceviz", Category = "Kuruyemiş", Co2PerKg = 1.7 },
        new() { Id = "hazelnut", Name = "Fındık", Category = "Kuruyemiş", Co2PerKg = 1.5 },
        new() { Id = "pistachio", Name = "Antep Fıstığı", Category = "Kuruyemiş", Co2PerKg = 2.0 },
        new() { Id = "peanut", Name = "Yer Fıstığı", Category = "Kuruyemiş", Co2PerKg = 1.8 },
        new() { Id = "sunflower_seed", Name = "Ay Çekirdeği", Category = "Tohum", Co2PerKg = 1.6 },
        new() { Id = "pumpkin_seed", Name = "Kabak Çekirdeği", Category = "Tohum", Co2PerKg = 1.4 },
        new() { Id = "chia", Name = "Chia Tohumu", Category = "Tohum", Co2PerKg = 2.0 },
        new() { Id = "flaxseed", Name = "Keten Tohumu", Category = "Tohum", Co2PerKg = 1.5 },
        new() { Id = "sesame", Name = "Susam", Category = "Tohum", Co2PerKg = 1.3 },

        // ===== İÇECEKLER =====
        new() { Id = "coffee", Name = "Kahve", Category = "İçecek", Co2PerKg = 17.0 },
        new() { Id = "tea", Name = "Çay", Category = "İçecek", Co2PerKg = 5.0 },
        new() { Id = "cocoa", Name = "Kakao", Category = "İçecek", Co2PerKg = 15.0 },
        new() { Id = "orange_juice", Name = "Portakal Suyu", Category = "İçecek", Co2PerKg = 1.2 },
        new() { Id = "apple_juice", Name = "Elma Suyu", Category = "İçecek", Co2PerKg = 1.0 },
        new() { Id = "soda", Name = "Gazlı İçecek", Category = "İçecek", Co2PerKg = 0.5 },
        new() { Id = "beer", Name = "Bira", Category = "İçecek", Co2PerKg = 1.5 },
        new() { Id = "wine", Name = "Şarap", Category = "İçecek", Co2PerKg = 2.0 },
        new() { Id = "soy_milk", Name = "Soya Sütü", Category = "İçecek", Co2PerKg = 1.0 },
        new() { Id = "oat_milk", Name = "Yulaf Sütü", Category = "İçecek", Co2PerKg = 0.6 },
        new() { Id = "almond_milk", Name = "Badem Sütü", Category = "İçecek", Co2PerKg = 0.7 },

        // ===== ATIŞTIRMALIK & TATLI =====
        new() { Id = "chocolate_dark", Name = "Bitter Çikolata", Category = "Tatlı", Co2PerKg = 19.0 },
        new() { Id = "chocolate_milk", Name = "Sütlü Çikolata", Category = "Tatlı", Co2PerKg = 18.0 },
        new() { Id = "chocolate_white", Name = "Beyaz Çikolata", Category = "Tatlı", Co2PerKg = 16.0 },
        new() { Id = "candy", Name = "Şeker", Category = "Tatlı", Co2PerKg = 3.0 },
        new() { Id = "honey", Name = "Bal", Category = "Tatlı", Co2PerKg = 2.5 },
        new() { Id = "baklava", Name = "Baklava", Category = "Tatlı", Co2PerKg = 4.0 },
        new() { Id = "cake", Name = "Kek/Pasta", Category = "Tatlı", Co2PerKg = 3.5 },
        new() { Id = "biscuit", Name = "Bisküvi", Category = "Atıştırmalık", Co2PerKg = 3.0 },
        new() { Id = "chips", Name = "Cips", Category = "Atıştırmalık", Co2PerKg = 3.5 },
        new() { Id = "cracker", Name = "Kraker", Category = "Atıştırmalık", Co2PerKg = 2.5 },

        // ===== YAĞLAR =====
        new() { Id = "olive_oil", Name = "Zeytinyağı", Category = "Yağ", Co2PerKg = 4.0 },
        new() { Id = "sunflower_oil", Name = "Ayçiçek Yağı", Category = "Yağ", Co2PerKg = 3.5 },
        new() { Id = "corn_oil", Name = "Mısırözü Yağı", Category = "Yağ", Co2PerKg = 3.0 },
        new() { Id = "coconut_oil", Name = "Hindistan Cevizi Yağı", Category = "Yağ", Co2PerKg = 3.5 },

        // ===== HAZIR YEMEKLER =====
        new() { Id = "kebab_doner", Name = "Döner Kebap", Category = "Hazır Yemek", Co2PerKg = 15.0 },
        new() { Id = "kebab_adana", Name = "Adana Kebap", Category = "Hazır Yemek", Co2PerKg = 18.0 },
        new() { Id = "kebab_urfa", Name = "Urfa Kebap", Category = "Hazır Yemek", Co2PerKg = 17.0 },
        new() { Id = "pizza", Name = "Pizza", Category = "Hazır Yemek", Co2PerKg = 7.0 },
        new() { Id = "burger", Name = "Hamburger", Category = "Hazır Yemek", Co2PerKg = 10.0 },
        new() { Id = "dolma", Name = "Dolma/Sarma", Category = "Hazır Yemek", Co2PerKg = 3.0 },
        new() { Id = "borek", Name = "Börek", Category = "Hazır Yemek", Co2PerKg = 4.5 },
        new() { Id = "pide", Name = "Pide/Lahmacun", Category = "Hazır Yemek", Co2PerKg = 5.0 },
        new() { Id = "soup_lentil", Name = "Mercimek Çorbası", Category = "Hazır Yemek", Co2PerKg = 1.5 },
        new() { Id = "soup_tarhana", Name = "Tarhana Çorbası", Category = "Hazır Yemek", Co2PerKg = 1.8 },
        new() { Id = "soup_chicken", Name = "Tavuk Çorbası", Category = "Hazır Yemek", Co2PerKg = 3.0 },
        new() { Id = "rice_pilaf", Name = "Pirinç Pilavı", Category = "Hazır Yemek", Co2PerKg = 2.5 },
        new() { Id = "bulgur_pilaf", Name = "Bulgur Pilavı", Category = "Hazır Yemek", Co2PerKg = 1.2 },
        new() { Id = "fries", Name = "Kızartma Patates", Category = "Hazır Yemek", Co2PerKg = 2.0 },
        new() { Id = "menemen", Name = "Menemen", Category = "Hazır Yemek", Co2PerKg = 3.0 },
        new() { Id = "manti", Name = "Mantı", Category = "Hazır Yemek", Co2PerKg = 4.0 },
    };

    public static FoodItem? FindById(string id)
    {
        return Foods.FirstOrDefault(f => f.Id == id);
    }

    public static List<FoodItem> Search(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Foods.Take(20).ToList();

        var q = query.ToLowerInvariant();
        return Foods
            .Where(f => f.Name.ToLowerInvariant().Contains(q) ||
                       f.Category.ToLowerInvariant().Contains(q) ||
                       f.Id.Contains(q))
            .Take(20)
            .ToList();
    }

    public static List<FoodItem> GetAll()
    {
        return Foods.ToList();
    }
}
