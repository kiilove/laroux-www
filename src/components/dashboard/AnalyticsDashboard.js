import React, { useEffect, useState, useRef, useCallback } from "react";
import * as echarts from "echarts";
import { fetchAnalyticsData } from "../../services/googleAnalytics";
import { generateAuthUrl, isLoggedIn } from "../../services/googleAuth";

const AnalyticsDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 데이터 가져오기 함수
  const fetchData = useCallback(async () => {
    if (!isLoggedIn()) {
      setError("Google Analytics 연동이 필요합니다.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAnalyticsData();

      if (data?.rows) {
        const rows = data.rows.map((row) => ({
          name: row.dimensionValues[0].value,
          value: parseInt(row.metricValues[0].value, 10),
        }));
        setChartData(rows);
      } else {
        setChartData([]);
      }
    } catch (error) {
      console.error("Analytics data fetch error:", error);
      setError(error.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      setChartData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Google Analytics 연동
  const handleGoogleAuth = () => {
    try {
      console.log("Starting Google Analytics Authorization...");
      // 현재 환경 설정 출력
      console.log("Environment:", {
        NODE_ENV: process.env.NODE_ENV,
        hasClientId: !!process.env.REACT_APP_GA_CLIENT_ID,
        hasClientSecret: !!process.env.REACT_APP_GA_CLIENT_SECRET,
        redirectUri:
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_REDIRECT_URI
            : process.env.REACT_APP_REDIRECT_URI_LOCAL,
      });

      const authUrl = generateAuthUrl();
      console.log("Redirecting to:", authUrl);
      window.location.href = authUrl;
    } catch (error) {
      console.error("Google Auth Error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      fetchData();
    }
  }, [fetchData]);

  // 차트 초기화
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    chartInstance.current = echarts.init(chartRef.current);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  // 차트 데이터 업데이트
  useEffect(() => {
    if (chartInstance.current && chartData.length > 0) {
      chartInstance.current.setOption({
        title: {
          text: "Page Views",
          textStyle: { fontSize: 16 },
        },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: chartData.map((item) => item.name),
        },
        yAxis: { type: "value" },
        series: [
          {
            type: "bar",
            data: chartData.map((item) => item.value),
          },
        ],
      });
    }
  }, [chartData]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
        {!isLoggedIn() && (
          <button
            onClick={handleGoogleAuth}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Google Analytics 연동하기
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
          <p>{error}</p>
          {!isLoggedIn() && (
            <button
              onClick={handleGoogleAuth}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Google Analytics 연동하기
            </button>
          )}
        </div>
      )}

      <div className="border rounded-lg bg-white shadow">
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : chartData.length > 0 ? (
          <div ref={chartRef} className="w-full h-[400px]" />
        ) : (
          <div className="flex items-center justify-center h-[400px] text-gray-500">
            {isLoggedIn()
              ? "표시할 데이터가 없습니다."
              : "Google Analytics 연동이 필요합니다."}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
