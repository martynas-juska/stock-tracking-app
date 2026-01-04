import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className="auth-layout" >
            <section className="auth-left-section scrollbar-hide-default">

                <div className="pb-6 lg:pb-8 flex-1 mt-6">{ children }</div>
              
            </section>

            <section>
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className="auth-blockquote" >
                        FiVector turned my watchlist into a winning list. I like how stocks can be visually discovered and alert system gets me informed on time!
                    </blockquote>

                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-testimonial-author">- Matheo D.</cite>
                            <p className="max-md:text-xs text-gray-500">Private Investor</p>
                        </div>

                        <div className="flex items-center gap-0.5">
                            { [1, 2, 3, 4, 5].map((star) => (
                                <Image src="/assets/icons/star.svg" alt=" Star review" key={ star } width={ 20 } height={ 20 } className="w-5 h-5" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <Image src="/assets/images/dashboard.png" alt="Dashboard Preview" width={ 1440 } height={ 1150 } className="auth-dashboard-preview absolute top-0" />
                </div>
            </section>
        </main>
  )

}