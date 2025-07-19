import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Leaf, Heart, Target, Lightbulb, Star, Globe } from 'lucide-react';
import { useDataCount } from '../hooks/useDataCount';

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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }: { icon: React.ElementType, className: string, delay?: number }) => (
    <div 
      className={`absolute ${className} opacity-20`}
      style={{
        transform: `translateY(${Math.sin(Date.now() * 0.001 + delay) * 10}px)`,
        animation: `float 6s ease-in-out infinite ${delay}s`
      }}
    >
      <Icon className="w-12 h-12 text-green-600" />
    </div>
  );

  const handleAnimalData = () => {
    navigate('/hewan');
  };

  const handlePlantData = () => {
    navigate('/tanaman');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes buttonFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .floating-button {
          animation: buttonFloat 3s ease-in-out infinite;
        }
        
        .dynamic-gradient {
          background: linear-gradient(-45deg, #16a34a, #15803d, #166534, #14532d);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        
        .ripple-effect {
          position: relative;
          overflow: hidden;
        }
        
        .ripple-effect::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .ripple-effect:hover::before {
          width: 300px;
          height: 300px;
        }
      `}</style>

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-400" />
              <span className="text-white font-bold text-xl">Flofa</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-green-400 transition-colors"
              >
                Tentang Flofa
              </button>
              <button 
                onClick={() => scrollToSection('data')}
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
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-30"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-16 h-16 bg-green-300 rounded-full opacity-40"
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-40 left-20 w-12 h-12 bg-green-400 rounded-full opacity-50"
            style={{
              transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Platform Pendataan Penyakit Hewan dan Tanaman di Bugel, Salatiga
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm mb-2 font-medium">Scroll untuk melihat lebih</span>
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 md:py-20 bg-green-400 text-white overflow-hidden">
        <FloatingIcon icon={Leaf} className="top-10 left-10" delay={0} />
        <FloatingIcon icon={Heart} className="top-20 right-20" delay={1} />
        <FloatingIcon icon={Target} className="bottom-20 left-20" delay={2} />
        <FloatingIcon icon={Star} className="bottom-10 right-10" delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Apa itu Flofa?</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-base md:text-lg leading-relaxed opacity-90">
                Flofa adalah platform pendataan penyakit pada hewan dan tanaman di 
                Kelurahan Bugel, Salatiga. Selain pendataan penyakit, Flofa juga 
                memberikan informasi lain seperti gejala dan cara penanganannya. Flofa 
                membantu digitalisasi proses pendataan dengan mudah dan cepat. Selain 
                sebagai pendataan, Flofa juga berperan sebagai pemantauan kondisi hewan 
                dan tanaman di Kelurahan Bugel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="data" className="relative py-16 md:py-20 bg-gray-100 overflow-hidden">
        <FloatingIcon icon={Lightbulb} className="top-16 left-16" delay={0.5} />
        <FloatingIcon icon={Globe} className="top-32 right-16" delay={1.5} />
        <FloatingIcon icon={Star} className="bottom-16 left-32" delay={2.5} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Statistik</h2>
            
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
    </div>
  );
}