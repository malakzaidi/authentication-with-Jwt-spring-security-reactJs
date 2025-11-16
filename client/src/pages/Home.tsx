import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, Lock, Shield, Zap } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">JWT Auth</h1>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Button onClick={() => setLocation("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setLocation("/login")}
                >
                  Sign In
                </Button>
                <Button onClick={() => setLocation("/register")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Secure Authentication
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            JWT-based authentication with Spring Security backend
          </p>
          {!isAuthenticated && (
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setLocation("/register")}
                className="flex items-center gap-2"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation("/login")}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure</h3>
            <p className="text-gray-600">
              JWT tokens provide secure, stateless authentication
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
            <Zap className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast</h3>
            <p className="text-gray-600">
              Lightweight token-based authentication system
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
            <Lock className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Protected</h3>
            <p className="text-gray-600">
              Protected routes ensure only authenticated users access resources
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <p className="font-medium">Sign Up</p>
              <p className="text-sm text-gray-600">Create your account</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-blue-600">2</span>
              </div>
              <p className="font-medium">Authenticate</p>
              <p className="text-sm text-gray-600">Receive JWT token</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-blue-600">3</span>
              </div>
              <p className="font-medium">Access</p>
              <p className="text-sm text-gray-600">Use protected resources</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-blue-600">4</span>
              </div>
              <p className="font-medium">Manage</p>
              <p className="text-sm text-gray-600">View your dashboard</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            JWT Authentication Frontend with Spring Security Backend
          </p>
        </div>
      </footer>
    </div>
  );
}
