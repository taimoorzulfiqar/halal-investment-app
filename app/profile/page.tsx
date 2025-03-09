"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "+1 (555) 123-4567",
  age: 35,
  education: "Masters",
  professionalExperience:
    "Over 10 years of experience in technology and finance. Previously worked as a Senior Investment Analyst at XYZ Capital and as a Technology Consultant at ABC Consulting.",
  postedAds: [
    {
      id: 1,
      title: "Tech Startup Seed Round",
      status: "Active",
      views: 245,
      inquiries: 12,
      date: "2023-05-15",
    },
    {
      id: 2,
      title: "Real Estate Development Project",
      status: "Under Review",
      views: 0,
      inquiries: 0,
      date: "2023-06-01",
    },
    {
      id: 3,
      title: "E-commerce Expansion",
      status: "Draft",
      views: 0,
      inquiries: 0,
      date: "2023-06-10",
    },
  ],
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    phoneNumber: userData.phoneNumber,
    age: userData.age,
    education: userData.education,
    professionalExperience: userData.professionalExperience,
  })
  const router = useRouter()

  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call - in a real app, you would call your API
    setTimeout(() => {
      setIsLoading(false)
      // Show success message
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="ml-auto">
            <Link href="/settings">
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/40 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-muted-foreground">{userData.email}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="ads">My Ads</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and professional background</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleChange("phoneNumber", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          min="18"
                          max="100"
                          value={formData.age}
                          onChange={(e) => handleChange("age", Number.parseInt(e.target.value))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Select value={formData.education} onValueChange={(value) => handleChange("education", value)}>
                          <SelectTrigger id="education">
                            <SelectValue placeholder="Select highest education" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high-school">High School</SelectItem>
                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree</SelectItem>
                            <SelectItem value="phd">PhD or Doctorate</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="professionalExperience">Professional Experience</Label>
                      <Textarea
                        id="professionalExperience"
                        className="min-h-[120px]"
                        value={formData.professionalExperience}
                        onChange={(e) => handleChange("professionalExperience", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ads">
              <Card>
                <CardHeader>
                  <CardTitle>My Investment Ads</CardTitle>
                  <CardDescription>Manage your posted investment opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                      <div className="col-span-2">Title</div>
                      <div>Status</div>
                      <div>Views</div>
                      <div>Inquiries</div>
                      <div>Actions</div>
                    </div>
                    {userData.postedAds.map((ad) => (
                      <div key={ad.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0">
                        <div className="col-span-2 font-medium">{ad.title}</div>
                        <div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              ad.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : ad.status === "Draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {ad.status}
                          </span>
                        </div>
                        <div>{ad.views}</div>
                        <div>{ad.inquiries}</div>
                        <div>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/post-ad">New Post</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

