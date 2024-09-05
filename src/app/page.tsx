import HeroSection from '../sections/HeroSection';
import { FAQ } from '../sections/FAQSection';
// import { Team } from '../sections/TeamSection';
import Footer from '../sections/FooterSection';
import { ScrollToTop } from '../components/specific/ScrollToTop';
import ContactSection from '@/sections/ContactSection';
import { Navbar } from '@/components/specific/Navbar';
import Features from '@/sections/FeatureSection';
import HowItWorkSection from '@/sections/HowItWorkSection';
import PricingPage from '@/sections/PricingSection';

export default async function Home() {
    return (
        <>
            <Navbar />
            <ScrollToTop />
            <HeroSection />
            <Features />
            <HowItWorkSection />
            {/* <Team /> */}
            <PricingPage />
            <FAQ />
            <ContactSection />
            <Footer />
        </>
    );
}
