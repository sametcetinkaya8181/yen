export interface CarbonFootprintRequest {
  carKmPerYear: number
  busKmPerYear: number
  trainKmPerYear: number
  flightHoursPerYear: number
  electricityKwhPerYear: number
  naturalGasM3PerYear: number
  foods: FoodInput[]
  wasteItems: WasteInput[]
}

export interface FoodInput {
  foodId: string
  kgPerWeek: number
}

export interface WasteInput {
  type: string
  kgPerWeek: number
  disposalMethod: 'landfill' | 'incineration' | 'recycling'
}

export interface FoodItem {
  id: string
  name: string
  category: string
  co2PerKg: number
}

export interface WasteCategory {
  type: string
  label: string
  icon: string
  productionCo2PerKg: number
  landfillCo2PerKg: number
  incinerationCo2PerKg: number
  recyclingSavingPerKg: number
  damageFact: string
  decompositionYears: string
}

export interface CategoryBreakdown {
  transportation: number
  energy: number
  food: number
  waste: number
}

export interface FoodResultItem {
  name: string
  kgPerWeek: number
  annualCo2: number
}

export interface WasteResultItem {
  type: string
  label: string
  icon: string
  kgPerWeek: number
  annualCo2: number
  disposalMethod: string
  damageFact: string
  decompositionYears: string
}

export interface CarbonFootprintResponse {
  totalAnnualKgCO2: number
  totalAnnualTonsCO2: number
  turkeyAverageTons: number
  worldAverageTons: number
  treesNeeded: number
  breakdown: CategoryBreakdown
  foodDetails: FoodResultItem[]
  wasteDetails: WasteResultItem[]
}
