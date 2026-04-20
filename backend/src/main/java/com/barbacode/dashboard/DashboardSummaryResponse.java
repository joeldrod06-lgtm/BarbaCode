package com.barbacode.dashboard;

public record DashboardSummaryResponse(
        double salesToday,
        int ticketsToday,
        int lowStockProducts,
        double cashBalance
) {
}
