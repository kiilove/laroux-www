import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    // 로그인 처리
  };

  const handleGoogleLogin = async () => {
    // Google 로그인 처리
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        로그인
      </Title>
      <Form
        name="login"
        layout="vertical"
        onFinish={handleLogin}
        initialValues={{ email: "", password: "" }}
      >
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: "이메일을 입력해주세요." }]}
        >
          <Input type="email" placeholder="이메일을 입력하세요" />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            로그인
          </Button>
        </Form.Item>
      </Form>
      <Button type="default" onClick={handleGoogleLogin} block>
        Google 계정으로 로그인
      </Button>
      <Button
        type="link"
        onClick={() => navigate("/signup")}
        style={{ marginTop: 16 }}
        block
      >
        회원가입
      </Button>
      <Button
        type="link"
        onClick={() => alert("비밀번호 찾기 기능 준비 중입니다.")}
        block
      >
        비밀번호 찾기
      </Button>
    </div>
  );
};

export default Login;
