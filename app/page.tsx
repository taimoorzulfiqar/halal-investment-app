"use client"

import { User } from "lucide-react"; // Import the User icon from Lucide
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Building2, Globe, HandshakeIcon, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FallbackImage } from "@/components/ui/fallback-image"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link className="flex items-center justify-center" href="/">
              <motion.span 
                className="font-bold text-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Halal Kamao
              </motion.span>
            </Link>
            <nav className="hidden md:flex gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
                  Features
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link className="text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">
                  How It Works
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link className="text-sm font-medium hover:text-primary transition-colors" href="#testimonials">
                  Testimonials
                </Link>
              </motion.div>
            </nav>
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/login">
                <Button size="sm" variant="outline">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {/* Hero Section */}
<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-muted/50 to-background">
  <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
      <motion.div 
        className="flex flex-col justify-center space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4"> {/* Adjusted space-y-2 to space-y-4 for more spacing */}
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Connect with Halal Investment Opportunities
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Discover and share investment opportunities in a secure, transparent and halal marketplace. Join our community
            of investors and entrepreneurs.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup">
              <Button size="lg" className="w-full min-[400px]:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          {/* Removed the "Explore Opportunities" button */}
          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                Explore Opportunities
              </Button>
            </Link>
          </motion.div> */}
        </div>
      </motion.div>
      <motion.div
        className="relative aspect-video overflow-hidden rounded-xl lg:order-last"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FallbackImage
          src="/images/login-image.jpg"
          alt="Investment Opportunities"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </motion.div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <motion.div 
                className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Features
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                InvestConnect provides all the tools you need to find or share investment opportunities.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Feature cards with hover effects */}
            {[
              { icon: HandshakeIcon, title: "Connect Directly", description: "Connect directly with investors or entrepreneurs without intermediaries." },
              { icon: Globe, title: "Global Reach", description: "Access investment opportunities from around the world in various industries." },
              { icon: Shield, title: "Secure Platform", description: "Our platform ensures your information is secure and transactions are transparent." },
              { icon: Building2, title: "Diverse Opportunities", description: "From tech startups to real estate, find diverse investment opportunities." },
              { icon: Users, title: "Community Driven", description: "Join a community of like-minded investors and entrepreneurs." },
              { icon: BarChart3, title: "Detailed Analytics", description: "Track the performance of your investment opportunities with detailed analytics." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-center text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <motion.div 
                className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                How It Works
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Process</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting started with InvestConnect is easy and straightforward.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { step: 1, title: "Create an Account", description: "Sign up and complete your profile with your professional background and interests." },
              { step: 2, title: "Browse Opportunities", description: "Explore investment opportunities or post your own to attract potential investors." },
              { step: 3, title: "Connect and Invest", description: "Connect with partners, discuss details, and finalize your investment partnership." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center space-y-4"
                variants={fadeInUp}
              >
                <motion.div 
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-center text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/signup">
                <Button size="lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials Section */}
<section id="testimonials" className="w-full py-12 md:py-24 bg-muted/30">
  <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <motion.div 
      className="flex flex-col items-center justify-center space-y-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="space-y-2">
        <motion.div 
          className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Testimonials
        </motion.div>
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Hear from investors and entrepreneurs who have found success on our platform.
        </p>
      </div>
    </motion.div>
    <motion.div 
      className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {[
        {
          quote: "InvestConnect helped me find the perfect investor for my tech startup. The process was smooth and transparent.",
          name: "Sarah Johnson",
          title: "CEO, TechInnovate"
        },
        {
          quote: "As an investor, I've found multiple high-quality opportunities through InvestConnect. The detailed profiles help me make informed decisions.",
          name: "Michael Chen",
          title: "Angel Investor"
        },
        {
          quote: "The platform's filtering options made it easy to find exactly the type of investment partners I was looking for.",
          name: "Olivia Martinez",
          title: "Founder, EcoLiving"
        }
      ].map((testimonial, index) => (
        <motion.div
          key={index}
          className="flex flex-col justify-between rounded-lg border p-6 shadow-sm"
          variants={fadeInUp}
          whileHover={{ y: -5 }}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">"{testimonial.quote}"</p>
          </div>
          <div className="flex items-center space-x-4 pt-4">
            {/* Replace the placeholder with an avatar icon */}
            <div className="rounded-full bg-muted p-2">
              <User className="h-6 w-6 text-primary" /> {/* Using Lucide's User icon */}
            </div>
            <div>
              <p className="text-sm font-medium">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.title}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] md:text-xl">
                Join thousands of investors and entrepreneurs on InvestConnect today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button size="lg" variant="secondary">
                    Create Account
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="secondary"
                  >
                    Log In
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 InvestConnect. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:underline">
                Terms
              </Link>
              <Link href="#" className="hover:underline">
                Privacy
              </Link>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

