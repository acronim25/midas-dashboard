import { query, mutation } from "./_generated/server"

// Activities
export const listActivities = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("activities")
      .order("desc")
      .take(args.limit || 50)
  },
})

export const createActivity = mutation({
  args: {
    type: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    agentId: v.optional(v.string()),
    channel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activities", {
      ...args,
      timestamp: Date.now(),
    })
  },
})

// Calendar Events
export const listEvents = query({
  args: { 
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("calendarEvents")
      .withIndex("by_startTime")
      .filter((q) => q.gte(q.field("startTime"), args.startTime))
      .filter((q) => q.lte(q.field("startTime"), args.endTime))
      .collect()
  },
})

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("calendarEvents", args)
  },
})

// Tasks
export const listTasks = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let query = ctx.db.query("tasks")
    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status))
    }
    return await query.order("desc").collect()
  },
})

export const createTask = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    priority: v.string(),
    effort: v.string(),
    reasoning: v.optional(v.string()),
    nextAction: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert("tasks", {
      ...args,
      status: "suggested",
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const updateTaskStatus = mutation({
  args: {
    id: v.id("tasks"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    })
  },
})

import { v } from "convex/values"
