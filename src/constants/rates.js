export const COST_BUILD_RATES = {
  DRUM_SET_COST: 2300,        // 1 set = 1000 lbs
  PAYROLL_BURDEN: 1.2,        // 20%
  HOTEL_RATE: 200,            // Per night
  PER_DIEM: 75,               // Per day
  EXTENDED_DAY_RATE: 750,     // Charged to client for 3rd day+
  PPE_FIXED: 150,
  MAINTENANCE_FIXED: 300,
  MISC_FIXED: 300,
  OVERHEAD_FIXED: 500,
};

export const REVENUE_RATES = {
  SI_PRICE_PER_LB: 13,        // Base revenue per lb (raw)
  MOB_FEE_STANDARD: 2200,    // Flat fee for 2-day projects
};

export const CONVERSION_FACTORS = {
  YD_CONVERSION: 1.308,       // m3 to yd3
  LBS_PER_YD: 100,            // Density factor
  AVG_HIGHWAY_SPEED: 90,      // km/h for distance estimation
};
