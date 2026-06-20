export interface Connector {
  slug: string;
  name: string;
  url: string;
  aiNotes: string;
  categories: string[];
  isZapier: boolean;
  tier: 'free' | 'freemium' | 'paid';
  dead: boolean;
  lastChecked: string;
}

export const CONNECTORS: Connector[] = 
[
  {
    "slug": "gmail",
    "name": "Gmail",
    "url": "https://zapier.com/apps/gmail",
    "aiNotes": "Trigger on new email, watch inbox, send email, reply, create draft, search emails, label",
    "categories": [
      "email",
      "google",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "outlook",
    "name": "Outlook / Office 365",
    "url": "https://zapier.com/apps/microsoft-outlook",
    "aiNotes": "Send email, receive new email, watch inbox, calendar, create draft",
    "categories": [
      "email",
      "microsoft",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "sendgrid",
    "name": "SendGrid",
    "url": "https://zapier.com/apps/sendgrid",
    "aiNotes": "Send transactional email, template email, marketing campaigns",
    "categories": [
      "email",
      "marketing",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "mailgun",
    "name": "Mailgun",
    "url": "https://zapier.com/apps/mailgun",
    "aiNotes": "Send email, receive inbound email, watch bounces",
    "categories": [
      "email",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "brevo",
    "name": "Brevo (Sendinblue)",
    "url": "https://zapier.com/apps/sendinblue",
    "aiNotes": "Send email, SMS, add contact, create campaign, watch events",
    "categories": [
      "email",
      "marketing",
      "sms",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "postmark",
    "name": "Postmark",
    "url": "https://zapier.com/apps/postmark",
    "aiNotes": "Send transactional email, watch bounces and opens",
    "categories": [
      "email",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "slack",
    "name": "Slack",
    "url": "https://zapier.com/apps/slack",
    "aiNotes": "Post message to channel, DM user, watch new message, react to message, create channel",
    "categories": [
      "chat",
      "messaging",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "discord",
    "name": "Discord",
    "url": "https://zapier.com/apps/discord",
    "aiNotes": "Post message, send webhook, watch messages, DM user",
    "categories": [
      "chat",
      "messaging",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "telegram",
    "name": "Telegram",
    "url": "https://zapier.com/apps/telegram",
    "aiNotes": "Send message, watch incoming messages, send document, broadcast",
    "categories": [
      "chat",
      "messaging",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "teams",
    "name": "Microsoft Teams",
    "url": "https://zapier.com/apps/microsoft-teams",
    "aiNotes": "Post message to channel, send chat, watch messages, create meeting",
    "categories": [
      "chat",
      "messaging",
      "microsoft",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "mattermost",
    "name": "Mattermost",
    "url": "https://zapier.com/apps/mattermost",
    "aiNotes": "Post message, watch channel, create post, DM user",
    "categories": [
      "chat",
      "messaging",
      "action",
      "trigger"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "twilio-sms",
    "name": "Twilio SMS",
    "url": "https://zapier.com/apps/twilio",
    "aiNotes": "Send SMS, receive SMS, make voice call, send MMS",
    "categories": [
      "sms",
      "voice",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "pushover",
    "name": "Pushover",
    "url": "https://zapier.com/apps/pushover",
    "aiNotes": "Send push notification to mobile, set priority, sound and URL",
    "categories": [
      "messaging",
      "notification",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "google-sheets",
    "name": "Google Sheets",
    "url": "https://zapier.com/apps/google-sheets",
    "aiNotes": "Add row, update row, watch new row, create spreadsheet, lookup row, clear sheet",
    "categories": [
      "spreadsheet",
      "database",
      "google",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "airtable",
    "name": "Airtable",
    "url": "https://zapier.com/apps/airtable",
    "aiNotes": "Create record, update record, watch table, search records, delete record",
    "categories": [
      "database",
      "spreadsheet",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "notion",
    "name": "Notion",
    "url": "https://zapier.com/apps/notion",
    "aiNotes": "Create page, update database item, add row, watch database, search pages",
    "categories": [
      "database",
      "docs",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "coda",
    "name": "Coda",
    "url": "https://zapier.com/apps/coda",
    "aiNotes": "Add row to table, update row, watch table, search docs",
    "categories": [
      "database",
      "docs",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "mysql",
    "name": "MySQL",
    "url": "https://zapier.com/apps/mysql",
    "aiNotes": "Run query, insert row, update row, watch new rows",
    "categories": [
      "database",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "postgresql",
    "name": "PostgreSQL",
    "url": "https://zapier.com/apps/postgresql",
    "aiNotes": "Run query, insert row, update row, watch new rows, execute stored proc",
    "categories": [
      "database",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "firebase-firestore",
    "name": "Firebase Firestore",
    "url": "https://zapier.com/apps/firebase",
    "aiNotes": "Create document, update document, watch collection, delete document",
    "categories": [
      "database",
      "google",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "nocodb",
    "name": "NocoDB",
    "url": "https://nocodb.com",
    "aiNotes": "Create row, update row, watch table, search, delete row — open-source Airtable alternative",
    "categories": [
      "database",
      "spreadsheet",
      "action",
      "trigger"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "baserow",
    "name": "Baserow",
    "url": "https://baserow.io",
    "aiNotes": "Create row, update row, watch rows, search — open-source database UI",
    "categories": [
      "database",
      "spreadsheet",
      "action",
      "trigger"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "smartsheet",
    "name": "Smartsheet",
    "url": "https://zapier.com/apps/smartsheet",
    "aiNotes": "Add row, update row, watch sheet, attach file, send notification",
    "categories": [
      "spreadsheet",
      "project",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "openai",
    "name": "OpenAI (ChatGPT)",
    "url": "https://zapier.com/apps/openai",
    "aiNotes": "Chat completion, text generation, image generation with DALL-E, embeddings, speech to text",
    "categories": [
      "ai",
      "llm",
      "image",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "groq",
    "name": "Groq",
    "url": "https://groq.com",
    "aiNotes": "Ultra-fast inference, Llama 3 models, Mixtral, code generation, real-time applications",
    "categories": [
      "ai",
      "llm",
      "fast",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "cohere",
    "name": "Cohere",
    "url": "https://zapier.com/apps/cohere",
    "aiNotes": "Text generation, embeddings, classification, reranking, Command models",
    "categories": [
      "ai",
      "llm",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "hugging-face",
    "name": "Hugging Face",
    "url": "https://zapier.com/apps/hugging-face",
    "aiNotes": "Run any model via Inference API, image classification, text generation, embeddings",
    "categories": [
      "ai",
      "ml",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "replicate",
    "name": "Replicate",
    "url": "https://zapier.com/apps/replicate",
    "aiNotes": "Run any open-source model, image generation, video, audio, code — pay per prediction",
    "categories": [
      "ai",
      "ml",
      "image",
      "video",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "perplexity",
    "name": "Perplexity AI",
    "url": "https://www.perplexity.ai",
    "aiNotes": "Grounded web search with citations, real-time information retrieval and summarization",
    "categories": [
      "ai",
      "search",
      "action"
    ],
    "isZapier": false,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "mistral",
    "name": "Mistral AI",
    "url": "https://mistral.ai",
    "aiNotes": "Chat completion, code generation, multilingual, fast and efficient models",
    "categories": [
      "ai",
      "llm",
      "action"
    ],
    "isZapier": false,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "together-ai",
    "name": "Together AI",
    "url": "https://www.together.ai",
    "aiNotes": "Run open-source models, fine-tuning, embeddings, fast inference at low cost",
    "categories": [
      "ai",
      "llm",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "elevenlabs",
    "name": "ElevenLabs",
    "url": "https://zapier.com/apps/elevenlabs",
    "aiNotes": "Text to speech, voice cloning, dubbing, sound effects, voice generation",
    "categories": [
      "ai",
      "voice",
      "tts",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "deepgram",
    "name": "Deepgram",
    "url": "https://deepgram.com",
    "aiNotes": "Speech to text, real-time transcription, speaker diarization, language detection",
    "categories": [
      "ai",
      "voice",
      "stt",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "assemblyai",
    "name": "AssemblyAI",
    "url": "https://zapier.com/apps/assemblyai",
    "aiNotes": "Audio transcription, speaker labels, sentiment analysis, chapter detection from audio",
    "categories": [
      "ai",
      "voice",
      "stt",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "pinecone",
    "name": "Pinecone",
    "url": "https://zapier.com/apps/pinecone",
    "aiNotes": "Upsert vectors, query similarity, delete vectors, fetch by ID — managed vector database",
    "categories": [
      "vector",
      "ai",
      "database",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "weaviate",
    "name": "Weaviate",
    "url": "https://weaviate.io",
    "aiNotes": "Add objects, vector search, hybrid search, BM25 + semantic, multi-tenancy",
    "categories": [
      "vector",
      "ai",
      "database",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "qdrant",
    "name": "Qdrant",
    "url": "https://qdrant.tech",
    "aiNotes": "Upsert points, search nearest, filter + vector search, payload indexing",
    "categories": [
      "vector",
      "ai",
      "database",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "chroma",
    "name": "Chroma",
    "url": "https://www.trychroma.com",
    "aiNotes": "Add documents with embeddings, query by similarity, metadata filtering — local or hosted",
    "categories": [
      "vector",
      "ai",
      "database",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "milvus",
    "name": "Milvus / Zilliz",
    "url": "https://milvus.io",
    "aiNotes": "High-performance vector search, GPU-accelerated, distributed, billion-scale",
    "categories": [
      "vector",
      "ai",
      "database",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "github-app",
    "name": "GitHub",
    "url": "https://zapier.com/apps/github",
    "aiNotes": "New issue, new PR, push event, create issue, comment, watch repo, close issue",
    "categories": [
      "dev",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "gitlab",
    "name": "GitLab",
    "url": "https://zapier.com/apps/gitlab",
    "aiNotes": "New merge request, new issue, push event, create issue, CI pipeline trigger",
    "categories": [
      "dev",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "linear",
    "name": "Linear",
    "url": "https://zapier.com/apps/linear",
    "aiNotes": "New issue, issue updated, create issue, assign issue, watch project",
    "categories": [
      "dev",
      "project",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "jira",
    "name": "Jira",
    "url": "https://zapier.com/apps/jira",
    "aiNotes": "New issue, issue updated, create issue, assign issue, update status, log work",
    "categories": [
      "dev",
      "project",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "datadog",
    "name": "Datadog",
    "url": "https://zapier.com/apps/datadog",
    "aiNotes": "New alert, metric spike, log event, send metric, create event",
    "categories": [
      "monitoring",
      "dev",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "pagerduty",
    "name": "PagerDuty",
    "url": "https://zapier.com/apps/pagerduty",
    "aiNotes": "New incident, alert triggered, create incident, acknowledge, resolve",
    "categories": [
      "monitoring",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "vercel",
    "name": "Vercel",
    "url": "https://zapier.com/apps/vercel",
    "aiNotes": "New deployment, deployment succeeded, deployment failed, trigger deploy",
    "categories": [
      "dev",
      "hosting",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "netlify",
    "name": "Netlify",
    "url": "https://zapier.com/apps/netlify",
    "aiNotes": "New deploy, build succeeded, form submission, trigger build",
    "categories": [
      "dev",
      "hosting",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "railway",
    "name": "Railway",
    "url": "https://railway.app",
    "aiNotes": "Deploy service, watch deploy events, redeploy, environment management",
    "categories": [
      "dev",
      "hosting",
      "action"
    ],
    "isZapier": false,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "dropbox",
    "name": "Dropbox",
    "url": "https://zapier.com/apps/dropbox",
    "aiNotes": "Upload file, watch folder, download file, create folder, share link",
    "categories": [
      "storage",
      "cloud",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "google-drive",
    "name": "Google Drive",
    "url": "https://zapier.com/apps/google-drive",
    "aiNotes": "Upload file, watch folder, create folder, share file, move file, new file in folder",
    "categories": [
      "storage",
      "google",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "box",
    "name": "Box",
    "url": "https://zapier.com/apps/box",
    "aiNotes": "Upload file, watch folder, create folder, share, download, collaborate",
    "categories": [
      "storage",
      "cloud",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "aws-s3",
    "name": "AWS S3",
    "url": "https://zapier.com/apps/amazon-s3",
    "aiNotes": "Upload file, get file URL, watch bucket, create bucket, copy object",
    "categories": [
      "storage",
      "aws",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "cloudflare-r2",
    "name": "Cloudflare R2",
    "url": "https://developers.cloudflare.com/r2",
    "aiNotes": "S3-compatible object storage, no egress fees, upload and retrieve files",
    "categories": [
      "storage",
      "cloud",
      "action"
    ],
    "isZapier": false,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "twitter",
    "name": "Twitter / X",
    "url": "https://zapier.com/apps/twitter",
    "aiNotes": "Post tweet, watch mentions, watch hashtag, like, retweet, DM",
    "categories": [
      "social",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "linkedin",
    "name": "LinkedIn",
    "url": "https://zapier.com/apps/linkedin",
    "aiNotes": "Share post, watch company updates, create post, send InMail",
    "categories": [
      "social",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "facebook",
    "name": "Facebook Pages",
    "url": "https://zapier.com/apps/facebook-pages",
    "aiNotes": "New post, watch page, post to page, share link, watch comments",
    "categories": [
      "social",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "youtube",
    "name": "YouTube",
    "url": "https://zapier.com/apps/youtube",
    "aiNotes": "New video in channel, new comment, upload video, watch subscription",
    "categories": [
      "social",
      "video",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "reddit",
    "name": "Reddit",
    "url": "https://zapier.com/apps/reddit",
    "aiNotes": "New post in subreddit, new comment, watch keyword, submit post",
    "categories": [
      "social",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "bluesky",
    "name": "Bluesky",
    "url": "https://bsky.app",
    "aiNotes": "Create post, watch feed, follow user, search posts",
    "categories": [
      "social",
      "trigger",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "typeform",
    "name": "Typeform",
    "url": "https://zapier.com/apps/typeform",
    "aiNotes": "New form response, watch submission, partial response, file upload response",
    "categories": [
      "forms",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "google-forms",
    "name": "Google Forms",
    "url": "https://zapier.com/apps/google-forms",
    "aiNotes": "New form response, watch submission, export results to Sheets",
    "categories": [
      "forms",
      "google",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "jotform",
    "name": "JotForm",
    "url": "https://zapier.com/apps/jotform",
    "aiNotes": "New submission, watch form, file upload, payment form response",
    "categories": [
      "forms",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "tally",
    "name": "Tally",
    "url": "https://zapier.com/apps/tally",
    "aiNotes": "New form submission, watch responses, file uploads, payment responses",
    "categories": [
      "forms",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "fillout",
    "name": "Fillout",
    "url": "https://www.fillout.com",
    "aiNotes": "New form response, conditional logic, watch submissions, Notion/Airtable integration",
    "categories": [
      "forms",
      "trigger"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "surveymonkey",
    "name": "SurveyMonkey",
    "url": "https://zapier.com/apps/surveymonkey",
    "aiNotes": "New response, watch survey completion, export results",
    "categories": [
      "forms",
      "analytics",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "mailchimp",
    "name": "Mailchimp",
    "url": "https://zapier.com/apps/mailchimp",
    "aiNotes": "Add subscriber, send campaign, watch unsubscribe, tag contact, update member",
    "categories": [
      "email",
      "marketing",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "activecampaign",
    "name": "ActiveCampaign",
    "url": "https://zapier.com/apps/activecampaign",
    "aiNotes": "Add contact, create deal, watch automation trigger, tag contact, send email",
    "categories": [
      "email",
      "marketing",
      "crm",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "convertkit",
    "name": "ConvertKit / Kit",
    "url": "https://zapier.com/apps/convertkit",
    "aiNotes": "Add subscriber, tag subscriber, watch purchase, create form, send email",
    "categories": [
      "email",
      "marketing",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "klaviyo",
    "name": "Klaviyo",
    "url": "https://zapier.com/apps/klaviyo",
    "aiNotes": "Add profile, track event, watch flow trigger, update profile, create segment",
    "categories": [
      "email",
      "marketing",
      "ecommerce",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "beehiiv",
    "name": "Beehiiv",
    "url": "https://zapier.com/apps/beehiiv",
    "aiNotes": "Add subscriber, watch new subscriber, publish post, track opens",
    "categories": [
      "email",
      "marketing",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "apollo",
    "name": "Apollo.io",
    "url": "https://zapier.com/apps/apollo",
    "aiNotes": "Enrich contact, add to sequence, watch new contact, search leads",
    "categories": [
      "crm",
      "marketing",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "hunter",
    "name": "Hunter.io",
    "url": "https://zapier.com/apps/hunter",
    "aiNotes": "Find email address, verify email, domain search, email finder",
    "categories": [
      "marketing",
      "email",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "trello",
    "name": "Trello",
    "url": "https://zapier.com/apps/trello",
    "aiNotes": "Create card, move card, watch list, add comment, archive card",
    "categories": [
      "project",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "monday",
    "name": "Monday.com",
    "url": "https://zapier.com/apps/monday",
    "aiNotes": "Create item, update column, watch new item, move item to group, notify",
    "categories": [
      "project",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "clickup",
    "name": "ClickUp",
    "url": "https://zapier.com/apps/clickup",
    "aiNotes": "Create task, update task, watch status change, add comment, assign task",
    "categories": [
      "project",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "asana",
    "name": "Asana",
    "url": "https://zapier.com/apps/asana",
    "aiNotes": "Create task, update task, watch project, assign, mark complete, add comment",
    "categories": [
      "project",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "todoist",
    "name": "Todoist",
    "url": "https://zapier.com/apps/todoist",
    "aiNotes": "Create task, complete task, watch project, add comment, set due date",
    "categories": [
      "project",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "wrike",
    "name": "Wrike",
    "url": "https://zapier.com/apps/wrike",
    "aiNotes": "Create task, update status, watch project, assign, attach file",
    "categories": [
      "project",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "plane",
    "name": "Plane",
    "url": "https://plane.so",
    "aiNotes": "Create issue, watch project, update status — open-source Linear alternative",
    "categories": [
      "project",
      "dev",
      "trigger",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "google-analytics",
    "name": "Google Analytics 4",
    "url": "https://zapier.com/apps/google-analytics",
    "aiNotes": "Track event, watch goal conversion, send custom event, report on metrics",
    "categories": [
      "analytics",
      "google",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "mixpanel",
    "name": "Mixpanel",
    "url": "https://zapier.com/apps/mixpanel",
    "aiNotes": "Track event, update user profile, watch funnel, export data",
    "categories": [
      "analytics",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "amplitude",
    "name": "Amplitude",
    "url": "https://zapier.com/apps/amplitude",
    "aiNotes": "Track event, watch cohort, identify user, update user properties",
    "categories": [
      "analytics",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "posthog",
    "name": "PostHog",
    "url": "https://zapier.com/apps/posthog",
    "aiNotes": "Capture event, identify user, watch feature flag, create action",
    "categories": [
      "analytics",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "segment",
    "name": "Segment",
    "url": "https://zapier.com/apps/segment",
    "aiNotes": "Track event, identify user, watch source, send to destinations",
    "categories": [
      "analytics",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "plausible",
    "name": "Plausible Analytics",
    "url": "https://plausible.io",
    "aiNotes": "Privacy-friendly web analytics, watch traffic events, goal completions",
    "categories": [
      "analytics",
      "trigger"
    ],
    "isZapier": false,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "salesforce",
    "name": "Salesforce",
    "url": "https://zapier.com/apps/salesforce",
    "aiNotes": "New lead, new opportunity, update record, create contact, watch stage change",
    "categories": [
      "crm",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "hubspot",
    "name": "HubSpot",
    "url": "https://zapier.com/apps/hubspot",
    "aiNotes": "New contact, deal created, watch lifecycle stage, create deal, update contact",
    "categories": [
      "crm",
      "marketing",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "pipedrive",
    "name": "Pipedrive",
    "url": "https://zapier.com/apps/pipedrive",
    "aiNotes": "New deal, deal won, update deal, create contact, watch activity",
    "categories": [
      "crm",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "zoho-crm",
    "name": "Zoho CRM",
    "url": "https://zapier.com/apps/zoho-crm",
    "aiNotes": "New lead, new contact, update record, create task, watch stage",
    "categories": [
      "crm",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "close",
    "name": "Close",
    "url": "https://zapier.com/apps/close",
    "aiNotes": "New lead, call logged, email sent, watch status, create lead",
    "categories": [
      "crm",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "attio",
    "name": "Attio",
    "url": "https://zapier.com/apps/attio",
    "aiNotes": "New record, update attribute, watch list, create note — modern CRM",
    "categories": [
      "crm",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "shopify",
    "name": "Shopify",
    "url": "https://zapier.com/apps/shopify",
    "aiNotes": "New order, order fulfilled, new customer, abandoned cart, inventory update",
    "categories": [
      "ecommerce",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "woocommerce",
    "name": "WooCommerce",
    "url": "https://zapier.com/apps/woocommerce",
    "aiNotes": "New order, order status change, new product, create order, refund",
    "categories": [
      "ecommerce",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "stripe",
    "name": "Stripe",
    "url": "https://zapier.com/apps/stripe",
    "aiNotes": "New payment, subscription created, charge failed, create customer, send invoice",
    "categories": [
      "payment",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "paypal",
    "name": "PayPal",
    "url": "https://zapier.com/apps/paypal",
    "aiNotes": "New payment, sale completed, watch refund, create invoice, send money",
    "categories": [
      "payment",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "square",
    "name": "Square",
    "url": "https://zapier.com/apps/square",
    "aiNotes": "New payment, new order, watch customer, create invoice, manage inventory",
    "categories": [
      "payment",
      "ecommerce",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "gumroad",
    "name": "Gumroad",
    "url": "https://zapier.com/apps/gumroad",
    "aiNotes": "New sale, new subscriber, product created, watch cancellation",
    "categories": [
      "payment",
      "ecommerce",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "lemon-squeezy",
    "name": "Lemon Squeezy",
    "url": "https://zapier.com/apps/lemon-squeezy",
    "aiNotes": "New order, subscription active, payment failed, license activated",
    "categories": [
      "payment",
      "ecommerce",
      "trigger"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "zendesk",
    "name": "Zendesk",
    "url": "https://zapier.com/apps/zendesk",
    "aiNotes": "New ticket, ticket updated, ticket solved, create ticket, add comment",
    "categories": [
      "support",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "intercom",
    "name": "Intercom",
    "url": "https://zapier.com/apps/intercom",
    "aiNotes": "New conversation, new user, send message, create ticket, update user",
    "categories": [
      "support",
      "chat",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "freshdesk",
    "name": "Freshdesk",
    "url": "https://zapier.com/apps/freshdesk",
    "aiNotes": "New ticket, ticket resolved, new contact, create ticket, reply",
    "categories": [
      "support",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "crisp",
    "name": "Crisp",
    "url": "https://zapier.com/apps/crisp",
    "aiNotes": "New message, new contact, send message, update contact, watch event",
    "categories": [
      "support",
      "chat",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "zoom",
    "name": "Zoom",
    "url": "https://zapier.com/apps/zoom",
    "aiNotes": "Meeting started, recording ready, new registrant, create meeting, add registrant",
    "categories": [
      "video",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "calendly",
    "name": "Calendly",
    "url": "https://zapier.com/apps/calendly",
    "aiNotes": "Event scheduled, event cancelled, invitee created — appointment scheduling trigger",
    "categories": [
      "calendar",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "calcom",
    "name": "Cal.com",
    "url": "https://cal.com",
    "aiNotes": "Booking created, booking cancelled, meeting reminder — open-source scheduling",
    "categories": [
      "calendar",
      "trigger"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "google-calendar",
    "name": "Google Calendar",
    "url": "https://zapier.com/apps/google-calendar",
    "aiNotes": "New event, event starts, create event, update event, cancel event, RSVP",
    "categories": [
      "calendar",
      "google",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "outlook-calendar",
    "name": "Outlook Calendar",
    "url": "https://zapier.com/apps/microsoft-outlook",
    "aiNotes": "New event, event updated, create event, cancel event",
    "categories": [
      "calendar",
      "microsoft",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "webhook",
    "name": "Webhook (generic)",
    "url": "https://zapier.com/apps/webhook",
    "aiNotes": "Catch incoming HTTP webhook, POST data to URL, GET request, custom headers",
    "categories": [
      "webhook",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "rss",
    "name": "RSS Feed",
    "url": "https://zapier.com/apps/rss",
    "aiNotes": "Watch RSS or Atom feed for new items, parse feed, watch keyword in feed",
    "categories": [
      "feed",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "zapier",
    "name": "Zapier",
    "url": "https://zapier.com",
    "aiNotes": "Connect 7000+ apps, automation platform, multi-step zaps, filter and delay",
    "categories": [
      "automation",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "n8n",
    "name": "n8n",
    "url": "https://n8n.io",
    "aiNotes": "Open-source automation, 500+ integrations, self-hostable, AI workflows",
    "categories": [
      "automation",
      "dev",
      "trigger",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "make",
    "name": "Make (Integromat)",
    "url": "https://www.make.com",
    "aiNotes": "Visual automation builder, 1500+ apps, routers, iterators, complex flows",
    "categories": [
      "automation",
      "trigger",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "pipedream",
    "name": "Pipedream",
    "url": "https://pipedream.com",
    "aiNotes": "Code-first automation, event sources, HTTP, email, cron, 2000+ integrations",
    "categories": [
      "automation",
      "dev",
      "trigger",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "activepieces",
    "name": "Activepieces",
    "url": "https://www.activepieces.com",
    "aiNotes": "Open-source n8n/Zapier alternative, self-hostable, growing piece catalog",
    "categories": [
      "automation",
      "dev",
      "trigger",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "google-docs",
    "name": "Google Docs",
    "url": "https://zapier.com/apps/google-docs",
    "aiNotes": "Create document, append to document, watch new doc, find and replace",
    "categories": [
      "docs",
      "google",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "confluence",
    "name": "Confluence",
    "url": "https://zapier.com/apps/confluence",
    "aiNotes": "Create page, update page, watch space, attach file, comment",
    "categories": [
      "docs",
      "dev",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "dropbox-paper",
    "name": "Dropbox Paper",
    "url": "https://zapier.com/apps/dropbox",
    "aiNotes": "Create doc, append content, watch document changes",
    "categories": [
      "docs",
      "storage",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "algolia",
    "name": "Algolia",
    "url": "https://zapier.com/apps/algolia",
    "aiNotes": "Add record to index, update record, search, delete record, clear index",
    "categories": [
      "search",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "typesense",
    "name": "Typesense",
    "url": "https://typesense.org",
    "aiNotes": "Index document, search, update, delete — fast open-source search engine",
    "categories": [
      "search",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "meilisearch",
    "name": "Meilisearch",
    "url": "https://www.meilisearch.com",
    "aiNotes": "Add documents, search, delete — blazing fast open-source search",
    "categories": [
      "search",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "better-uptime",
    "name": "Better Uptime",
    "url": "https://betterstack.com",
    "aiNotes": "Monitor goes down, incident created, monitor recovered, status page event",
    "categories": [
      "monitoring",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "grafana",
    "name": "Grafana",
    "url": "https://zapier.com/apps/grafana",
    "aiNotes": "Alert fired, annotation created, send metric, watch dashboard",
    "categories": [
      "monitoring",
      "analytics",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "bamboohr",
    "name": "BambooHR",
    "url": "https://zapier.com/apps/bamboohr",
    "aiNotes": "New employee, time-off request, employee updated, create record",
    "categories": [
      "hr",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "gusto",
    "name": "Gusto",
    "url": "https://zapier.com/apps/gusto",
    "aiNotes": "New employee, payroll completed, contractor added, watch events",
    "categories": [
      "hr",
      "payment",
      "trigger"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "home-assistant",
    "name": "Home Assistant",
    "url": "https://www.home-assistant.io",
    "aiNotes": "Watch sensor state, trigger automation, call service, watch event",
    "categories": [
      "iot",
      "trigger",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "mqtt",
    "name": "MQTT",
    "url": "https://mqtt.org",
    "aiNotes": "Subscribe to topic, publish message, watch device event, IoT integration",
    "categories": [
      "iot",
      "trigger",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "twitch",
    "name": "Twitch",
    "url": "https://zapier.com/apps/twitch",
    "aiNotes": "New follower, stream goes live, new subscriber, clip created",
    "categories": [
      "social",
      "video",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "spotify",
    "name": "Spotify",
    "url": "https://zapier.com/apps/spotify",
    "aiNotes": "New saved track, playlist updated, create playlist, add track",
    "categories": [
      "social",
      "music",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "twilio-voice",
    "name": "Twilio Voice",
    "url": "https://zapier.com/apps/twilio",
    "aiNotes": "Make phone call, watch incoming call, text to speech, IVR",
    "categories": [
      "voice",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "freemium",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "oracle-netsuite",
    "name": "Oracle NetSuite",
    "url": "https://zapier.com/apps/netsuite",
    "aiNotes": "Create/update financial records, inventory, CRM records",
    "categories": [
      "erp",
      "finance",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "dynamics365",
    "name": "Microsoft Dynamics 365",
    "url": "https://zapier.com/apps/microsoft-dynamics-crm",
    "aiNotes": "Create lead, update opportunity, watch new record",
    "categories": [
      "crm",
      "erp",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "quickbooks",
    "name": "QuickBooks Online",
    "url": "https://zapier.com/apps/quickbooks",
    "aiNotes": "Create invoice, add customer, record payment, sync expenses",
    "categories": [
      "finance",
      "accounting",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "xero",
    "name": "Xero",
    "url": "https://zapier.com/apps/xero",
    "aiNotes": "Create invoice, add contact, watch new payment",
    "categories": [
      "finance",
      "accounting",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "chargebee",
    "name": "Chargebee",
    "url": "https://zapier.com/apps/chargebee",
    "aiNotes": "New subscription, cancel subscription, create invoice, apply coupon",
    "categories": [
      "payments",
      "saas",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "helpscout",
    "name": "Help Scout",
    "url": "https://zapier.com/apps/help-scout",
    "aiNotes": "Create conversation, add note, watch new conversation",
    "categories": [
      "customer-support",
      "email",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "google-meet",
    "name": "Google Meet",
    "url": "https://zapier.com/apps/google-meet",
    "aiNotes": "Create meeting via Google Calendar, schedule call",
    "categories": [
      "video",
      "meetings",
      "google",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "microsoft-teams",
    "name": "Microsoft Teams",
    "url": "https://zapier.com/apps/microsoft-teams",
    "aiNotes": "Send channel message, create meeting, watch new message",
    "categories": [
      "chat",
      "messaging",
      "microsoft",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "copper",
    "name": "Copper CRM",
    "url": "https://zapier.com/apps/copper",
    "aiNotes": "Create lead, update opportunity, watch new person",
    "categories": [
      "crm",
      "google",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "acuity-scheduling",
    "name": "Acuity Scheduling",
    "url": "https://zapier.com/apps/acuity-scheduling",
    "aiNotes": "Watch new appointment, cancel appointment, create appointment",
    "categories": [
      "scheduling",
      "calendar",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "bigcommerce",
    "name": "BigCommerce",
    "url": "https://zapier.com/apps/bigcommerce",
    "aiNotes": "Watch new order, create product, update customer",
    "categories": [
      "ecommerce",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "aws-lambda",
    "name": "AWS Lambda",
    "url": "https://zapier.com/apps/aws-lambda",
    "aiNotes": "Invoke function, pass payload, trigger on event",
    "categories": [
      "cloud",
      "dev",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "firebase",
    "name": "Firebase / Firestore",
    "url": "https://zapier.com/apps/firebase",
    "aiNotes": "Watch document change, write document, trigger cloud function",
    "categories": [
      "database",
      "google",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "airbyte",
    "name": "Airbyte",
    "url": "https://airbyte.com",
    "aiNotes": "Trigger sync, manage connections, extract from 300+ sources",
    "categories": [
      "etl",
      "data-pipeline",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "docusign",
    "name": "DocuSign",
    "url": "https://zapier.com/apps/docusign",
    "aiNotes": "Create envelope, send for signature, watch signing complete",
    "categories": [
      "documents",
      "legal",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "pandadoc",
    "name": "PandaDoc",
    "url": "https://zapier.com/apps/pandadoc",
    "aiNotes": "Create document from template, send for signature, watch completion",
    "categories": [
      "documents",
      "legal",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "workday",
    "name": "Workday",
    "url": "https://zapier.com/apps/workday",
    "aiNotes": "Create worker record, update job requisition, watch new hire",
    "categories": [
      "hr",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "greenhouse",
    "name": "Greenhouse",
    "url": "https://zapier.com/apps/greenhouse",
    "aiNotes": "Watch new applicant, move candidate stage, create job posting",
    "categories": [
      "hr",
      "recruitment",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "delighted",
    "name": "Delighted",
    "url": "https://zapier.com/apps/delighted",
    "aiNotes": "Send NPS/CSAT survey, watch new response, add person",
    "categories": [
      "survey",
      "feedback",
      "trigger",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "webflow",
    "name": "Webflow",
    "url": "https://zapier.com/apps/webflow",
    "aiNotes": "Create CMS item, update item, watch form submission, publish site",
    "categories": [
      "cms",
      "web",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "wordpress",
    "name": "WordPress",
    "url": "https://zapier.com/apps/wordpress",
    "aiNotes": "Create post, create user, watch new post/comment",
    "categories": [
      "cms",
      "web",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "ghost",
    "name": "Ghost",
    "url": "https://zapier.com/apps/ghost",
    "aiNotes": "Create post, update member, watch new subscriber",
    "categories": [
      "cms",
      "email-marketing",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "contentful",
    "name": "Contentful",
    "url": "https://zapier.com/apps/contentful",
    "aiNotes": "Create/update CMS entry, watch published entry, manage assets",
    "categories": [
      "cms",
      "dev",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "strapi",
    "name": "Strapi",
    "url": "https://strapi.io",
    "aiNotes": "Create/update/delete content entries via REST or GraphQL API",
    "categories": [
      "cms",
      "dev",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "affinity",
    "name": "Affinity CRM",
    "url": "https://zapier.com/apps/affinity",
    "aiNotes": "Create/update person or organization, watch new list entry",
    "categories": [
      "crm",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "gong",
    "name": "Gong",
    "url": "https://zapier.com/apps/gong",
    "aiNotes": "Watch new call recorded, get call transcript, analyze deal signals",
    "categories": [
      "sales",
      "ai",
      "trigger"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "lemlist",
    "name": "Lemlist",
    "url": "https://zapier.com/apps/lemlist",
    "aiNotes": "Add lead to campaign, watch email reply, update activity",
    "categories": [
      "sales",
      "email-marketing",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "outreach",
    "name": "Outreach",
    "url": "https://zapier.com/apps/outreach",
    "aiNotes": "Create prospect, add to sequence, watch stage change",
    "categories": [
      "sales",
      "crm",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "tableau",
    "name": "Tableau",
    "url": "https://zapier.com/apps/tableau",
    "aiNotes": "Refresh extract, publish workbook, update data source",
    "categories": [
      "analytics",
      "bi",
      "action"
    ],
    "isZapier": true,
    "tier": "paid",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "looker-studio",
    "name": "Looker Studio",
    "url": "https://zapier.com/apps/google-data-studio",
    "aiNotes": "Connect data sources, refresh reports, embed dashboard",
    "categories": [
      "analytics",
      "bi",
      "google",
      "action"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "metabase",
    "name": "Metabase",
    "url": "https://metabase.com",
    "aiNotes": "Query database, embed chart, alert on metric threshold",
    "categories": [
      "analytics",
      "bi",
      "action",
      "trigger"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "retool",
    "name": "Retool",
    "url": "https://retool.com",
    "aiNotes": "Trigger workflow, run query, update internal tool UI",
    "categories": [
      "dev",
      "internal-tools",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "appsmith",
    "name": "Appsmith",
    "url": "https://appsmith.com",
    "aiNotes": "Build and trigger internal apps, connect DB, run APIs",
    "categories": [
      "dev",
      "internal-tools",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "bubble",
    "name": "Bubble",
    "url": "https://zapier.com/apps/bubble",
    "aiNotes": "Trigger workflow via API, create DB record, update thing",
    "categories": [
      "nocode",
      "dev",
      "action",
      "trigger"
    ],
    "isZapier": true,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "xata",
    "name": "Xata",
    "url": "https://xata.io",
    "aiNotes": "Insert/search records in serverless Postgres with vector search built-in",
    "categories": [
      "database",
      "vector-db",
      "dev",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "turso",
    "name": "Turso (libSQL)",
    "url": "https://turso.tech",
    "aiNotes": "Execute SQL queries on distributed edge SQLite database",
    "categories": [
      "database",
      "dev",
      "action"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  },
  {
    "slug": "liveblocks",
    "name": "Liveblocks",
    "url": "https://liveblocks.io",
    "aiNotes": "Sync real-time collaborative state, broadcast events, read room data",
    "categories": [
      "realtime",
      "dev",
      "action",
      "trigger"
    ],
    "isZapier": false,
    "tier": "free",
    "dead": false,
    "lastChecked": "2026-06-15T09:30:47Z"
  }
];
