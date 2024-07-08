import HeroSection from '../pages/HeroSection';
import { Features } from '../pages/FeatureSection';
import { FAQ } from '../pages/FAQSection';
import { Team } from '../pages/TeamSection';
import Footer from '../pages/FooterSection';
import { ScrollToTop } from '../components/specific/ScrollToTop';
import { AnimatedSection } from '../pages/TestimonialSection';
import ContactSection from '@/pages/ContactSection';
import ContactForm from '@/components/specific/ContactForm';
import { Navbar } from '@/components/specific/Navbar';

export default async function Home() {
    return (
        <>
            <Navbar />
            <ScrollToTop />
            <HeroSection />
            <Features />
            <AnimatedSection />
            <Team />
            <FAQ />
            <ContactSection>
                <ContactForm />
            </ContactSection>
            <Footer />
        </>
    );
}
