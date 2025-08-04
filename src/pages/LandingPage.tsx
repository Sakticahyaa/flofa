import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Leaf,
  Heart,
  Target,
  Lightbulb,
  Star,
  Globe,
} from "lucide-react";
import { useDataCount } from "../hooks/useDataCount";
import { Instagram } from "lucide-react";
import heroImage from "../assets/img/hero_flofa.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { animalCount, plantCount, loading: dataCountLoading } = useDataCount();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const FloatingIcon = ({
    icon: Icon,
    className,
    delay = 0,
  }: {
    icon: React.ElementType;
    className: string;
    delay?: number;
  }) => (
    <div
      className={`absolute ${className} opacity-20`}
      style={{
        transform: `translateY(${Math.sin(Date.now() * 0.001 + delay) * 10}px)`,
        animation: `float 6s ease-in-out infinite ${delay}s`,
      }}
    >
      <Icon className="w-12 h-12 text-green-600" />
    </div>
  );

  const handleAnimalData = () => {
    navigate("/hewan");
  };

  const handlePlantData = () => {
    navigate("/tanaman");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-400" />
              <span className="text-white font-bold text-xl">Flofa</span>
            </div>
            <div className="text-sm md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-green-400 transition-colors"
              >
                Tentang Flofa
              </button>
              <button
                onClick={() => scrollToSection("data")}
                className="text-white hover:text-green-400 transition-colors"
              >
                Lihat Data
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img 
            src={heroImage}
            alt="Hero background" 
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log('Image failed to load:', e);
              // Fallback to a placeholder
              e.currentTarget.src = 'https://via.placeholder.com/1920x1080/22c55e/ffffff?text=Flofa+Hero';
            }}
            onLoad={() => console.log('Hero image loaded successfully!')}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-30"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${
                mousePosition.y * 0.02
              }px)`,
            }} 
          ></div>
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-green-300 rounded-full opacity-40"
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${
                mousePosition.y * -0.01
              }px)`,
            }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-12 h-12 bg-green-400 rounded-full opacity-50"
            style={{
              transform: `translate(${mousePosition.x * 0.015}px, ${
                mousePosition.y * 0.015
              }px)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Platform Pendataan Penyakit Hewan dan Tanaman di Bugel, Salatiga
          </h1>
        </div>

        <div className="absolute bottom-8 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm mb-2 font-medium">
              Geser untuk melihat lebih
            </span>
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-16 md:py-20 bg-green-400 text-white overflow-hidden"
      >
        <FloatingIcon icon={Leaf} className="top-10 left-10" delay={0} />
        <FloatingIcon icon={Heart} className="top-20 right-20" delay={1} />
        <FloatingIcon icon={Target} className="bottom-20 left-20" delay={2} />
        <FloatingIcon icon={Star} className="bottom-10 right-10" delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Apa itu Flofa?
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-base md:text-lg leading-relaxed opacity-90">
                Flofa adalah platform pendataan penyakit pada hewan dan tanaman
                di Kelurahan Bugel, Kecamatan Sidorejo, Kota Salatiga. Selain
                pendataan penyakit, Flofa juga memberikan informasi lain seperti
                gejala dan cara penanganannya. Flofa membantu digitalisasi
                proses pendataan dengan mudah dan cepat. Selain sebagai
                pendataan, Flofa juga berperan sebagai pemantauan kondisi hewan
                dan tanaman di Kelurahan Bugel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        id="data"
        className="relative py-16 md:py-20 bg-gray-100 overflow-hidden"
      >
        <FloatingIcon icon={Lightbulb} className="top-16 left-16" delay={0.5} />
        <FloatingIcon icon={Globe} className="top-32 right-16" delay={1.5} />
        <FloatingIcon icon={Star} className="bottom-16 left-32" delay={2.5} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Statistik
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div
                className="bg-green-600 text-white p-8 rounded-2xl shadow-xl cursor-pointer hover:bg-green-700 transition-all duration-300 hover:scale-105"
                onClick={handlePlantData}
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {dataCountLoading ? (
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto"></div>
                  ) : (
                    plantCount
                  )}
                </div>
                <p className="text-lg font-medium mb-4">Tanaman terdata</p>
                <p className="text-sm opacity-90">Klik untuk lihat data</p>
              </div>

              <div
                className="bg-green-600 text-white p-8 rounded-2xl shadow-xl cursor-pointer hover:bg-green-700 transition-all duration-300 hover:scale-105"
                onClick={handleAnimalData}
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {dataCountLoading ? (
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto"></div>
                  ) : (
                    animalCount
                  )}
                </div>
                <p className="text-lg font-medium mb-4">Hewan terdata</p>
                <p className="text-sm opacity-90">Klik untuk lihat data</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-amber-100 to-orange-100 border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-10">
                  <Leaf className="w-8 h-8 text-green-400" />
                   <span className="ml-2 text-black font-bold text-xl">Flofa</span>
                </div>
              </div>
              <p className="text-amber-700 leading-relaxed">
                Flofa adalah platform pendataan penyakit pada hewan dan tanaman
                di Kelurahan Bugel, Kecamatan Sidorejo, Kota Salatiga. Selain
                pendataan penyakit, Flofa juga memberikan informasi lain seperti
                gejala dan cara penanganannya. Flofa membantu digitalisasi
                proses pendataan dengan mudah dan cepat. Selain sebagai
                pendataan, Flofa juga berperan sebagai pemantauan kondisi hewan
                dan tanaman di Kelurahan Bugel.
              </p>
            </div>

            {/* Social Media */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-A1-Forest mb-4">
                Ikuti Kami
              </h3>
              <a
                href="https://www.instagram.com/kknsadakkinang/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>@kknsadakkinang</span>
              </a>
            </div>

            {/* Empty column for spacing on larger screens */}
            <div className="lg:col-span-1"></div>
          </div>

          {/* Bottom Credits */}
          <div className="border-t border-amber-200 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-amber-700 text-sm">
                © 2025 KKN Sadak Kinang. All rights reserved.
              </p>
              <p className="text-amber-700 text-sm">
                KKN-PPM UGM Sidorejo Salatiga
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}