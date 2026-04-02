import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 환경변수가 설정되지 않으면 null 반환
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// 포트폴리오 이미지 타입
export interface PortfolioImage {
  before_image: string;
  after_image: string;
  description: string;
}

// 포트폴리오 타입 정의
export interface Portfolio {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  cleaning_scope: string;  // 청소 범위
  thumbnail_before: string;  // 목록용 대표 이미지
  thumbnail_after: string;
  images: PortfolioImage[];  // 상세 이미지들 (최대 6개)
  created_at: string;
}
