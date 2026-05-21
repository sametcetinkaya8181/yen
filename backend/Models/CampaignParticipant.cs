using System.ComponentModel.DataAnnotations;

namespace CarbonAPI.Models;

public class CampaignParticipant
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(100)]
    public string Name { get; set; } = "";

    [MaxLength(200)]
    public string Email { get; set; } = "";

    [MaxLength(50)]
    public string CampaignId { get; set; } = "";

    public double WeeklyOrganicKg { get; set; } = 5;

    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}
