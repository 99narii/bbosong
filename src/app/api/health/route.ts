import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  // Vercel Cron 또는 일반 요청 모두 허용
  if (!supabase) {
    return NextResponse.json({ status: "no supabase" }, { status: 500 });
  }

  // 간단한 쿼리로 Supabase 활성 상태 유지
  const { count, error } = await supabase
    .from("portfolios")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    portfolioCount: count
  });
}
