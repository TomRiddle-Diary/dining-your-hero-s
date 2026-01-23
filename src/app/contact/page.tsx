import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Access from '@/components/Access';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FFF7E3]">
      <Header />
      <ContactForm />
      <Access />
      <Footer />
    </div>
  );
}
