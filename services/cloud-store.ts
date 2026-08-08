import { createClient } from "@supabase/supabase-js";
import type { PortfolioContent } from "@/types/content";
import { portfolioSchema } from "@/lib/content-schema";
import { defaultContent } from "@/lib/default-content";

const TABLE = "portfolio_content";
const ROW_ID = "singleton";

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getCloudContent(): Promise<PortfolioContent | null> {
  const client = getClient();
  if (!client) return null;

  const { data, error } = await client.from(TABLE).select("content").eq("id", ROW_ID).single();

  if (error || !data) {
    const parsed = portfolioSchema.safeParse(defaultContent);
    if (parsed.success) {
      await saveCloudContent(parsed.data).catch(() => {});
    }
    return parsed.success ? parsed.data : null;
  }

  const parsed = portfolioSchema.safeParse(data.content);
  return parsed.success ? parsed.data : null;
}

export async function saveCloudContent(content: PortfolioContent) {
  const client = getClient();
  if (!client) return false;

  const parsed = portfolioSchema.parse(content);

  const { error } = await client.from(TABLE).upsert(
    { id: ROW_ID, content: parsed, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );

  return !error;
}
