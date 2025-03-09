"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Business type options
const businessTypes = [
  "Technology",
  "Real Estate",
  "Energy",
  "Retail",
  "Healthcare",
  "Hospitality",
  "Food & Beverage",
  "Manufacturing",
  "Education",
  "Finance",
  "Transportation",
  "Entertainment",
  "Agriculture",
  "Construction",
  "Other",
]

export default function PostAdPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    businessType: "",
    businessName: "",
    investmentType: "",
    contactNumber: "",
    contactEmail: "",
    description: "",
    amount: "",
    return: "",
    city: "",
  })
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call - in a real app, you would call your API
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">InvestConnect</span>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/40 p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Post Investment Opportunity</CardTitle>
              <CardDescription>Fill in the details about your investment opportunity</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" id="post-ad-form">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="E.g., Tech Startup Seeking Seed Investment"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select
                      onValueChange={(value) => handleChange("businessType", value)}
                      value={formData.businessType}
                      required
                    >
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name (Optional)</Label>
                    <Input
                      id="businessName"
                      placeholder="Your business name"
                      value={formData.businessName}
                      onChange={(e) => handleChange("businessName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="investmentType">Type of Investment *</Label>
                    <Select
                      onValueChange={(value) => handleChange("investmentType", value)}
                      value={formData.investmentType}
                      required
                    >
                      <SelectTrigger id="investmentType">
                        <SelectValue placeholder="Select investment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Silent Partner">Silent Partner</SelectItem>
                        <SelectItem value="Active Partner">Active Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City/Location *</Label>
                    <Input
                      id="city"
                      placeholder="E.g., San Francisco, CA"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Investment Amount *</Label>
                    <Input
                      id="amount"
                      placeholder="E.g., $50,000 - $250,000"
                      value={formData.amount}
                      onChange={(e) => handleChange("amount", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="return">Expected Return *</Label>
                    <Input
                      id="return"
                      placeholder="E.g., 20% equity, 12% annual return"
                      value={formData.return}
                      onChange={(e) => handleChange("return", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your investment opportunity in detail..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.contactNumber}
                      onChange={(e) => handleChange("contactNumber", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@example.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={(e) => handleSubmit(e, true)} disabled={isLoading}>
                Save as Draft
              </Button>
              <Button onClick={(e) => handleSubmit(e, false)} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit for Review"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

