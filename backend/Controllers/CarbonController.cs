using CarbonAPI.Data;
using CarbonAPI.Models;
using CarbonAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarbonAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarbonController : ControllerBase
{
    private readonly CarbonCalculatorService _calculator;

    public CarbonController(CarbonCalculatorService calculator)
    {
        _calculator = calculator;
    }

    [HttpPost("calculate")]
    public ActionResult<CarbonFootprintResponse> Calculate([FromBody] CarbonFootprintRequest request)
    {
        var result = _calculator.Calculate(request);
        return Ok(result);
    }

    [HttpGet("foods/search")]
    public ActionResult<List<FoodItem>> SearchFoods([FromQuery] string q = "")
    {
        var results = FoodDatabase.Search(q);
        return Ok(results);
    }

    [HttpGet("foods")]
    public ActionResult<List<FoodItem>> GetAllFoods()
    {
        return Ok(FoodDatabase.GetAll());
    }

    [HttpGet("waste/categories")]
    public ActionResult<List<WasteCategory>> GetWasteCategories()
    {
        return Ok(WasteDatabase.GetAll());
    }

    [HttpGet("averages")]
    public ActionResult<object> GetAverages()
    {
        return Ok(new
        {
            TurkeyAverageTons = 6.3,
            WorldAverageTons = 4.7,
            TargetAverageTons = 2.0
        });
    }
}
