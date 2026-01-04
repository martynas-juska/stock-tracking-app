'use client'
import { useEffect } from 'react'

import TradingViewWidget from "@/components/ui/TradingViewWidget"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { 
    HEATMAP_WIDGET_CONFIG, 
    MARKET_DATA_WIDGET_CONFIG, 
    MARKET_OVERVIEW_WIDGET_CONFIG, 
    TOP_STORIES_WIDGET_CONFIG,
    TICKER_TAPE_WIDGET_CONFIG,
    STOCK_MARKET_WIDGET_CONFIG,
    ECONOMIC_CALENDAR_WIDGET_CONFIG
} from "@/lib/constants"

const Home = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`
  
  const section1Ref = useScrollAnimation()
  const section2Ref = useScrollAnimation()
  const ctaRef = useScrollAnimation()
  const section3Ref = useScrollAnimation()
  const economicCalendarRef = useScrollAnimation()
  const tickerRef = useScrollAnimation()
  const cta2Ref = useScrollAnimation()

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => console.log('Session:', data))
  }, [])
  
  return (
    <div className="container">
      <div className="flex min-h-screen home-wrapper">
        {/* SECTION 1: Market Overview + Heatmap */}
        <section ref={section1Ref} className="grid w-full gap-8 home-section mb-16">
            <div className="md:col-span-1 xl:col-span-1">
                <TradingViewWidget 
                    title="Market Overview"
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={MARKET_OVERVIEW_WIDGET_CONFIG}
                    height={600}
                    className="custom-chart"
                />
            </div>

            <div className="md:col-span-1 xl:col-span-2">
                <TradingViewWidget 
                    title="Stock Heatmap"
                    scriptUrl={`${scriptUrl}stock-heatmap.js`}
                    config={HEATMAP_WIDGET_CONFIG}
                    height={600}
                    className="custom-chart"
                />
            </div>
        </section>

        {/* SECTION 2: Breaking News + Price Analysis */}
        <section ref={section2Ref} className="grid w-full gap-8 home-section mb-20">
            <div className="h-full md:col-span-1 xl:col-span-1">
                <TradingViewWidget 
                    title="Breaking News"
                    scriptUrl={`${scriptUrl}timeline.js`}
                    config={TOP_STORIES_WIDGET_CONFIG}
                    height={600}
                    className="custom-chart"
                />
            </div>

            <div className="h-full md:col-span-1 xl:col-span-2">
                <TradingViewWidget 
                    title="Price Analysis"
                    scriptUrl={`${scriptUrl}market-quotes.js`}
                    config={MARKET_DATA_WIDGET_CONFIG}
                    height={600}
                    className="custom-chart"
                />
            </div>
        </section>

        {/* CTA SECTION 1 */}
        <section ref={ctaRef} className="w-full mb-20">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl border border-gray-600 p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                    Start Building Your Watchlist
                </h2>

                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                    Track your favorite stocks, set price alerts, and stay ahead of market moves. Join thousands of investors making smarter decisions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/sign-up">
                        <button className="yellow-btn px-8 py-3 text-lg w-full sm:w-auto">
                            Get Started Free
                        </button>
                    </Link>

                    <Link href="/sign-in">
                        <button className="h-12 px-8 text-lg bg-transparent border-2 border-gray-500 text-gray-100 hover:border-yellow-500 hover:text-yellow-500 rounded-lg font-medium transition-colors w-full sm:w-auto flex items-center justify-center">
                            Sign In
                        </button>
                    </Link>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                    No credit card required • Free forever
                </p>
            </div>
        </section>
        
        {/* SECTION 3: Global Shakers Bento Grid */}
        <section ref={section3Ref} className="w-full mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-1">
                    <TradingViewWidget 
                        title="Stock Market"
                        scriptUrl={`${scriptUrl}hotlists.js`}
                        config={STOCK_MARKET_WIDGET_CONFIG}
                        height={600}
                    />
                </div>

                <div className="lg:col-span-1 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-600 p-8">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                            Global Shakers
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Track the world's most impactful market movers
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <TradingViewWidget 
                        title="Market Overview"
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={MARKET_OVERVIEW_WIDGET_CONFIG}
                        height={600}
                        className="custom-chart"
                    />
                </div>
            </div>
        </section>

        {/* ECONOMIC CALENDAR - SEPARATE SECTION */}
        <section ref={economicCalendarRef} className="w-full mb-20">
            <TradingViewWidget 
                title="Economic Calendar"
                scriptUrl={`${scriptUrl}events.js`}
                config={ECONOMIC_CALENDAR_WIDGET_CONFIG}
                height={400}
                className="custom-chart"
            />
        </section>

        {/* TICKER TAPE SECTION */}
        <section ref={tickerRef} className="w-full mb-20">
            <TradingViewWidget 
                scriptUrl={`${scriptUrl}ticker-tape.js`}
                config={TICKER_TAPE_WIDGET_CONFIG}
                height={46}
            />
        </section>

        {/* CTA SECTION 2 */}
        <section ref={cta2Ref} className="w-full mb-16">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl border border-gray-600 p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                    Ready to Take Control?
                </h2>

                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                    Join FiVector today and transform the way you track and manage your investments.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/sign-up">
                        <button className="yellow-btn px-8 py-3 text-lg w-full sm:w-auto">
                            Get Started Free
                        </button>
                    </Link>

                    <Link href="/sign-in">
                        <button className="h-12 px-8 text-lg bg-transparent border-2 border-gray-500 text-gray-100 hover:border-yellow-500 hover:text-yellow-500 rounded-lg font-medium transition-colors w-full sm:w-auto flex items-center justify-center">
                            Sign In
                        </button>
                    </Link>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                    No credit card required • Free forever
                </p>
            </div>
        </section>
      </div>
    </div>
  )
}

export default Home