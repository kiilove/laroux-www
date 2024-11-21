import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url = "https://www.laroux.co.kr",
  schemaData,
}) => {
  const defaultTitle = "Laroux - Feel Your Beauty";
  const defaultDescription =
    "Feel Your Beauty - 당신만의 아름다움을 느끼세요. 프리미엄 여성 패션 브랜드";
  const defaultKeywords = "여성패션,패션브랜드,프리미엄패션,뷰티,팝업스토어";
  const defaultImage = "https://www.laroux.co.kr/og-image.jpg";

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "FashionBrand",
    name: "Laroux",
    slogan: "Feel Your Beauty",
    url: url,
    logo: "https://www.laroux.co.kr/logo192.png",
    image: image || defaultImage,
    description: description || defaultDescription,
    brand: {
      "@type": "Brand",
      name: "Laroux",
    },
    sameAs: [
      "https://instagram.com/laroux_official",
      "https://facebook.com/laroux",
    ],
  };

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* 오픈 그래프 태그 */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Laroux" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="ko_KR" />

      {/* 트위터 카드 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* canonical URL */}
      <link rel="canonical" href={url} />

      {/* Schema.org 구조화된 데이터 */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
