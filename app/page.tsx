'use client'

import { useState } from 'react'
import { Search, Star, MapPin, Clock, Shield, Users, ArrowRight, Sparkles, TrendingUp, Award } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { SERVICE_CATEGORIES, CATEGORY_COLORS } from '@/lib/constants'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const featuredProviders = [
    {
      name: 'Sarah Johnson',
      service: 'Professional House Cleaning',
      category: 'trade-skilled',
      rating: 4.9,
      reviews: 127,
      price: '$25/hr',
      location: 'Downtown',
      image: '👩‍💼',
      badge: 'Top Rated',
      specialties: ['Deep Cleaning', 'Eco-Friendly', 'Same Day']
    },
    {
      name: 'Mike Chen',
      service: 'Advanced Math Tutoring',
      category: 'teaching-coaching',
      rating: 4.8,
      reviews: 89,
      price: '$35/hr',
      location: 'University Area',
      image: '👨‍🏫',
      badge: 'Expert',
      specialties: ['SAT Prep', 'Calculus', 'Statistics']
    },
    {
      name: 'Emma Davis',
      service: 'Creative Graphic Design',
      category: 'creative-artisanal',
      rating: 5.0,
      reviews: 45,
      price: '$50/hr',
      location: 'Creative District',
      image: '👩‍🎨',
      badge: 'Rising Star',
      specialties: ['Logo Design', 'Branding', 'Social Media']
    },
    {
      name: 'Alex Rivera',
      service: 'Full-Stack Development',
      category: 'digital-online',
      rating: 4.9,
      reviews: 203,
      price: '$75/hr',
      location: 'Tech Hub',
      image: '👨‍💻',
      badge: 'Verified Pro',
      specialties: ['React', 'Node.js', 'Mobile Apps']
    },
    {
      name: 'Lisa Wang',
      service: 'Personal Fitness Training',
      category: 'personal-care',
      rating: 4.8,
      reviews: 156,
      price: '$45/hr',
      location: 'Fitness District',
      image: '👩‍⚕️',
      badge: 'Certified',
      specialties: ['Weight Loss', 'Strength Training', 'Nutrition']
    },
    {
      name: 'David Kumar',
      service: 'Wedding Photography',
      category: 'events-hospitality',
      rating: 5.0,
      reviews: 78,
      price: '$200/event',
      location: 'Wedding District',
      image: '📸',
      badge: 'Premium',
      specialties: ['Destination', 'Portrait', 'Candid']
    }
  ]

  const stats = [
    { label: 'Active Providers', value: '50K+', icon: Users, color: 'text-blue-600' },
    { label: 'Services Completed', value: '2M+', icon: Award, color: 'text-green-600' },
    { label: 'Happy Customers', value: '500K+', icon: Star, color: 'text-yellow-600' },
    { label: 'Cities Covered', value: '100+', icon: MapPin, color: 'text-purple-600' }
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="floating-animation inline-block mb-6">
              <Sparkles className="h-16 w-16 mx-auto text-yellow-300" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Find Amazing
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Service Providers
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
              From digital services to home repairs, tutoring to creative arts - 
              discover trusted professionals for every need! 🚀
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto mb-12 animate-bounce-in">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-white/70" />
                    <input
                      type="text"
                      placeholder="What service do you need?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-white/70" />
                    <input
                      type="text"
                      placeholder="Your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl">
                    <Search className="h-5 w-5 mr-2" />
                    Find Services ✨
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories - Vibrant Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Explore Amazing Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From digital wizardry to hands-on expertise - find the perfect professional for any project! 🎯
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SERVICE_CATEGORIES.map((category, index) => {
              const colors = CATEGORY_COLORS[category.id as keyof typeof CATEGORY_COLORS]
              return (
                <div 
                  key={category.id} 
                  className="category-card group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`card-vibrant ${colors?.bg} border-2 border-transparent hover:border-white group-hover:shadow-xl`}>
                    <div className={`text-5xl mb-4 text-center floating-animation`} style={{animationDelay: `${index * 0.2}s`}}>
                      {category.icon}
                    </div>
                    <h3 className={`font-bold text-center mb-2 ${colors?.text} text-lg`}>
                      {category.name}
                    </h3>
                    <p className="text-center text-gray-600 text-sm mb-3">
                      {category.subcategories.length} services
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                        <span 
                          key={sub.id} 
                          className={`service-badge ${colors?.bg} ${colors?.text} text-xs`}
                        >
                          {sub.name.length > 15 ? sub.name.substring(0, 15) + '...' : sub.name}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className={`service-badge ${colors?.bg} ${colors?.text} text-xs font-bold`}>
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Providers - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Top-Rated Providers</span>
              </h2>
              <p className="text-xl text-gray-600">Meet our amazing professionals who deliver excellence! ⭐</p>
            </div>
            <Button className="btn-vibrant hidden md:flex items-center">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider, index) => {
              const categoryColors = CATEGORY_COLORS[provider.category as keyof typeof CATEGORY_COLORS]
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 overflow-hidden">
                  <div className="relative">
                    <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-white text-xs font-bold ${categoryColors?.accent}`}>
                      {provider.badge}
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <div className="text-6xl mr-4 floating-animation">{provider.image}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h3>
                        <p className="text-gray-600 font-medium">{provider.service}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(provider.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-bold text-gray-900">{provider.rating}</span>
                        <span className="ml-1 text-gray-500">({provider.reviews})</span>
                      </div>
                      <div className="text-2xl font-bold text-primary-600">{provider.price}</div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{provider.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {provider.specialties.map((specialty, i) => (
                        <span 
                          key={i} 
                          className={`service-badge ${categoryColors?.bg} ${categoryColors?.text}`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                      <Button className="flex-1 btn-vibrant">
                        Book Now ⚡
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0 11.046-8.954 20-20 20v20h40V20H20z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-yellow-300">ServiceConnect?</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Built for trust, convenience, and amazing experiences! 🌟
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-12 w-12 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">🛡️ Verified Providers</h3>
              <p className="text-blue-100 text-lg">All service providers are background-checked and verified for your safety and peace of mind.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-12 w-12 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">⚡ Instant Booking</h3>
              <p className="text-blue-100 text-lg">Book services instantly or schedule for later. Quick, easy, and super convenient!</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-12 w-12 text-pink-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">💯 Quality Guaranteed</h3>
              <p className="text-blue-100 text-lg">100% satisfaction guarantee with our quality assurance program and excellent support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Vibrant */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M30 30c0-16.569-13.431-30-30-30v60h60V30H30z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="floating-animation inline-block mb-6">
            <Sparkles className="h-16 w-16 text-yellow-300" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Get Started? 🚀
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-pink-100 max-w-3xl mx-auto">
            Join thousands of happy customers and amazing providers in our vibrant marketplace!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg">
              🔍 Find Services
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-lg">
              💼 Become a Provider
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}