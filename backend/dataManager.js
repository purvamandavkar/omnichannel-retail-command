import fs from 'fs';

// Safe JSON loader
function loadJSON(filename, defaultValue) {
    try {
        const raw = fs.readFileSync(`./data/${filename}`, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        return defaultValue;
    }
}

// ========== 1. SALES FORECAST ==========
const defaultMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const defaultSales = [500, 550, 600, 620, 650, 700, 660, 680, 690, 710, 720, 700];
const defaultForecast = [480, 530, 590, 610, 640, 690, 640, 660, 670, 690, 700, 680];

const customSales = loadJSON('sales_forecast.json', null);
const baselineMonths = customSales && customSales.months ? customSales.months : defaultMonths;
const baselineSales = customSales && customSales.sales ? customSales.sales : defaultSales;
const baselineForecast = customSales && customSales.forecast ? customSales.forecast : defaultForecast;

let currentSalesData = [...baselineSales];
let currentForecastData = [...baselineForecast];
let totalSales = currentSalesData.reduce((a, b) => a + b, 0) / 1000;
let netProfit = 0.842;
let omnichannelGrowth = 14.2;
let npsScore = 78.4;
let activePromotions = 12;
let endingSoonPromotions = 4;
let inventoryTurnover = 6.8;
let customerSatisfaction = 4.8;

// ========== 2. TOP CHANNELS ==========
const defaultChannels = [
    { name: "E-Commerce Store", type: "DIRECT SALES", share: 0.49 },
    { name: "Flagship NY", type: "PHYSICAL RETAIL", share: 0.197 },
    { name: "Marketplace App", type: "MOBILE NATIVE", share: 0.12 },
    { name: "Other Channels", type: "PARTNER & POP-UP", share: 0.193 }
];
let channelDistribution = loadJSON('channels.json', defaultChannels);

// ========== 3. INVENTORY ALERTS ==========
const defaultAlerts = [
    { id: 1, product: "Velocity X1 - Crimson", location: "Northeast Hub", urgency: "RESTOCK NOW", stock: null },
    { id: 2, product: "STOCK: 12", location: "West Warehouse", urgency: "RESTOCK NOW", stock: 12 },
    { id: 3, product: "Chronos Series 4", location: "West Warehouse", urgency: "RESTOCK NOW", stock: null },
    { id: 4, product: "STOCK: 4", location: "Global Center", urgency: "RESTOCK NOW", stock: 4 }
];
let dynamicAlerts = loadJSON('inventory_alerts.json', defaultAlerts);

// ========== 4. INVENTORY OPTIMIZATION ==========
const defaultInvOpt = {
    outOfStockItems: 42,
    overstockValue: 1.2,
    avgDaysToSell: 18.4,
    fulfillmentRate: 98.2,
    overstockPercent: 4.2,
    overstockTarget: 4.2,
    optimalRange: { min: 97.5, max: 99.0 },
    demandForecast: { labels: ['AUG', 'SEP', 'OCT'], historical: [124, 138, 142], predictive: [128, 145, 156] },
    recommendations: [
        { id: 1, product: "Velo-Speed Pro X", urgency: "CRITICAL", action: "Immediate reorder" },
        { id: 2, product: "Quantum Core Watch", urgency: "2 DAYS LEFT", action: "Expedite" },
        { id: 3, product: "Echelon NC-400", urgency: "REORDER SOON", action: "Schedule" },
        { id: 4, product: "Urban Canvas Lite", urgency: "ADEQUATE", action: "Monitor" }
    ],
    quickReport: [
        { product: "Velo-Speed Pro X", status: "CRITICAL", currentStock: 420, growth: "+12.4%", trend: "High" },
        { product: "Quantum Core Watch", status: "2 DAYS LEFT", currentStock: 128, growth: "+8.2%", trend: "Medium" },
        { product: "Echelon NC-400", status: "REORDER SOON", currentStock: 310, growth: "+5.1%", trend: "Low" }
    ]
};
let inventoryOptimization = loadJSON('inventory_optimization.json', defaultInvOpt);

// ========== 5. SALES ANALYTICS ==========
const defaultSalesAnalytics = {
    grossRevenue: 2842900,
    grossRevenueGrowth: 12.4,
    avgOrderValue: 142.50,
    avgOrderValueChange: -2.1,
    conversionRate: 4.82,
    conversionRateChange: 0.6,
    omnichannelMetric: 89,
    categorySales: {
        labels: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT'],
        series: { Apparel: [12500, 13200, 14100, 13800, 15200], Electronics: [18400, 19200, 20500, 21800, 23400], Home: [8900, 9200, 9700, 10100, 10800] }
    },
    channelSplit: { onlineMarketplace: 64, physicalRetail: 36 },
    keyInsight: "Online sales have grown by 18% since loyalty program integration.",
    regionalData: { northAmerica: 1200, europe: 940, asiaPacific: 702 },
    topProducts: [
        { id: "99402-B", name: "A1 Precision Tech", category: "ELECTRONICS", unitsSold: 2840, revenue: 568000, status: "Best Seller" },
        { id: "88310-C", name: "E4 Omni-Noise Headphones", category: "ELECTRONICS", unitsSold: 3420, revenue: 478800, status: "Trending" }
    ]
};
let salesAnalytics = loadJSON('sales_analytics.json', defaultSalesAnalytics);

// ========== 6. CHANNEL PERFORMANCE ==========
const defaultChannelPerf = {
    omniChannelGrowth: 18.4,
    omniChannelGrowthChange: 2.1,
    totalConvRate: 4.82,
    totalConvRateChange: -0.4,
    avgCac: 12.40,
    avgCacChange: -5.2,
    activeChannels: 12,
    channelHealthIndex: { ownedWeb: { velocity: 78, retention: 65, growth: 82, margin: 71, reach: 88 }, marketplaces: { velocity: 54, retention: 42, growth: 67, margin: 49, reach: 91 } },
    comparativePerformance: [
        { channel: "Web Store", conversionRate: 5.2, aov: 142 },
        { channel: "Physical Retail", conversionRate: 12.8, aov: 98 },
        { channel: "Mobile App", conversionRate: 3.1, aov: 185 }
    ],
    customerAcquisitionCost: { webStore: 14.20, mobileApp: 22.50, physical: 8.30, marketplace: 18.90 },
    recentActivities: [
        { text: "New promotion live on Amazon.", time: "2 mins ago", type: "Marketing" },
        { text: "Inventory sync delay: NY Store.", time: "15 mins ago", type: "Logistics" }
    ],
    channelDrilldown: [
        { name: "Shopify Direct", revenueShare: 42.5, refundRate: 1.2, customerLtv: 4820, status: "OPTIMAL" },
        { name: "Brick & Mortar", revenueShare: 28.1, refundRate: 0.8, customerLtv: 2140, status: "STEADY" }
    ]
};
let channelPerformance = loadJSON('channel_performance.json', defaultChannelPerf);

// ========== 7. PREDICTIVE FORECASTING ==========
const defaultPredictive = {
    nextMonthSalesPrediction: 728,
    predictionLowerBound: 685,
    predictionUpperBound: 779,
    promotionLiftEstimate: 18.5,
    whatIfDiscountImpact: 0,
    recommendedReorderSkus: [
        { sku: "VELO-X1", name: "Velocity X1", currentStock: 42, predictedOutOfStockDays: 8 },
        { sku: "CHRONOS-4", name: "Chronos Series 4", currentStock: 18, predictedOutOfStockDays: 3 }
    ]
};
let predictiveForecasting = loadJSON('predictive_forecasting.json', defaultPredictive);

// ========== 8. CUSTOMER INSIGHTS ==========
const defaultCustomer = {
    customerLtv: 1240,
    repeatPurchaseRate: 68.4,
    churnRisk: "Low",
    avgDaysBetweenPurchases: 42,
    customerSegments: [
        { name: "Brand Loyalists", percentage: 32, clv: 2450 },
        { name: "High Spenders", percentage: 18, clv: 3800 },
        { name: "Bargain Hunters", percentage: 28, clv: 620 }
    ],
    atRiskCustomers: [
        { id: "C10042", name: "Sarah Johnson", lastPurchase: "2025-03-10", totalSpent: 890 },
        { id: "C10221", name: "Michael Chen", lastPurchase: "2025-02-28", totalSpent: 1240 }
    ]
};
let customerInsights = loadJSON('customer_insights.json', defaultCustomer);

// ========== RANDOMIZATION FUNCTIONS ==========
function recomputeMetrics() {
    totalSales = currentSalesData.reduce((a, b) => a + b, 0) / 1000;
    netProfit = parseFloat((totalSales * (0.18 + Math.random() * 0.04)).toFixed(2));
    inventoryTurnover = parseFloat((6.5 + Math.random() * 0.7).toFixed(1));
    customerSatisfaction = parseFloat((4.7 + Math.random() * 0.2).toFixed(1));
    omnichannelGrowth = parseFloat((13.5 + Math.random() * 2.5).toFixed(1));
    npsScore = parseFloat((76 + Math.random() * 6).toFixed(1));
    activePromotions = Math.floor(10 + Math.random() * 5);
    endingSoonPromotions = Math.min(activePromotions, Math.floor(2 + Math.random() * 4));
}

function randomizeSalesForecast() {
    currentSalesData = baselineSales.map(v => Math.round(v * (0.94 + Math.random() * 0.12)));
    currentForecastData = baselineForecast.map(v => Math.round(v * (0.94 + Math.random() * 0.12)));
    recomputeMetrics();
}

function randomizeChannelShares() {
    let newShares = channelDistribution.map(c => c.share);
    let perturbation = newShares.map(() => (Math.random() - 0.5) * 0.06);
    let newSum = newShares.reduce((a, b, i) => a + b + perturbation[i], 0);
    let finalShares = newShares.map((s, idx) => (s + perturbation[idx]) / newSum);
    channelDistribution = channelDistribution.map((ch, idx) => ({...ch, share: finalShares[idx] }));
}

function randomizeInventory() {
    inventoryOptimization.outOfStockItems = Math.floor(35 + Math.random() * 21);
    inventoryOptimization.overstockValue = parseFloat((0.9 + Math.random() * 0.6).toFixed(1));
    inventoryOptimization.avgDaysToSell = parseFloat((15 + Math.random() * 7).toFixed(1));
    inventoryOptimization.fulfillmentRate = parseFloat((96.5 + Math.random() * 2.7).toFixed(1));
    inventoryOptimization.overstockPercent = parseFloat((3.5 + Math.random() * 1.5).toFixed(1));
}

function randomizeSales() {
    salesAnalytics.grossRevenue = Math.floor(2500000 + Math.random() * 700000);
    salesAnalytics.grossRevenueGrowth = parseFloat((8 + Math.random() * 12).toFixed(1));
    salesAnalytics.avgOrderValue = parseFloat((120 + Math.random() * 50).toFixed(2));
    salesAnalytics.conversionRate = parseFloat((3.5 + Math.random() * 2.5).toFixed(2));
}

function randomizeChannel() {
    channelPerformance.omniChannelGrowth = parseFloat((12 + Math.random() * 10).toFixed(1));
    channelPerformance.totalConvRate = parseFloat((3.5 + Math.random() * 2).toFixed(2));
    channelPerformance.avgCac = parseFloat((8 + Math.random() * 8).toFixed(2));
    channelPerformance.activeChannels = 10 + Math.floor(Math.random() * 5);
}

function randomizePredictive() {
    const basePred = 700 + Math.random() * 100;
    predictiveForecasting.nextMonthSalesPrediction = Math.round(basePred);
    predictiveForecasting.predictionLowerBound = Math.round(basePred * (0.92 + Math.random() * 0.04));
    predictiveForecasting.predictionUpperBound = Math.round(basePred * (1.04 + Math.random() * 0.06));
    predictiveForecasting.promotionLiftEstimate = parseFloat((12 + Math.random() * 15).toFixed(1));
}

function randomizeCustomer() {
    customerInsights.customerLtv = Math.floor(800 + Math.random() * 1200);
    customerInsights.repeatPurchaseRate = parseFloat((50 + Math.random() * 35).toFixed(1));
    const risks = ["Low", "Medium", "High"];
    customerInsights.churnRisk = risks[Math.floor(Math.random() * risks.length)];
}

// ========== MAIN EXPORTS ==========
export function randomizeDashboard() {
    randomizeSalesForecast();
    randomizeChannelShares();
    if (Math.random() > 0.7) {
        dynamicAlerts.push({ id: Date.now(), product: "⚠️ LIMITED EDITION", location: "Central Hub", urgency: "HIGH DEMAND", stock: null });
    }
    randomizeInventory();
    randomizeSales();
    randomizeChannel();
    randomizePredictive();
    randomizeCustomer();
    return getDashboardData();
}

export function getDashboardData() {
    const topChannels = channelDistribution
        .filter(ch => !ch.name.toLowerCase().includes('other'))
        .map(ch => ({
            name: ch.name,
            type: ch.type,
            revenue: parseFloat((totalSales * ch.share).toFixed(2))
        }));

    const chartData = baselineMonths.map((month, idx) => ({
        month,
        sales: currentSalesData[idx],
        forecast: currentForecastData[idx]
    }));

    return {
        kpis: { omnichannelGrowth, npsScore, activePromotions, endingSoonPromotions, totalSales, netProfit, inventoryTurnover, customerSatisfaction },
        chartData,
        topChannels,
        inventoryAlerts: dynamicAlerts,
        inventoryOptimization,
        salesAnalytics,
        channelPerformance,
        predictiveForecasting,
        customerInsights,
        lastUpdated: new Date().toISOString()
    };
}

// Seed initial data
randomizeSalesForecast();
randomizeChannelShares();
randomizeInventory();
randomizeSales();
randomizeChannel();
randomizePredictive();
randomizeCustomer();
recomputeMetrics();