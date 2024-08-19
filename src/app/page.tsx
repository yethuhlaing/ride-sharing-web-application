import HeroSection from '../pages/HeroSection';
import { FAQ } from '../pages/FAQSection';
import { Team } from '../pages/TeamSection';
import Footer from '../pages/FooterSection';
import { ScrollToTop } from '../components/specific/ScrollToTop';
import ContactSection from '@/pages/ContactSection';
import ContactForm from '@/components/specific/ContactForm';
import { Navbar } from '@/components/specific/Navbar';
import Features from '@/pages/FeatureSection';
// import Pricing from '@/pages/Pricing';
import HowItWorkSection from '@/pages/HowItWorkSection';

export default async function Home() {
    return (
        <>
            <Navbar />
            <ScrollToTop />
            <HeroSection />
            <Features />
            <HowItWorkSection />
            {/* <Pricing /> */}
            {/* <Team /> */}
            <FAQ />
            <ContactSection>
                <ContactForm />
            </ContactSection>
            <Footer />
        </>
    );
}
