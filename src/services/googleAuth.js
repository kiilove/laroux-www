// 상수 정의
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

// 디버그 로그 함수 개선
const debugLog = (step, data) => {
  const timestamp = new Date().toISOString();
  console.log(`[GoogleAuth Debug ${timestamp}] ${step}:`, data);
};

// Google 인증 URL 생성 함수 개선
export const generateAuthUrl = () => {
  try {
    // 환경변수 확인
    const clientId = process.env.REACT_APP_GA_CLIENT_ID;
    const redirectUri =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_REDIRECT_URI
        : process.env.REACT_APP_REDIRECT_URI_LOCAL;

    // 필수 값 검증
    if (!clientId || !redirectUri) {
      debugLog("Configuration Error", {
        hasClientId: !!clientId,
        hasRedirectUri: !!redirectUri,
        env: process.env.NODE_ENV,
      });
      throw new Error("Missing required configuration");
    }

    // OAuth URL 파라미터 설정
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      // 필요한 모든 스코프 추가
      scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/analytics",
      ].join(" "),
      access_type: "offline",
      prompt: "consent",
    });

    const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

    debugLog("Generated Auth URL", {
      clientId: clientId.substring(0, 10) + "...",
      redirectUri,
      fullUrl: authUrl,
    });

    return authUrl;
  } catch (error) {
    debugLog("Auth URL Generation Error", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

// 로그인 상태 확인 함수 개선
export const isLoggedIn = () => {
  const token = sessionStorage.getItem("access_token");
  const loginStatus = !!token;

  debugLog("Login Status Check", {
    isLoggedIn: loginStatus,
    hasToken: !!token,
    tokenPrefix: token ? token.substring(0, 10) + "..." : null,
  });

  return loginStatus;
};

// OAuth 콜백 처리 함수
export const handleTokenExchange = async (code) => {
  try {
    debugLog("Starting Token Exchange", {
      code: code.substring(0, 10) + "...",
    });

    const clientId = process.env.REACT_APP_GA_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GA_CLIENT_SECRET;
    const redirectUri =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_REDIRECT_URI
        : process.env.REACT_APP_REDIRECT_URI_LOCAL;

    debugLog("Token Exchange Config", {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      redirectUri,
    });

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      debugLog("Token Exchange Error", {
        status: response.status,
        error: data.error,
        description: data.error_description,
      });
      throw new Error(data.error_description || "Token exchange failed");
    }

    debugLog("Token Exchange Success", {
      hasAccessToken: !!data.access_token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
    });

    return data;
  } catch (error) {
    debugLog("Token Exchange Failed", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};
