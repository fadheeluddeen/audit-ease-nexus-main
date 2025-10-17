import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { ISOComplianceSection } from "@/components/ISOComplianceSection";
import { Footer } from "@/components/Footer";

const Index = ({ setSelectedFiles }: { setSelectedFiles: (files: FileList | null) => void }) => {
  return (
    <main>
      <Header />
      <HeroSection setSelectedFiles={setSelectedFiles} />
      <WhoWeAreSection />
      <ISOComplianceSection />
      <Footer />
    </main>
  );
};

export default Index;