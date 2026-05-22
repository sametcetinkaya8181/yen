import i18n from '../i18n'
import type { CarbonFootprintRequest, CarbonFootprintResponse, FoodItem, WasteCategory } from '../types/carbon'

const API_URL = 'http://localhost:5000/api/carbon'

export async function calculateFootprint(data: CarbonFootprintRequest): Promise<CarbonFootprintResponse> {
  const res = await fetch(`${API_URL}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(i18n.t('carbonApi.calcError'))
  return res.json()
}

export async function searchFoods(query: string): Promise<FoodItem[]> {
  if (!query.trim()) return []
  const res = await fetch(`${API_URL}/foods/search?q=${encodeURIComponent(query)}`)
  if (!res.ok) return []
  return res.json()
}

export async function getAllFoods(): Promise<FoodItem[]> {
  const res = await fetch(`${API_URL}/foods`)
  if (!res.ok) return []
  return res.json()
}

export async function getWasteCategories(): Promise<WasteCategory[]> {
  const res = await fetch(`${API_URL}/waste/categories`)
  if (!res.ok) return []
  return res.json()
}

// Campaign API
const CAMPAIGN_URL = 'http://localhost:5000/api/campaign'

export async function joinCampaign(data: { name: string; email: string; campaignId: string; weeklyOrganicKg: number }): Promise<{ id: string; totalParticipants: number }> {
  const res = await fetch(`${CAMPAIGN_URL}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(i18n.t('carbonApi.joinError'))
  return res.json()
}

export async function getCampaignStats(campaignId: string): Promise<{ totalParticipants: number; totalWeeklyKg: number }> {
  const res = await fetch(`${CAMPAIGN_URL}/${campaignId}/stats`)
  if (!res.ok) return { totalParticipants: 0, totalWeeklyKg: 0 }
  return res.json()
}
