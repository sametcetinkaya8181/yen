using CarbonAPI.Data;
using CarbonAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarbonAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CampaignController : ControllerBase
{
    private readonly AppDbContext _db;

    public CampaignController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("join")]
    public async Task<ActionResult<object>> Join([FromBody] JoinRequest request)
    {
        var participant = new CampaignParticipant
        {
            Name = request.Name,
            Email = request.Email,
            CampaignId = request.CampaignId,
            WeeklyOrganicKg = request.WeeklyOrganicKg,
        };

        _db.CampaignParticipants.Add(participant);
        await _db.SaveChangesAsync();

        var count = await _db.CampaignParticipants
            .CountAsync(p => p.CampaignId == request.CampaignId);

        return Ok(new { id = participant.Id, totalParticipants = count });
    }

    [HttpGet("{campaignId}/stats")]
    public async Task<ActionResult<object>> GetStats(string campaignId)
    {
        var count = await _db.CampaignParticipants
            .CountAsync(p => p.CampaignId == campaignId);

        var totalWeeklyKg = await _db.CampaignParticipants
            .Where(p => p.CampaignId == campaignId)
            .SumAsync(p => p.WeeklyOrganicKg);

        return Ok(new
        {
            totalParticipants = count,
            totalWeeklyKg = Math.Round(totalWeeklyKg, 1),
        });
    }
}

public class JoinRequest
{
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string CampaignId { get; set; } = "compost";
    public double WeeklyOrganicKg { get; set; } = 5;
}
