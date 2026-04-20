import { COST_BUILD_RATES, REVENUE_RATES, CONVERSION_FACTORS } from '../constants/rates';

export const calculateQuote = (inputs) => {
  const {
    volume,
    travelHours,
    workers,
    days,
    waste,
    labourRate,
    escalation,
    fuelRate
  } = inputs;

  // ---- MATERIAL CALCULATIONS ----
  const rawLbs = volume * CONVERSION_FACTORS.YD_CONVERSION * CONVERSION_FACTORS.LBS_PER_YD;
  const wasteLbs = rawLbs * (waste / 100);
  const totalLbs = rawLbs + wasteLbs;

  // ---- REVENUE (Quote to Client) ----
  const materialRevenue = rawLbs * REVENUE_RATES.SI_PRICE_PER_LB;
  
  // Extended Day Charge (REVENUE: charged to client for 3rd day+)
  const extendedDayPrice = days > 2 ? (days - 2) * COST_BUILD_RATES.EXTENDED_DAY_RATE : 0;
  const totalMobRevenue = REVENUE_RATES.MOB_FEE_STANDARD + extendedDayPrice;

  const totalRevenue = materialRevenue + totalMobRevenue;
  const contingencyPrice = totalRevenue * (1 + escalation / 100);

  // ---- INTERNAL COST BUILD ----
  const materialCostInternal = (totalLbs / 1000) * COST_BUILD_RATES.DRUM_SET_COST;

  const travelTimeTotal = travelHours * 2;
  const dailyWorkingHours = 10; 
  const totalLabourHours = (dailyWorkingHours * days) + travelTimeTotal;
  const totalLabourCost = workers * totalLabourHours * labourRate * COST_BUILD_RATES.PAYROLL_BURDEN;

  const estimatedDistance = travelHours * 2 * CONVERSION_FACTORS.AVG_HIGHWAY_SPEED;
  const fuelCost = estimatedDistance * fuelRate;

  const hotelCost = workers * COST_BUILD_RATES.HOTEL_RATE * (days > 1 ? days - 1 : 0);
  const foodCost = workers * COST_BUILD_RATES.PER_DIEM * days;

  const totalInternalCost =
    materialCostInternal +
    totalLabourCost +
    fuelCost +
    hotelCost +
    foodCost +
    COST_BUILD_RATES.PPE_FIXED +
    COST_BUILD_RATES.MAINTENANCE_FIXED +
    COST_BUILD_RATES.MISC_FIXED +
    COST_BUILD_RATES.OVERHEAD_FIXED;

  const netProfit = totalRevenue - totalInternalCost;
  const margin = (netProfit / totalRevenue) * 100;

  return {
    rawLbs,
    totalLbs,
    materialRevenue,
    mobFee: REVENUE_RATES.MOB_FEE_STANDARD,
    extendedDayPrice,
    totalMobRevenue,
    totalRevenue,
    contingencyPrice,
    materialCostInternal,
    totalLabourCost,
    estimatedDistance,
    fuelCost,
    hotelCost,
    foodCost,
    totalInternalCost,
    netProfit,
    margin,
    days
  };
};
