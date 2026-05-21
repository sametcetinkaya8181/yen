using CarbonAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarbonAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<CampaignParticipant> CampaignParticipants => Set<CampaignParticipant>();
}
