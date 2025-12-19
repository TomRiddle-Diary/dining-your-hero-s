import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Menu from '@/components/Menu'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import Instagram from '@/components/Instagram'
import Access from '@/components/Access'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Instagram />
      <TestimonialCarousel />
      <Access />
      <Footer />
    </main>
  )
}
