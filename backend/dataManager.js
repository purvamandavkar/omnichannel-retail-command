const baselineMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'];
const baselineSales = [500, 550, 600, 620, 650, 700, 660];
const baselineForecast = [480, 530, 590, 610, 640, 690, 640];

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

let channelDistribution = [
    { name: "E-Commerce Store", type: "DIRECT SALES", share: 0.49 },
    { name: "Flagship NY", type: "PHYSICAL RETAIL", share: 0.197 },
    { name: "Marketplace App", type: "MOBILE NATIVE", share: 0.12 },
    { name: "Other Channels", type: "PARTNER & POP-UP", share: 0.193 }
];

let dynamicAlerts = [
    { id: 1, product: "Velocity X1 - Crimson", location: "Northeast Distribution Hub", urgency: "RESTOCK NOW", stock: null },
    { id: 2, product: "STOCK: 12", location: "West Coast Warehouse", urgency: "RESTOCK NOW", stock: 12 },
    { id: 3, product: "Chronos Series 4", location: "West Coast Warehouse", urgency: "RESTOCK NOW", stock: null },
    { id: 4, product: "STOCK: 4", location: "Global Shipping Center", urgency: "RESTOCK NOW", stock: 4 }
];

let inventoryOptimization = {
    outOfStockItems: 42,
    overstockValue: 1.2,
    avgDaysToSell: 18.4,
    fulfillmentRate: 98.2,
    overstockPercent: 4.2,
    overstockTarget: 4.2,
    optimalRange: { min: 97.5, max: 99.0 },
    demandForecast: { labels: ['AUG 01', 'SEP 15', 'OCT 01'], historical: [124, 138, 142], predictive: [128, 145, 156] },
    recommendations: [
        { id: 1, product: "Velo-Speed Pro X", urgency: "CRITICAL", action: "Immediate reorder" },
        { id: 2, product: "Quantum Core Watch", urgency: "2 DAYS LEFT", action: "Expedite" },
        { id: 3, product: "Echelon NC-400", urgency: "REORDER SOON", action: "Schedule" },
        { id: 4, product: "Urban Canvas Lite", urgency: "ADEQUATE", action: "Monitor" }
    ],
    quickReport: [
        { product: "Velo-Speed Pro X", status: "CRITICAL", currentStock: 420, growth: "+12.4%", trend: "High" },
        { product: "Quantum Core Watch", status: "2 DAYS LEFT", currentStock: 128, growth: "+8.2%", trend: "Medium" },
        { product: "Echelon NC-400", status: "REORDER SOON", currentStock: 310, growth: "+5.1%", trend: "Low" },
        { product: "Urban Canvas Lite", status: "ADEQUATE", currentStock: 850, growth: "+2.3%", trend: "Stable" }
    ]
};

let salesAnalytics = {
    grossRevenue: 2842900,
    grossRevenueGrowth: 12.4,
    avgOrderValue: 142.50,
    avgOrderValueChange: -2.1,
    conversionRate: 4.82,
    conversionRateChange: 0.6,
    omnichannelMetric: 89,
    categorySales: {
        labels: ['JUN 01', 'JUN 07', 'JUN 14', 'JUN 21', 'JUN 28'],
        series: {
            Apparel: [12500, 13200, 14100, 13800, 15200],
            Electronics: [18400, 19200, 20500, 21800, 23400],
            Home: [8900, 9200, 9700, 10100, 10800]
        }
    },
    channelSplit: { onlineMarketplace: 64, physicalRetail: 36 },
    keyInsight: "Online sales have grown by 18% since loyalty program integration.",
    regionalData: { northAmerica: 1200, europe: 940, asiaPacific: 702 },
    topProducts: [
        { id: "99402-B", name: "A1 Precision Tech", category: "ELECTRONICS", unitsSold: 2840, revenue: 568000, status: "Best Seller" },
        { id: "88310-C", name: "E4 Omni-Noise Headphones", category: "ELECTRONICS", unitsSold: 3420, revenue: 478800, status: "Trending" },
        { id: "44219-A", name: "H7 Nordic Lounge Chair", category: "HOME", unitsSold: 1450, revenue: 290000, status: "Stable" }
    ]
};

