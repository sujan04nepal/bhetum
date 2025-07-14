"use client";

import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogPage() {
  const { language } = useLanguage();

  const content = {
    ne: {
      title: "ब्लग",
      subtitle: "सेवा र प्रविधिका कुराकानी",
      featuredPost: {
        title: "नेपालमा डिजिटल सेवाको भविष्य",
        excerpt:
          "कसरी डिजिटल प्लेटफर्मले नेपालको सेवा क्षेत्रलाई परिवर्त�� गर्दैछ...",
        author: "सुजन नेपाल",
        date: "जनवरी १५, २०२४",
        category: "प्रविधि",
        image: "💻",
      },
      posts: [
        {
          title: "घर सरसफाइका ५ सुझाव",
          excerpt: "तपाईंको घर सधैं सफा राख्नका लागि यी सुझावहरू...",
          author: "सरिता शर्मा",
          date: "जनवरी १०, २०२४",
          category: "घरेलु",
          image: "🏠",
        },
        {
          title: "अनलाइन ट्यूशनको फाइदा",
          excerpt: "डिजिटल युगमा अनलाइन शिक्षाका फाइदाहरू...",
          author: "राज गुरुंग",
          date: "जनवरी ५, २०२४",
          category: "शिक्षा",
          image: "📚",
        },
        {
          title: "सेवाप्रदायक बन्ने तरिका",
          excerpt: "कसरी हाम्रो प्लेटफर्ममा सेवाप्रदायक बन्ने...",
          author: "माया तामाङ",
          date: "डिसेम्बर ३०, २०२३",
          category: "गाइड",
          image: "💼",
        },
      ],
      readMore: "थप पढ्नुहोस्",
      allPosts: "सबै पोस्ट",
      categories: "श्रेणीहरू",
    },
    en: {
      title: "Blog",
      subtitle: "Stories about services and technology",
      featuredPost: {
        title: "The Future of Digital Services in Nepal",
        excerpt:
          "How digital platforms are transforming Nepal's service sector...",
        author: "Sujan Nepal",
        date: "January 15, 2024",
        category: "Technology",
        image: "💻",
      },
      posts: [
        {
          title: "5 Home Cleaning Tips",
          excerpt: "These tips to keep your home always clean...",
          author: "Sarita Sharma",
          date: "January 10, 2024",
          category: "Home",
          image: "🏠",
        },
        {
          title: "Benefits of Online Tutoring",
          excerpt: "Advantages of digital education in the digital age...",
          author: "Raj Gurung",
          date: "January 5, 2024",
          category: "Education",
          image: "📚",
        },
        {
          title: "How to Become a Service Provider",
          excerpt: "How to become a service provider on our platform...",
          author: "Maya Tamang",
          date: "December 30, 2023",
          category: "Guide",
          image: "💼",
        },
      ],
      readMore: "Read More",
      allPosts: "All Posts",
      categories: "Categories",
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.title} 📝
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-12">
                <div className="text-8xl">
                  {currentContent.featuredPost.image}
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentContent.featuredPost.category}
                  </span>
                  <span className="ml-3 text-gray-500 text-sm">Featured</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {currentContent.featuredPost.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {currentContent.featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="h-4 w-4 mr-2" />
                    <span>{currentContent.featuredPost.author}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-2" />
                    <span>{currentContent.featuredPost.date}</span>
                  </div>
                  <Button>
                    {currentContent.readMore}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold gradient-text">
              {currentContent.allPosts}
            </h2>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option>{currentContent.categories}</option>
                <option>{language === "ne" ? "प्रविधि" : "Technology"}</option>
                <option>{language === "ne" ? "घरेलु" : "Home"}</option>
                <option>{language === "ne" ? "शिक्षा" : "Education"}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.posts.map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                  <div className="text-6xl">{post.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Tag className="h-4 w-4 text-primary-600 mr-2" />
                    <span className="text-primary-600 text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    {currentContent.readMore}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="btn-vibrant">
              {language === "ne" ? "थप लोड गर्नुहोस्" : "Load More Posts"}
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscribe */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            {language === "ne"
              ? "न्यूजलेटर सब्स्क्राइब गर्नुहोस्"
              : "Subscribe to Newsletter"}
          </h2>
          <p className="text-xl mb-8">
            {language === "ne"
              ? "नयाँ ब्लग पोस्ट र अपडेटको जानकारी पाउनुहोस्।"
              : "Get notified about new blog posts and updates."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={
                language === "ne" ? "तपाईंको इमेल ठेगाना" : "Your email address"
              }
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-yellow-400 text-blue-900 hover:bg-yellow-300">
              {language === "ne" ? "सब्स्क्राइब" : "Subscribe"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
