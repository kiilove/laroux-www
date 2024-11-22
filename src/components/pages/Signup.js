import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useEmailAuth,
  useGoogleAuth,
  useFacebookAuth,
} from "../../hooks/useFirebaseAuth/index";
import {
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { encryptData } from "../../utils/encryptionUtils";
import dayjs from "dayjs";
import { useFirestoreAddData } from "../../hooks/useFirestore";

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const { signUpWithEmail } = useEmailAuth();
  const { signUpWithGoogle } = useGoogleAuth();
  const { signUpWithFacebook } = useFacebookAuth();
  const { addData } = useFirestoreAddData();
  const [step, setStep] = useState(1); // Step 관리 (1: 선택, 2: 추가 정보 입력)
  const [googleUser, setGoogleUser] = useState(null); // Google 로그인 사용자 정보

  const handleEmailSignup = async (values) => {
    try {
      await signUpWithEmail(values.email, values.password, values);
      navigate("/dashboard");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const user = await signUpWithGoogle();
      setGoogleUser(user);
      setStep(2); // 추가 정보 입력 단계로 이동
    } catch (error) {
      console.error("Google 회원가입 실패:", error);
    }
  };

  const handleFacebookSignup = async () => {
    try {
      const user = await signUpWithFacebook();
      setGoogleUser(user); // Facebook도 Google과 동일 처리
      setStep(2);
    } catch (error) {
      console.error("Facebook 회원가입 실패:", error);
    }
  };

  const handleAdditionalInfo = async (values) => {
    try {
      console.log("추가 정보 저장:", { ...googleUser, ...values });
      const authUid = googleUser.uid;
      const encryptedName = encryptData(values.name);
      const encryptedPhone = encryptData(values.phone);
      const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");

      const newAdminValues = {
        authUid,
        name: encryptedName,
        phone: encryptedPhone,
        createdAt,
        updatedAt: createdAt,
      };
      console.log(newAdminValues);
      await addData("adminMembers", newAdminValues, () => {
        message.success("데이터 추가 완료");
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("추가 정보 저장 실패:", error);
    }
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
        position: "relative",
      }}
    >
      {/* 뒤로가기 버튼 */}
      {step === 2 && (
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => setStep(1)}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
          }}
        />
      )}

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        회원가입
      </Title>

      {/* 첫 번째 단계: 회원가입 방법 선택 */}
      {step === 1 && (
        <div>
          <Button
            type="primary"
            block
            onClick={() => setStep(2)}
            icon={<MailOutlined />}
            style={{ marginBottom: 16 }}
          >
            이메일로 회원가입
          </Button>
          <Button
            type="default"
            block
            onClick={handleGoogleSignup}
            icon={<GoogleOutlined />}
            style={{
              marginBottom: 16,
              backgroundColor: "#4285F4",
              color: "#fff",
            }}
          >
            Google 계정으로 회원가입
          </Button>
          <Button
            type="default"
            block
            onClick={handleFacebookSignup}
            icon={<FacebookOutlined />}
            style={{ backgroundColor: "#4267B2", color: "#fff" }}
          >
            Facebook 계정으로 회원가입
          </Button>
        </div>
      )}

      {/* 두 번째 단계: 이메일로 회원가입 */}
      {step === 2 && !googleUser && (
        <Form name="signup" layout="vertical" onFinish={handleEmailSignup}>
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
          <Form.Item
            label="비밀번호 확인"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "비밀번호를 다시 입력해주세요." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("비밀번호가 일치하지 않습니다.")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="비밀번호를 다시 입력하세요" />
          </Form.Item>
          <Form.Item
            label="이름"
            name="name"
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
          >
            <Input placeholder="이름을 입력하세요" />
          </Form.Item>
          <Form.Item
            label="전화번호"
            name="phone"
            rules={[{ required: true, message: "전화번호를 입력해주세요." }]}
          >
            <Input placeholder="전화번호를 입력하세요" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* 두 번째 단계: Google/Facebook 추가 정보 입력 */}
      {step === 2 && googleUser && (
        <Form
          name="additionalInfo"
          layout="vertical"
          onFinish={handleAdditionalInfo}
        >
          <Form.Item
            label="이름"
            name="name"
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
          >
            <Input placeholder="이름을 입력하세요" />
          </Form.Item>
          <Form.Item
            label="전화번호"
            name="phone"
            rules={[{ required: true, message: "전화번호를 입력해주세요." }]}
          >
            <Input placeholder="전화번호를 입력하세요" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              추가 정보 저장
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Signup;