let channelPerformance = {
    omniChannelGrowth: 18.4,
    omniChannelGrowthChange: 2.1,
    totalConvRate: 4.82,
    totalConvRateChange: -0.4,
    avgCac: 12.40,
    avgCacChange: -5.2,
    activeChannels: 12,
    channelHealthIndex: {
        ownedWeb: { velocity: 78, retention: 65, growth: 82, margin: 71, reach: 88 },
        marketplaces: { velocity: 54, retention: 42, growth: 67, margin: 49, reach: 91 }
    },
    comparativePerformance: [
        { channel: "Web Store (Direct)", conversionRate: 5.2, aov: 142 },
        { channel: "Physical Retail", conversionRate: 12.8, aov: 98 },
        { channel: "Mobile App", conversionRate: 3.1, aov: 185 },
        { channel: "3rd Party Marketplaces", conversionRate: 1.8, aov: 112 }
    ],
    customerAcquisitionCost: { webStore: 14.20, mobileApp: 22.50, physical: 8.30, marketplace: 18.90 },
    recentActivities: [
        { text: "New promotion live on Amazon Marketplace.", time: "2 mins ago", type: "Marketing" },
        { text: "Inventory sync delay: New York Flagship Store.", time: "15 mins ago", type: "Logistics" },
        { text: "Mobile App conversion peak detected in EMEA.", time: "42 mins ago", type: "Sales" },
        { text: "Web Store cache cleared successfully.", time: "1 hour ago", type: "System" }
    ],
    channelDrilldown: [
        { name: "Shopify Direct", revenueShare: 42.5, refundRate: 1.2, customerLtv: 4820, status: "OPTIMAL" },
        { name: "Brick & Mortar", revenueShare: 28.1, refundRate: 0.8, customerLtv: 2140, status: "STEADY" },
        { name: "Mobile App (iOS)", revenueShare: 18.4, refundRate: 4.5, customerLtv: 6900, status: "REVIEW REQUIRED" }
    ]
};

let predictiveForecasting = {
    nextMonthSalesPrediction: 728,
    predictionLowerBound: 685,
    predictionUpperBound: 779,
    promotionLiftEstimate: 18.5,
    whatIfDiscountImpact: 0,
    recommendedReorderSkus: [
        { sku: "VELO-X1", name: "Velocity X1", currentStock: 42, predictedOutOfStockDays: 8 },
        { sku: "CHRONOS-4", name: "Chronos Series 4", currentStock: 18, predictedOutOfStockDays: 3 },
        { sku: "AURA-TUMBLER", name: "Aura Glass Tumbler", currentStock: 84, predictedOutOfStockDays: 12 }
    ]
};

let customerInsights = {
    customerLtv: 1240,
    repeatPurchaseRate: 68.4,
    churnRisk: "Low",
    avgDaysBetweenPurchases: 42,
    customerSegments: [
        { name: "Brand Loyalists", percentage: 32, clv: 2450 },
        { name: "High Spenders", percentage: 18, clv: 3800 },
        { name: "Bargain Hunters", percentage: 28, clv: 620 },
        { name: "At-Risk", percentage: 12, clv: 340 },
        { name: "New Customers", percentage: 10, clv: 180 }
    ],
    atRiskCustomers: [
        { id: "C10042", name: "Sarah Johnson", lastPurchase: "2025-03-10", totalSpent: 890 },
        { id: "C10221", name: "Michael Chen", lastPurchase: "2025-02-28", totalSpent: 1240 },
        { id: "C10893", name: "Emma Davis", lastPurchase: "2025-03-05", totalSpent: 560 }
    ]
};

