import TradingViewWidget from "@/components/ui/TradingViewWidget"
import WatchlistButton from "@/components/ui/WatchlistButton"
import { 
    SYMBOL_INFO_WIDGET_CONFIG,
    CANDLE_CHART_WIDGET_CONFIG,
    BASELINE_WIDGET_CONFIG,
    TECHNICAL_ANALYSIS_WIDGET_CONFIG,
    COMPANY_PROFILE_WIDGET_CONFIG,
    COMPANY_FINANCIALS_WIDGET_CONFIG
} from "@/lib/constants"

type StockDetailsProps = {
    params: Promise<{
        symbol: string
    }>
}

export default async function StockDetails({ params }: StockDetailsProps) {
    const { symbol } = await params

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">
                {symbol.toUpperCase()}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT COLUMN */}
                <div className="space-y-8">
                    <TradingViewWidget 
                        title="Stock Info"
                        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
                        config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
                        height={170}
                    />

                    <TradingViewWidget 
                        title="Candlestick Chart"
                        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                        config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
                        height={600}
                        className="custom-chart"
                    />

                    <TradingViewWidget 
                        title="Baseline Chart"
                        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                        config={BASELINE_WIDGET_CONFIG(symbol)}
                        height={600}
                        className="custom-chart"
                    />
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-8">
                    <WatchlistButton symbol={symbol} company={`${symbol} Inc.`} />

                    <TradingViewWidget 
                        title="Technical Analysis"
                        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                        config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                        height={400}
                    />

                    <TradingViewWidget 
                        title="Company Profile"
                        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
                        config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
                        height={440}
                    />

                    <TradingViewWidget 
                        title="Company Financials"
                        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
                        config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
                        height={464}
                    />
                </div>
            </div>
        </div>
    )
}