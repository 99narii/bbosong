"use client";

import { useState, useEffect } from "react";
import { supabase, Portfolio, PortfolioImage } from "@/lib/supabase";

const categories = ["입주청소", "상가청소", "가정청소", "새집증후군"];

interface ImagePair {
  beforeFile: File | null;
  afterFile: File | null;
  beforePreview: string;
  afterPreview: string;
  description: string;
}

const emptyImagePair: ImagePair = {
  beforeFile: null,
  afterFile: null,
  beforePreview: "",
  afterPreview: "",
  description: "",
};

export default function AdminPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // 기본 정보
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    cleaning_scope: "",
  });

  // 대표 이미지 (썸네일)
  const [thumbnail, setThumbnail] = useState<ImagePair>({ ...emptyImagePair });

  // 상세 이미지 (최대 6쌍)
  const [detailImages, setDetailImages] = useState<ImagePair[]>([{ ...emptyImagePair }]);

  // Supabase 연결 확인
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Supabase 설정 필요</h1>
          <p className="text-gray-600 mb-4">
            .env.local 파일에 Supabase 환경변수를 설정해주세요.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 text-left text-sm font-mono">
            <p>NEXT_PUBLIC_SUPABASE_URL=your-url</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key</p>
          </div>
        </div>
      </div>
    );
  }

  // 포트폴리오 목록 불러오기
  const fetchPortfolios = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching portfolios:", error);
    } else {
      setPortfolios(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // 이미지 업로드
  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    if (!supabase) return null;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({ title: "", description: "", location: "", category: "", cleaning_scope: "" });
    setThumbnail({ ...emptyImagePair });
    setDetailImages([{ ...emptyImagePair }]);
    setEditingId(null);
  };

  // 수정할 포트폴리오 선택
  const handleEdit = (portfolio: Portfolio) => {
    setEditingId(portfolio.id);
    setFormData({
      title: portfolio.title,
      description: portfolio.description || "",
      location: portfolio.location || "",
      category: portfolio.category || "",
      cleaning_scope: portfolio.cleaning_scope || "",
    });
    setThumbnail({
      beforeFile: null,
      afterFile: null,
      beforePreview: portfolio.thumbnail_before || "",
      afterPreview: portfolio.thumbnail_after || "",
      description: "",
    });

    if (portfolio.images && portfolio.images.length > 0) {
      setDetailImages(
        portfolio.images.map((img) => ({
          beforeFile: null,
          afterFile: null,
          beforePreview: img.before_image,
          afterPreview: img.after_image,
          description: img.description || "",
        }))
      );
    } else {
      setDetailImages([{ ...emptyImagePair }]);
    }

    // 폼으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 신규 등록 시 이미지 필수
    if (!editingId && (!thumbnail.beforeFile || !thumbnail.afterFile)) {
      alert("대표 전후 사진을 모두 선택해주세요.");
      return;
    }

    // 수정 시 기존 이미지 또는 새 이미지 필요
    if (editingId && !thumbnail.beforePreview && !thumbnail.beforeFile) {
      alert("대표 전후 사진을 모두 선택해주세요.");
      return;
    }

    if (!formData.title || !formData.category || !formData.location) {
      alert("제목, 카테고리, 위치를 모두 입력해주세요.");
      return;
    }

    setUploading(true);

    try {
      // 대표 이미지 처리
      let thumbnailBeforeUrl = thumbnail.beforePreview;
      let thumbnailAfterUrl = thumbnail.afterPreview;

      if (thumbnail.beforeFile) {
        const url = await uploadImage(thumbnail.beforeFile, "thumbnails/before");
        if (!url) throw new Error("대표 Before 이미지 업로드 실패");
        thumbnailBeforeUrl = url;
      }

      if (thumbnail.afterFile) {
        const url = await uploadImage(thumbnail.afterFile, "thumbnails/after");
        if (!url) throw new Error("대표 After 이미지 업로드 실패");
        thumbnailAfterUrl = url;
      }

      // 상세 이미지 처리
      const uploadedImages: PortfolioImage[] = [];

      for (const img of detailImages) {
        // 이미지가 있는 경우만 처리
        if (img.beforePreview || img.beforeFile) {
          let beforeUrl = img.beforePreview;
          let afterUrl = img.afterPreview;

          if (img.beforeFile) {
            const url = await uploadImage(img.beforeFile, "details/before");
            if (url) beforeUrl = url;
          }

          if (img.afterFile) {
            const url = await uploadImage(img.afterFile, "details/after");
            if (url) afterUrl = url;
          }

          if (beforeUrl && afterUrl) {
            uploadedImages.push({
              before_image: beforeUrl,
              after_image: afterUrl,
              description: img.description,
            });
          }
        }
      }

      const portfolioData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        category: formData.category,
        cleaning_scope: formData.cleaning_scope,
        thumbnail_before: thumbnailBeforeUrl,
        thumbnail_after: thumbnailAfterUrl,
        images: uploadedImages,
      };

      if (!supabase) throw new Error("Supabase 연결 오류");

      if (editingId) {
        // 수정
        const { error } = await supabase
          .from("portfolios")
          .update(portfolioData)
          .eq("id", editingId);

        if (error) throw error;
        alert("포트폴리오가 수정되었습니다.");
      } else {
        // 신규 등록
        const { error } = await supabase.from("portfolios").insert(portfolioData);
        if (error) throw error;
        alert("포트폴리오가 등록되었습니다.");
      }

      resetForm();
      fetchPortfolios();
    } catch (error) {
      console.error("Error:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  // 포트폴리오 삭제
  const handleDelete = async (id: number) => {
    if (!supabase) return;
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const { error } = await supabase.from("portfolios").delete().eq("id", id);

    if (error) {
      console.error("Error deleting:", error);
      alert("삭제 중 오류가 발생했습니다.");
    } else {
      if (editingId === id) resetForm();
      fetchPortfolios();
    }
  };

  // 이미지 선택 핸들러
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after",
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (index === undefined) {
      // 대표 이미지
      setThumbnail(prev => ({
        ...prev,
        [type === "before" ? "beforeFile" : "afterFile"]: file,
        [type === "before" ? "beforePreview" : "afterPreview"]: preview,
      }));
    } else {
      // 상세 이미지
      setDetailImages(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          [type === "before" ? "beforeFile" : "afterFile"]: file,
          [type === "before" ? "beforePreview" : "afterPreview"]: preview,
        };
        return updated;
      });
    }
  };

  // 상세 이미지 설명 변경
  const handleDescriptionChange = (index: number, value: string) => {
    setDetailImages(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], description: value };
      return updated;
    });
  };

  // 상세 이미지 추가
  const addDetailImage = () => {
    if (detailImages.length < 6) {
      setDetailImages(prev => [...prev, { ...emptyImagePair }]);
    }
  };

  // 상세 이미지 삭제
  const removeDetailImage = (index: number) => {
    setDetailImages(prev => prev.filter((_, i) => i !== index));
  };

  // 이미지 업로드 컴포넌트
  const ImageUploader = ({
    preview,
    label,
    onChange,
    onClear,
  }: {
    preview: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-teal-500 transition-colors">
      {preview ? (
        <div className="relative">
          <img src={preview} alt={label} className="w-full h-32 object-cover rounded-lg" />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
            {label}
          </span>
        </div>
      ) : (
        <label className="cursor-pointer block py-4">
          <svg className="w-8 h-8 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-500 text-sm">{label}</span>
          <input type="file" accept="image/*" className="hidden" onChange={onChange} />
        </label>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">관리자 페이지</h1>

        {/* 포트폴리오 등록/수정 폼 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? "포트폴리오 수정" : "포트폴리오 등록"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                취소
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  placeholder="예: 강남 아파트 입주 청소"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                >
                  <option value="">선택</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">위치 *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  placeholder="예: 서울 강남구"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">청소 범위</label>
                <input
                  type="text"
                  value={formData.cleaning_scope}
                  onChange={(e) => setFormData({ ...formData, cleaning_scope: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  placeholder="예: 32평 전체 / 주방+화장실"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                placeholder="예: 신축 아파트 입주 전 전체 청소 작업"
              />
            </div>

            {/* 대표 이미지 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대표 이미지 (목록에 표시) {!editingId && "*"}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <ImageUploader
                  preview={thumbnail.beforePreview}
                  label="Before"
                  onChange={(e) => handleImageChange(e, "before")}
                  onClear={() => setThumbnail(prev => ({ ...prev, beforeFile: null, beforePreview: "" }))}
                />
                <ImageUploader
                  preview={thumbnail.afterPreview}
                  label="After"
                  onChange={(e) => handleImageChange(e, "after")}
                  onClear={() => setThumbnail(prev => ({ ...prev, afterFile: null, afterPreview: "" }))}
                />
              </div>
            </div>

            {/* 상세 이미지 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  상세 이미지 (최대 6쌍)
                </label>
                {detailImages.length < 6 && (
                  <button
                    type="button"
                    onClick={addDetailImage}
                    className="text-teal-500 text-sm font-medium hover:text-teal-600"
                  >
                    + 이미지 추가
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {detailImages.map((img, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">이미지 {index + 1}</span>
                      {detailImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDetailImage(index)}
                          className="text-red-500 text-sm hover:text-red-600"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <ImageUploader
                        preview={img.beforePreview}
                        label="Before"
                        onChange={(e) => handleImageChange(e, "before", index)}
                        onClear={() => {
                          setDetailImages(prev => {
                            const updated = [...prev];
                            updated[index] = { ...updated[index], beforeFile: null, beforePreview: "" };
                            return updated;
                          });
                        }}
                      />
                      <ImageUploader
                        preview={img.afterPreview}
                        label="After"
                        onChange={(e) => handleImageChange(e, "after", index)}
                        onClear={() => {
                          setDetailImages(prev => {
                            const updated = [...prev];
                            updated[index] = { ...updated[index], afterFile: null, afterPreview: "" };
                            return updated;
                          });
                        }}
                      />
                    </div>
                    <input
                      type="text"
                      value={img.description}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm"
                      placeholder="이미지 설명 (예: 주방 싱크대 청소)"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "저장 중..." : editingId ? "수정 완료" : "포트폴리오 등록"}
            </button>
          </form>
        </div>

        {/* 포트폴리오 목록 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">등록된 포트폴리오</h2>

          {loading ? (
            <p className="text-gray-500 text-center py-8">로딩 중...</p>
          ) : portfolios.length === 0 ? (
            <p className="text-gray-500 text-center py-8">등록된 포트폴리오가 없습니다.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {portfolios.map((item) => (
                <li key={item.id} className="py-3 flex items-center justify-between">
                  <span className={`text-gray-900 ${editingId === item.id ? "font-bold text-teal-600" : ""}`}>
                    {item.title}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-teal-500 text-sm hover:text-teal-600"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 text-sm hover:text-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
