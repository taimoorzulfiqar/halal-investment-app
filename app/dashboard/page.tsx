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

// Empty array for investment opportunities
const investmentOpportunities: any[] = []

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
            <span className="text-xl font-bold">Halal Kamao</span>
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

            {/* Notification Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-muted-foreground">
                  No notifications at the moment ;)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu Dropdown */}
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
              <p className="text-muted-foreground">Browse and discover investment opportunities and businesses for sale</p>
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
                  <SelectItem value="San Francisco">Karachi</SelectItem>
                  <SelectItem value="New York">Lahore</SelectItem>
                  <SelectItem value="Austin">Islamabad</SelectItem>
                  <SelectItem value="Boston">Hyderabad</SelectItem>
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
                  <SelectItem value="Sale of Business">Sale of Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Investment Opportunities */}
          <div className="mt-6">
            {filteredOpportunities.length === 0 ? (
              <div className="flex justify-center items-center h-48">
                <p className="text-muted-foreground">No posts available</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayedOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden">
                    {/* Card content for grid view */}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {displayedOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden">
                    {/* Card content for list view */}
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