// Helper functions (randomizers) remain the same
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
    let salesSum = currentSalesData.reduce((a, b) => a + b, 0);
    if (salesSum < 3800 || salesSum > 4800) {
        let targetSum = baselineSales.reduce((a, b) => a + b, 0);
        let scale = targetSum / salesSum;
        currentSalesData = currentSalesData.map(v => Math.round(v * scale));
        currentForecastData = currentForecastData.map(v => Math.round(v * scale));
    }
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
    // update demand forecast (optional)
    inventoryOptimization.demandForecast.historical = inventoryOptimization.demandForecast.historical.map(v => Math.round(v * (0.92 + Math.random() * 0.16)));
    inventoryOptimization.demandForecast.predictive = inventoryOptimization.demandForecast.predictive.map(v => Math.round(v * (0.88 + Math.random() * 0.24)));
    // update recommendations and quickReport randomly
    inventoryOptimization.recommendations = inventoryOptimization.recommendations.map(rec => {
        if (Math.random() > 0.6) {
            const urgencies = ["CRITICAL", "2 DAYS LEFT", "REORDER SOON", "ADEQUATE"];
            rec.urgency = urgencies[Math.floor(Math.random() * urgencies.length)];
        }
        return rec;
    });
    inventoryOptimization.quickReport = inventoryOptimization.quickReport.map(item => ({
        ...item,
        currentStock: Math.floor(100 + Math.random() * 900),
        growth: `+${(Math.random() * 15).toFixed(1)}%`,
        trend: ["High", "Medium", "Low", "Stable"][Math.floor(Math.random() * 4)]
    }));
}

function randomizeSales() {
    salesAnalytics.grossRevenue = Math.floor(2500000 + Math.random() * 700000);
    salesAnalytics.grossRevenueGrowth = parseFloat((8 + Math.random() * 12).toFixed(1));
    salesAnalytics.avgOrderValue = parseFloat((120 + Math.random() * 50).toFixed(2));
    salesAnalytics.conversionRate = parseFloat((3.5 + Math.random() * 2.5).toFixed(2));
    let newOnline = 55 + Math.random() * 30;
    salesAnalytics.channelSplit = { onlineMarketplace: parseFloat(newOnline.toFixed(1)), physicalRetail: parseFloat((100 - newOnline).toFixed(1)) };
    salesAnalytics.regionalData = {
        northAmerica: parseFloat((900 + Math.random() * 600).toFixed(0)),
        europe: parseFloat((700 + Math.random() * 400).toFixed(0)),
        asiaPacific: parseFloat((500 + Math.random() * 400).toFixed(0))
    };
    salesAnalytics.topProducts = salesAnalytics.topProducts.map(p => ({
        ...p,
        unitsSold: Math.floor(500 + Math.random() * 4000),
        revenue: Math.floor(50000 + Math.random() * 600000),
        status: ["Best Seller", "Trending", "Stable", "High Demand"][Math.floor(Math.random() * 4)]
    }));
    // update category sales
    for (let cat in salesAnalytics.categorySales.series) {
        salesAnalytics.categorySales.series[cat] = salesAnalytics.categorySales.series[cat].map(v => Math.round(v * (0.95 + Math.random() * 0.1)));
    }
}

