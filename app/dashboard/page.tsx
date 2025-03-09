"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { Bell, Grid3X3, List, LogOut, Plus, Search, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FallbackImage } from "@/components/ui/fallback-image"

// Sample data for investment opportunities
const investmentOpportunities = [
  {
    id: 1,
    title: "Tech Startup Seed Round",
    description: "Early-stage investment in a promising AI-powered analytics platform.",
    amount: "$50,000 - $250,000",
    return: "20-30% equity",
    businessType: "Technology",
    investmentType: "Active Partner",
    city: "San Francisco, CA",
    postedBy: "TechVentures LLC",
    postedDate: "2 days ago",
    contactEmail: "invest@techventures.com",
    contactNumber: "+1 (555) 123-4567",
    image: "/images/stock-image.jpg",
  },
  {
    id: 2,
    title: "Real Estate Development Project",
    description: "Mixed-use development in growing urban area with strong rental demand.",
    amount: "$500,000 - $2,000,000",
    return: "12% annual return",
    businessType: "Real Estate",
    investmentType: "Silent Partner",
    city: "Austin, TX",
    postedBy: "Urban Developers Inc.",
    postedDate: "5 days ago",
    contactEmail: "projects@urbandevelopers.com",
    contactNumber: "+1 (555) 987-6543",
    image: "/images/stock-image.jpg",
  },
  {
    id: 3,
    title: "Sustainable Energy Fund",
    description: "Investment in portfolio of renewable energy projects across North America.",
    amount: "$100,000 minimum",
    return: "8-15% projected ROI",
    businessType: "Energy",
    investmentType: "Silent Partner",
    city: "Multiple Locations",
    postedBy: "GreenFuture Capital",
    postedDate: "1 week ago",
    contactEmail: "invest@greenfuture.com",
    contactNumber: "+1 (555) 456-7890",
    image: "/images/stock-image.jpg",
  },
  {
    id: 4,
    title: "E-commerce Brand Expansion",
    description: "Established e-commerce brand seeking capital for international expansion.",
    amount: "$300,000 - $750,000",
    return: "15% equity + 8% dividend",
    businessType: "Retail",
    investmentType: "Active Partner",
    city: "New York, NY",
    postedBy: "Global Retail Partners",
    postedDate: "3 days ago",
    contactEmail: "partners@globalretail.com",
    contactNumber: "+1 (555) 234-5678",
    image: "/images/stock-image.jpg",
  },
  {
    id: 5,
    title: "Healthcare Technology Platform",
    description: "Digital health platform connecting patients with specialized care providers.",
    amount: "$1,000,000 - $3,000,000",
    return: "15-25% equity",
    businessType: "Healthcare",
    investmentType: "Active Partner",
    city: "Boston, MA",
    postedBy: "MedTech Innovations",
    postedDate: "Just now",
    contactEmail: "invest@medtechinnovations.com",
    contactNumber: "+1 (555) 345-6789",
    image: "/images/stock-image.jpg",
  },
  {
    id: 6,
    title: "Boutique Hotel Acquisition",
    description: "Opportunity to invest in acquisition and renovation of boutique hotel property.",
    amount: "$2,000,000 - $5,000,000",
    return: "18% IRR projected",
    businessType: "Hospitality",
    investmentType: "Silent Partner",
    city: "Miami, FL",
    postedBy: "Luxury Hospitality Group",
    postedDate: "4 days ago",
    contactEmail: "acquisitions@luxuryhospitality.com",
    contactNumber: "+1 (555) 876-5432",
    image: "/images/stock-image.jpg",
  },
  {
    id: 7,
    title: "Organic Food Delivery Service",
    description: "Farm-to-table organic food delivery service expanding to new markets.",
    amount: "$150,000 - $500,000",
    return: "20% equity",
    businessType: "Food & Beverage",
    investmentType: "Active Partner",
    city: "Portland, OR",
    postedBy: "Green Eats Co.",
    postedDate: "1 week ago",
    contactEmail: "invest@greeneats.com",
    contactNumber: "+1 (555) 765-4321",
    image: "/images/stock-image.jpg",
  },
  {
    id: 8,
    title: "Mobile App Development Studio",
    description: "Award-winning app development studio looking for growth capital.",
    amount: "$200,000 - $800,000",
    return: "25% equity",
    businessType: "Technology",
    investmentType: "Silent Partner",
    city: "Seattle, WA",
    postedBy: "AppWorks Studio",
    postedDate: "3 days ago",
    contactEmail: "partners@appworks.com",
    contactNumber: "+1 (555) 654-3210",
    image: "/images/stock-image.jpg",
  },
]

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showAllAds, setShowAllAds] = useState(false)
  const [filters, setFilters] = useState({
    city: "",
    businessType: "",
    investmentType: "",
  })

  // Filter opportunities based on selected filters
  const filteredOpportunities = investmentOpportunities.filter((opportunity) => {
    return (
      (filters.city === "" || opportunity.city.includes(filters.city)) &&
      (filters.businessType === "" || opportunity.businessType === filters.businessType) &&
      (filters.investmentType === "" || opportunity.investmentType === filters.investmentType)
    )
  })

  // Display only 5 ads initially, or all if showAllAds is true
  const displayedOpportunities = showAllAds ? filteredOpportunities : filteredOpportunities.slice(0, 5)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
            <span className="text-xl font-bold">InvestConnect</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <form className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search opportunities..."
                className="w-64 rounded-lg bg-background pl-8 md:w-80 lg:w-96"
              />
            </form>
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/40 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Investment Opportunities</h1>
              <p className="text-muted-foreground">Browse and discover investment opportunities</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/post-ad">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </Link>
              <div className="flex items-center rounded-lg border bg-background">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="h-8 rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-3.5 w-3.5" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className="h-8 rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-3.5 w-3.5" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="cityFilter">Filter by City</Label>
              <Select onValueChange={(value) => setFilters({ ...filters, city: value })} value={filters.city}>
                <SelectTrigger id="cityFilter">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                  <SelectItem value="Boston">Boston</SelectItem>
                  <SelectItem value="Miami">Miami</SelectItem>
                  <SelectItem value="Seattle">Seattle</SelectItem>
                  <SelectItem value="Portland">Portland</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="businessTypeFilter">Business Type</Label>
              <Select
                onValueChange={(value) => setFilters({ ...filters, businessType: value })}
                value={filters.businessType}
              >
                <SelectTrigger id="businessTypeFilter">
                  <SelectValue placeholder="All Business Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Business Types</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Hospitality">Hospitality</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="investmentTypeFilter">Investment Type</Label>
              <Select
                onValueChange={(value) => setFilters({ ...filters, investmentType: value })}
                value={filters.investmentType}
              >
                <SelectTrigger id="investmentTypeFilter">
                  <SelectValue placeholder="All Investment Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Investment Types</SelectItem>
                  <SelectItem value="Active Partner">Active Partner</SelectItem>
                  <SelectItem value="Silent Partner">Silent Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Investment Opportunities */}
          <div className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayedOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <FallbackImage
                        src={opportunity.image}
                        alt={opportunity.title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {opportunity.businessType}
                        </div>
                        <div className="text-xs text-muted-foreground">{opportunity.postedDate}</div>
                      </div>
                      <CardTitle className="line-clamp-1 text-lg">{opportunity.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{opportunity.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="font-medium">Investment</div>
                          <div>{opportunity.amount}</div>
                        </div>
                        <div>
                          <div className="font-medium">Expected Return</div>
                          <div>{opportunity.return}</div>
                        </div>
                        <div>
                          <div className="font-medium">Type</div>
                          <div>{opportunity.investmentType}</div>
                        </div>
                        <div>
                          <div className="font-medium">Location</div>
                          <div>{opportunity.city}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div className="text-xs text-muted-foreground">Posted by: {opportunity.postedBy}</div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {displayedOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 w-full md:w-72 md:min-h-[300px] shrink-0">
                        <FallbackImage
                          src={opportunity.image}
                          alt={opportunity.title}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, 288px"
                          priority
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                              {opportunity.businessType}
                            </div>
                            <div className="text-xs text-muted-foreground">{opportunity.postedDate}</div>
                          </div>
                          <CardTitle>{opportunity.title}</CardTitle>
                          <CardDescription>{opportunity.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-medium">Investment</div>
                              <div>{opportunity.amount}</div>
                            </div>
                            <div>
                              <div className="font-medium">Expected Return</div>
                              <div>{opportunity.return}</div>
                            </div>
                            <div>
                              <div className="font-medium">Type</div>
                              <div>{opportunity.investmentType}</div>
                            </div>
                            <div>
                              <div className="font-medium">Location</div>
                              <div>{opportunity.city}</div>
                            </div>
                            <div>
                              <div className="font-medium">Contact</div>
                              <div>{opportunity.contactEmail}</div>
                            </div>
                            <div>
                              <div className="font-medium">Phone</div>
                              <div>{opportunity.contactNumber}</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="mt-auto p-4 pt-0">
                          <Button>View Details</Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Show more/less button */}
            {filteredOpportunities.length > 5 && (
              <div className="mt-6 flex justify-center">
                <Button variant="outline" onClick={() => setShowAllAds(!showAllAds)}>
                  {showAllAds ? "Show Less" : `Show More (${filteredOpportunities.length - 5} more)`}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

