import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Meta from '@/components/Meta'

export default function PageHOC({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page">
        <Header />
        <main className="mt-[55px]">{children}</main>
        <Footer />
      </div>
    </>
  )
}