function randomizeChannel() {
    channelPerformance.omniChannelGrowth = parseFloat((12 + Math.random() * 10).toFixed(1));
    channelPerformance.totalConvRate = parseFloat((3.5 + Math.random() * 2).toFixed(2));
    channelPerformance.avgCac = parseFloat((8 + Math.random() * 8).toFixed(2));
    channelPerformance.activeChannels = 10 + Math.floor(Math.random() * 5);
    channelPerformance.comparativePerformance = channelPerformance.comparativePerformance.map(c => ({
        ...c,
        conversionRate: parseFloat((c.conversionRate * (0.85 + Math.random() * 0.3)).toFixed(1)),
        aov: Math.round(c.aov * (0.9 + Math.random() * 0.2))
    }));
    channelPerformance.recentActivities = [
        { text: "New promotion live on Amazon Marketplace.", time: `${Math.floor(Math.random() * 60)} mins ago`, type: "Marketing" },
        { text: "Inventory sync delay: New York Flagship Store.", time: `${Math.floor(Math.random() * 30)} mins ago`, type: "Logistics" },
        { text: "Mobile App conversion peak detected in EMEA.", time: `${Math.floor(Math.random() * 120)} mins ago`, type: "Sales" },
        { text: "Web Store cache cleared successfully.", time: `${Math.floor(Math.random() * 24)} hours ago`, type: "System" }
    ];
    channelPerformance.channelDrilldown = channelPerformance.channelDrilldown.map(c => ({
        ...c,
        revenueShare: parseFloat((c.revenueShare * (0.9 + Math.random() * 0.2)).toFixed(1)),
        refundRate: parseFloat((c.refundRate * (0.8 + Math.random() * 0.6)).toFixed(1)),
        customerLtv: Math.round(c.customerLtv * (0.85 + Math.random() * 0.3)),
        status: ["OPTIMAL", "STEADY", "REVIEW REQUIRED", "ATTENTION"][Math.floor(Math.random() * 4)]
    }));
}

function randomizePredictive() {
    const basePred = 700 + Math.random() * 100;
    predictiveForecasting.nextMonthSalesPrediction = Math.round(basePred);
    predictiveForecasting.predictionLowerBound = Math.round(basePred * (0.92 + Math.random() * 0.04));
    predictiveForecasting.predictionUpperBound = Math.round(basePred * (1.04 + Math.random() * 0.06));
    predictiveForecasting.promotionLiftEstimate = parseFloat((12 + Math.random() * 15).toFixed(1));
    predictiveForecasting.recommendedReorderSkus = predictiveForecasting.recommendedReorderSkus.map(sku => ({
        ...sku,
        currentStock: Math.floor(10 + Math.random() * 150),
        predictedOutOfStockDays: Math.floor(2 + Math.random() * 20)
    }));
    predictiveForecasting.whatIfDiscountImpact = 0;
}

function randomizeCustomer() {
    customerInsights.customerLtv = Math.floor(800 + Math.random() * 1200);
    customerInsights.repeatPurchaseRate = parseFloat((50 + Math.random() * 35).toFixed(1));
    const risks = ["Low", "Medium", "High"];
    customerInsights.churnRisk = risks[Math.floor(Math.random() * risks.length)];
    customerInsights.customerSegments = customerInsights.customerSegments.map(seg => ({
        ...seg,
        percentage: Math.floor(5 + Math.random() * 30),
        clv: Math.floor(150 + Math.random() * 3500)
    }));
    let totalPct = customerInsights.customerSegments.reduce((s, seg) => s + seg.percentage, 0);
    customerInsights.customerSegments = customerInsights.customerSegments.map(seg => ({...seg, percentage: Math.round(seg.percentage / totalPct * 100) }));
    customerInsights.avgDaysBetweenPurchases = Math.floor(20 + Math.random() * 40);
    customerInsights.atRiskCustomers = customerInsights.atRiskCustomers.map(c => ({
        ...c,
        lastPurchase: `2025-0${Math.floor(1 + Math.random() * 3)}-${Math.floor(10 + Math.random() * 20)}`,
        totalSpent: Math.floor(200 + Math.random() * 2000)
    }));
}

// Exports
export function randomizeDashboard() {
    randomizeSalesForecast();
    randomizeChannelShares();
    if (Math.random() > 0.7) {
        dynamicAlerts.push({ id: Date.now(), product: "⚠️ LIMITED EDITION RESTOCK", location: "Central Fulfillment", urgency: "HIGH DEMAND", stock: null });
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