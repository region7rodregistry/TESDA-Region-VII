# Analytics Setup Guide

This guide will help you set up the comprehensive analytics tracking system for your TESDA Region VII application.

## Overview

The analytics system tracks:
- **Page Views**: Every page visit with timestamp and metadata
- **CTA Button Clicks**: All call-to-action button clicks across the site
- **Contact Form Interactions**: Form views, field focuses, and submissions

## Setup Instructions

### 1. Create Supabase Tables

1. Open your Supabase project dashboard at https://supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `schema-analytics.sql` file
5. Click **Run** to execute the SQL commands

This will create three tables:
- `page_views` - Tracks all page visits
- `cta_clicks` - Tracks CTA button clicks
- `contact_interactions` - Tracks contact form interactions

### 2. Verify Tables Were Created

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the three new tables listed:
   - page_views
   - cta_clicks
   - contact_interactions

### 3. Test the Analytics

1. Visit your website homepage
2. Click on the CTA buttons in the hero section
3. Navigate to different pages (About, Training Centers)
4. Visit the Contact section and interact with the form fields
5. Submit a test contact form

### 4. View Analytics Data

1. Log in to your admin panel at `/admin`
2. Click on **Analytics** in the sidebar
3. You should see:
   - Summary cards with total counts
   - 7-day activity trend chart
   - Top pages by views
   - CTA button performance
   - Contact form interaction breakdown

### 5. Refresh Data

Click the **Refresh** button in the analytics dashboard to get the latest data.

## What Gets Tracked

### Page Views
- **Home Page** (`/`)
- **About Page** (`/about`)
- **Training Centers** (`/training-centers`)
- **Admin Dashboard** (not tracked by default)

Each page view records:
- Page path
- Page name
- Timestamp
- User agent (browser info)
- Referrer (where they came from)

### CTA Button Clicks
- **Hero "Learn More" Button**
- **Hero "View Programs" Button**

Each click records:
- Button text
- Button link
- Page where clicked
- Timestamp
- User agent

### Contact Form Interactions
- **Form View**: When the contact section is displayed
- **Field Focus**: When a user clicks into a form field (name, email, message)
- **Form Submit**: When the contact form is submitted (success or failure)

Each interaction records:
- Interaction type
- Field name (for focus events)
- Success status (for submissions)
- Timestamp
- User agent

## Analytics Dashboard Features

### Summary Cards
- **Total Page Views**: Lifetime page views with last 24h count
- **CTA Clicks**: Total button clicks with last 24h count
- **Contact Submissions**: Total successful form submissions
- **Engagement Rate**: Percentage of views that resulted in clicks or submissions

### 7-Day Activity Trend
Visual chart showing:
- Daily page views (blue)
- Daily CTA clicks (green)
- Daily contact submissions (purple)

### Top Pages
List of most viewed pages with:
- Page name
- Page path
- View count

### CTA Button Performance
Ranking of CTA buttons by:
- Button text
- Target link
- Click count

### Contact Form Interactions
Breakdown of:
- Form views
- Field focuses
- Form submissions

## Data Privacy & Security

- **Row Level Security (RLS)**: Enabled on all tables
- **Insert Policy**: Anyone can insert (for anonymous tracking)
- **Select Policy**: Only authenticated admin users can view data
- **No PII Stored**: We don't store IP addresses or personally identifiable information
- **User Agent Only**: Only browser information is stored for analytics

## Troubleshooting

### No Data Showing Up

1. **Check Supabase Connection**
   - Verify `NEXT_PUBLIC_SUPABASE_URL` is set in your `.env.local`
   - Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in your `.env.local`

2. **Check Browser Console**
   - Open browser developer tools (F12)
   - Look for any error messages related to Supabase

3. **Verify Tables Exist**
   - Go to Supabase dashboard → Table Editor
   - Confirm the three tables are created

4. **Check RLS Policies**
   - Go to Supabase dashboard → Authentication → Policies
   - Verify policies exist for all three tables

### Analytics Dashboard Shows Errors

1. **Check Admin Authentication**
   - Make sure you're logged in to the admin panel
   - Try logging out and back in

2. **Check Browser Console**
   - Look for error messages
   - Common issue: CORS or authentication errors

### Tracking Not Working on Specific Pages

1. **Verify Import**
   - Check that the page imports `trackPageView` from `@/lib/analytics`
   - Verify `useEffect` hook is calling the tracking function

2. **Check Page Component**
   - Ensure the page is a client component (`"use client"` directive)

## Advanced Usage

### Adding Tracking to New Pages

```typescript
"use client"
import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export default function MyNewPage() {
  useEffect(() => {
    trackPageView("/my-new-page", "My New Page Title")
  }, [])
  
  return <div>Your page content</div>
}
```

### Adding Tracking to New CTA Buttons

```typescript
import { trackCTAClick } from "@/lib/analytics"

<Link 
  href="/destination"
  onClick={() => trackCTAClick("Button Text", "/destination", window.location.pathname)}
>
  <Button>Click Me</Button>
</Link>
```

### Custom Analytics Events

You can extend the analytics system by:
1. Adding new tables in Supabase
2. Creating new tracking functions in `lib/analytics.ts`
3. Adding corresponding components in the analytics dashboard

## Maintenance

### Data Retention

Consider setting up data retention policies:
1. Go to Supabase dashboard → Database → Functions
2. Create a cron job to delete old records (e.g., older than 90 days)

### Performance

The system is optimized for performance:
- Tracking calls are async and don't block the UI
- Failed tracking attempts are logged but don't affect user experience
- Queries use indexes for fast retrieval

### Backup

Your Supabase project automatically backs up your data. To manually export:
1. Go to Supabase dashboard → Database → Backups
2. Download a backup of your database

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase credentials
3. Ensure the SQL schema was properly executed
4. Check that RLS policies are correctly set up

## Future Enhancements

Potential features to add:
- Real-time analytics updates
- Export analytics to CSV
- Custom date range filters
- Geographic tracking (with user consent)
- Device type breakdowns
- Session tracking
- Conversion funnel analysis
- A/B testing support

---

**Last Updated**: October 29, 2025
**Version**: 1.0.0

