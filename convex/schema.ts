import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  activities: defineTable({
    type: v.string(), // "message", "task", "event", "system"
    title: v.string(),
    description: v.optional(v.string()),
    agentId: v.optional(v.string()),
    channel: v.optional(v.string()),
    metadata: v.optional(v.object({
      source: v.optional(v.string()),
      importance: v.optional(v.string()),
    })),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"]),

  calendarEvents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
    type: v.string(), // "work", "personal", "meeting", "focus"
    attendees: v.optional(v.array(v.string())),
    location: v.optional(v.string()),
    recurring: v.optional(v.boolean()),
  }).index("by_startTime", ["startTime"]),

  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    category: v.string(), // "revenue", "product", "community", etc.
    priority: v.string(), // "high", "medium", "low"
    effort: v.string(), // "small", "medium", "large"
    status: v.string(), // "suggested", "approved", "in_progress", "done", "rejected"
    assignedTo: v.optional(v.string()),
    reasoning: v.optional(v.string()),
    nextAction: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]).index("by_category", ["category"]),

  contacts: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    status: v.string(), // "prospect", "contacted", "meeting", "proposal", "active"
    lastInteraction: v.optional(v.number()),
    nextAction: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  }).index("by_status", ["status"]),

  contentDrafts: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    platform: v.string(), // "twitter", "blog", "newsletter", etc.
    status: v.string(), // "draft", "review", "approved", "published"
    scheduledFor: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]).index("by_scheduledFor", ["scheduledFor"]),

  ecosystemProducts: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    status: v.string(), // "active", "development", "concept", "archived"
    health: v.string(), // "healthy", "warning", "critical"
    metrics: v.optional(v.object({
      users: v.optional(v.number()),
      revenue: v.optional(v.number()),
      growth: v.optional(v.number()),
    })),
    links: v.optional(v.object({
      website: v.optional(v.string()),
      repo: v.optional(v.string()),
      docs: v.optional(v.string()),
    })),
  }).index("by_slug", ["slug"]).index("by_status", ["status"]),
})
