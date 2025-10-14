import React from "react";
import BackButton from "../components/BackButton";
import { useForm } from "../hooks/useForm";

type LoginForm = { email: string; password: string };

const EMAIL_RX = /^\S+@\S+\.\S+$/;

const LoginPage: React.FC = () => {
  const { values, errors, touched, getInputProps, submit } = useForm<LoginForm>(
    {
      initialValues: { email: "", password: "" },
      validate: (v: LoginForm) => {
        const e: Partial<Record<keyof LoginForm, string>> = {};

        if (!v.email) e.email = "이메일을 입력해주세요.";
        else if (!EMAIL_RX.test(v.email))
          e.email = "유효하지 않은 이메일 형식입니다.";

        if (!v.password) e.password = "비밀번호를 입력해주세요.";
        else if (v.password.length < 6)
          e.password = "비밀번호는 최소 6자 이상이어야 합니다.";

        return e;
      },
    }
  );

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    void submit(async (vals: LoginForm) => {
      // TODO: 실제 로그인 API 호출
      console.log("로그인 시도:", vals);
    });
  };

  // 둘 다 유효해야 버튼 활성화
  const isEmailValid =
    !errors.email && !!values.email && EMAIL_RX.test(values.email);
  const isPwValid =
    !errors.password && !!values.password && values.password.length >= 6;
  const canSubmit = isEmailValid && isPwValid;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      <BackButton />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-md border border-gray-100"
      >
        <h1 className="text-2xl font-semibold mb-6">로그인</h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="이메일"
            {...getInputProps("email")}
            className="w-full border border-[#ccc] p-[10px] rounded-sm focus:border-[#807bff] outline-none"
            aria-invalid={!!(touched.email && errors.email)}
            aria-describedby="email-error"
          />
          {touched.email && errors.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-500"
              aria-live="polite"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="비밀번호"
            {...getInputProps("password")}
            className="w-full border border-[#ccc] p-[10px] rounded-sm focus:border-[#807bff] outline-none"
            aria-invalid={!!(touched.password && errors.password)}
            aria-describedby="password-error"
          />
          {touched.password && errors.password && (
            <p
              id="password-error"
              className="mt-1 text-sm text-red-500"
              aria-live="polite"
            >
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
