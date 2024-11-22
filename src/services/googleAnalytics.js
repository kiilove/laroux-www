import axios from "axios";

// Constants
const DEFAULT_DATE_RANGE = {
  startDate: "7daysAgo",
  endDate: "today",
};

class GoogleAnalyticsClient {
  constructor() {
    this.initializeClient();
  }

  initializeClient() {
    try {
      const config = this.validateEnvVariables();
      this.apiUrl = config.apiUrl;
      this.propertyId = config.propertyId;
      this.apiKey = config.apiKey;

      // axios 인스턴스 설정
      this.axiosInstance = axios.create({
        baseURL: `${this.apiUrl}/${this.propertyId}`,
        headers: {
          "Content-Type": "application/json",
        },
        // 타임아웃 설정
        timeout: 10000,
      });

      // 요청 인터셉터 추가
      this.axiosInstance.interceptors.request.use(
        (config) => {
          console.log("API Request:", {
            url: config.url,
            method: config.method,
            headers: {
              ...config.headers,
              Authorization: "Bearer [HIDDEN]", // 보안을 위해 실제 토큰 숨김
            },
          });
          return config;
        },
        (error) => {
          console.error("Request Interceptor Error:", error);
          return Promise.reject(error);
        }
      );

      // 응답 인터셉터 추가
      this.axiosInstance.interceptors.response.use(
        (response) => {
          console.log("API Response:", {
            status: response.status,
            data: response.data,
          });
          return response;
        },
        (error) => {
          console.error("Response Interceptor Error:", error);
          return Promise.reject(error);
        }
      );
    } catch (error) {
      console.error("Client Initialization Error:", error);
      throw error;
    }
  }

  validateEnvVariables() {
    const requiredVars = {
      apiUrl: process.env.REACT_APP_GA_API_URL,
      propertyId: process.env.REACT_APP_GA_PROPERTY_ID,
      apiKey: process.env.REACT_APP_GA_API_KEY_ANALYTICS,
    };

    // 환경 변수 값 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log("Environment Variables:", {
        apiUrl: requiredVars.apiUrl ? "[EXISTS]" : "[MISSING]",
        propertyId: requiredVars.propertyId ? "[EXISTS]" : "[MISSING]",
        apiKey: requiredVars.apiKey ? "[EXISTS]" : "[MISSING]",
      });
    }

    const missingVars = Object.entries(requiredVars)
      .filter(([_, value]) => !value)
      .map(([key]) => `REACT_APP_GA_${key.toUpperCase()}`);

    if (missingVars.length > 0) {
      throw new Error(
        `환경 변수 오류: 다음 변수가 누락되었습니다: ${missingVars.join(
          ", "
        )}\n` + ".env 파일을 확인하세요."
      );
    }

    return requiredVars;
  }

  getAccessToken() {
    const accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error(
        "인증 오류: Access Token이 없습니다. OAuth 인증을 먼저 진행하세요."
      );
    }
    // 토큰 유효성 간단 체크 (형식만)
    if (!accessToken.startsWith("ya29.") && !accessToken.includes(".")) {
      console.warn("Warning: Access Token format appears invalid");
    }
    return accessToken;
  }

  async fetchAnalyticsData({
    dateRanges = [DEFAULT_DATE_RANGE],
    dimensions = [{ name: "pageTitle" }],
    metrics = [{ name: "screenPageViews" }],
  } = {}) {
    try {
      const accessToken = this.getAccessToken();

      // 요청 데이터 로깅
      console.log("Fetching analytics data with params:", {
        dateRanges,
        dimensions,
        metrics,
      });

      const response = await this.axiosInstance.post(
        ":runReport",
        {
          dateRanges,
          dimensions,
          metrics,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data?.rows?.length) {
        console.warn("데이터 없음: API 응답이 비어있습니다.", response.data);
        return [];
      }

      return response.data;
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  handleApiError(error) {
    let errorMessage = "Google Analytics API 요청 중 오류가 발생했습니다.";

    if (error.response) {
      const { status, statusText, data } = error.response;

      // 상태 코드별 구체적인 에러 메시지
      switch (status) {
        case 400:
          errorMessage = `잘못된 요청: ${
            data.error?.message || "요청 형식을 확인하세요"
          }`;
          break;
        case 401:
          errorMessage =
            "인증 오류: Access Token이 만료되었거나 유효하지 않습니다";
          // 토큰 재발급 로직을 추가할 수 있는 위치
          sessionStorage.removeItem("access_token"); // 잘못된 토큰 제거
          break;
        case 403:
          errorMessage = "권한 오류: API 접근 권한이 없습니다";
          break;
        case 404:
          errorMessage = "잘못된 API 엔드포인트입니다";
          break;
        case 429:
          errorMessage = "요청 한도 초과: 잠시 후 다시 시도해주세요";
          break;
        default:
          errorMessage = `서버 오류 (${status} ${statusText}): ${
            data.error?.message || "알 수 없는 오류가 발생했습니다"
          }`;
      }

      console.error("API Error Details:", {
        status,
        statusText,
        data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      errorMessage = "네트워크 오류: 서버에 연결할 수 없습니다";
      console.error("Network Error:", error.request);
    } else {
      errorMessage = `요청 설정 오류: ${error.message}`;
      console.error("Request Setup Error:", error);
    }

    throw new Error(errorMessage);
  }

  // 인스턴스 재초기화 메소드 (필요시 사용)
  reinitialize() {
    this.initializeClient();
  }
}

// 싱글톤 인스턴스 생성
const analyticsClient = new GoogleAnalyticsClient();

// 외부에서 사용할 함수들 export
export const fetchAnalyticsData = (options) =>
  analyticsClient.fetchAnalyticsData(options);

// 재초기화 함수 export (필요한 경우 사용)
export const reinitializeAnalyticsClient = () => analyticsClient.reinitialize();
