"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { classOptions } from "@/data/classes";
import { siteConfig } from "@/data/site";
import {
  emptyForm,
  experienceOptions,
  fieldLabels,
  MAX,
  validateField,
  type ContactFormValues,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<keyof ContactFormValues, string>>;

export default function ContactForm() {
  const searchParams = useSearchParams();

  const [values, setValues] = useState<ContactFormValues>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  /** フォームが表示された時刻（迷惑メール対策の判定に使用） */
  const mountedAt = useRef<number>(Date.now());
  /** 二重送信防止フラグ（state の更新を待たずに判定する） */
  const submitting = useRef(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  // クラスページの「申し込む」ボタンから来た場合、希望クラスを自動選択する
  useEffect(() => {
    const requested = searchParams.get("class");
    if (!requested) return;
    if (classOptions.includes(requested)) {
      setValues((prev) => ({ ...prev, desiredClass: requested }));
    }
  }, [searchParams]);

  // 送信完了時に完了メッセージへフォーカスを移す（読み上げ対応）
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // 入力し直したらエラー表示を消す
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof ContactFormValues) => {
    const message = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: message ?? undefined }));
  };

  /** 全項目を検証する。問題がなければ true */
  const validateAll = (): boolean => {
    const next: Errors = {};
    (Object.keys(fieldLabels) as (keyof ContactFormValues)[]).forEach(
      (field) => {
        if (field === "formCode") return;
        const message = validateField(field, values[field]);
        if (message) next[field] = message;
      },
    );
    setErrors(next);

    // 最初のエラー項目までスクロールする
    const firstError = Object.keys(next)[0];
    if (firstError) {
      document
        .getElementById(firstError)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
      document.getElementById(firstError)?.focus({ preventScroll: true });
    }

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 二重送信防止
    if (submitting.current || status === "submitting" || status === "success") {
      return;
    }

    setFormError(null);
    if (!validateAll()) return;

    submitting.current = true;
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      } | null;

      if (response.ok && result?.ok) {
        setStatus("success");
        return;
      }

      if (result?.fieldErrors) setErrors(result.fieldErrors as Errors);
      setFormError(
        result?.message ??
          "送信に失敗しました。お手数ですが、もう一度お試しください。",
      );
      setStatus("error");
    } catch {
      setFormError(
        "通信エラーが発生しました。通信環境をご確認のうえ、もう一度お試しください。",
      );
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  // ---- 送信完了画面 ----
  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-sky-200 bg-sky-50 p-8 text-center sm:p-12"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-brand">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12.5 4.5 4.5L19 7" />
          </svg>
        </span>

        <h2 className="mt-6 text-xl font-bold text-navy-800 sm:text-2xl">
          お問い合わせありがとうございます。
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          内容を確認後、担当者よりご連絡いたします。
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          {siteConfig.contact.replyNote}
          <br />
          数日経っても返信が届かない場合は、迷惑メールフォルダをご確認ください。
        </p>

        <div className="mt-8 grid gap-3 sm:mx-auto sm:max-w-md">
          <Link
            href="/"
            className="flex min-h-[52px] items-center justify-center rounded-xl bg-navy-800 px-6 text-[15px] font-bold text-white transition-colors hover:bg-navy-700"
          >
            トップページに戻る
          </Link>
          <Link
            href="/classes"
            className="flex min-h-[52px] items-center justify-center rounded-xl border-2 border-navy-800 bg-white px-6 text-[15px] font-bold text-navy-800 transition-colors hover:bg-navy-50"
          >
            クラスをもう一度見る
          </Link>
        </div>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* 送信エラー表示 */}
      {formError && (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <svg
            viewBox="0 0 24 24"
            className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
          <p className="text-sm leading-relaxed text-red-800">{formError}</p>
        </div>
      )}

      <Field
        id="name"
        label={fieldLabels.name}
        required
        error={errors.name}
        hint="例：井口 太郎"
      >
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          maxLength={MAX.name}
          autoComplete="name"
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field
        id="nameKana"
        label={fieldLabels.nameKana}
        required
        error={errors.nameKana}
        hint="例：イグチ タロウ（カタカナ）"
      >
        <input
          id="nameKana"
          name="nameKana"
          type="text"
          value={values.nameKana}
          onChange={(e) => update("nameKana", e.target.value)}
          onBlur={() => handleBlur("nameKana")}
          maxLength={MAX.nameKana}
          disabled={isSubmitting}
          aria-invalid={!!errors.nameKana}
          aria-describedby={errors.nameKana ? "nameKana-error" : undefined}
          className={inputClass(!!errors.nameKana)}
        />
      </Field>

      <Field
        id="email"
        label={fieldLabels.email}
        required
        error={errors.email}
        hint="返信先となります。お間違いのないようご入力ください。"
      >
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          maxLength={MAX.email}
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field
        id="tel"
        label={fieldLabels.tel}
        required
        error={errors.tel}
        hint="例：090-1234-5678"
      >
        <input
          id="tel"
          name="tel"
          type="tel"
          inputMode="tel"
          value={values.tel}
          onChange={(e) => update("tel", e.target.value)}
          onBlur={() => handleBlur("tel")}
          maxLength={MAX.tel}
          autoComplete="tel"
          disabled={isSubmitting}
          aria-invalid={!!errors.tel}
          aria-describedby={errors.tel ? "tel-error" : undefined}
          className={inputClass(!!errors.tel)}
        />
      </Field>

      <Field
        id="grade"
        label={fieldLabels.grade}
        required
        error={errors.grade}
        hint="例：中学2年生 / 高校1年生 / 小学5年生 / 42歳"
      >
        <input
          id="grade"
          name="grade"
          type="text"
          value={values.grade}
          onChange={(e) => update("grade", e.target.value)}
          onBlur={() => handleBlur("grade")}
          maxLength={MAX.grade}
          disabled={isSubmitting}
          aria-invalid={!!errors.grade}
          aria-describedby={errors.grade ? "grade-error" : undefined}
          className={inputClass(!!errors.grade)}
        />
      </Field>

      <Field
        id="experience"
        label={fieldLabels.experience}
        required
        error={errors.experience}
      >
        <select
          id="experience"
          name="experience"
          value={values.experience}
          onChange={(e) => update("experience", e.target.value)}
          onBlur={() => handleBlur("experience")}
          disabled={isSubmitting}
          aria-invalid={!!errors.experience}
          aria-describedby={errors.experience ? "experience-error" : undefined}
          className={inputClass(!!errors.experience)}
        >
          <option value="">選択してください</option>
          {experienceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="desiredClass"
        label={fieldLabels.desiredClass}
        required
        error={errors.desiredClass}
        hint="迷っている場合は「まだ決めていない / 相談したい」をお選びください。"
      >
        <select
          id="desiredClass"
          name="desiredClass"
          value={values.desiredClass}
          onChange={(e) => update("desiredClass", e.target.value)}
          onBlur={() => handleBlur("desiredClass")}
          disabled={isSubmitting}
          aria-invalid={!!errors.desiredClass}
          aria-describedby={
            errors.desiredClass ? "desiredClass-error" : undefined
          }
          className={inputClass(!!errors.desiredClass)}
        >
          <option value="">選択してください</option>
          {classOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label={fieldLabels.message}
        required
        error={errors.message}
        hint={`ご質問・見学や体験のご希望などをご記入ください。（${MAX.message}文字以内）`}
      >
        <textarea
          id="message"
          name="message"
          rows={7}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          maxLength={MAX.message}
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass(!!errors.message), "min-h-[160px] resize-y py-3")}
        />
        <p className="mt-1 text-right text-xs text-slate-400">
          {values.message.length} / {MAX.message}
        </p>
      </Field>

      {/* 迷惑メール対策：人間には見えない項目（bot が入力すると送信されません） */}
      <div
        aria-hidden="true"
        className="absolute h-px w-px overflow-hidden [clip-path:inset(50%)]"
      >
        <label htmlFor="formCode">会社名（入力しないでください）</label>
        <input
          id="formCode"
          name="formCode"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.formCode}
          onChange={(e) => update("formCode", e.target.value)}
        />
      </div>

      {/* 送信ボタン */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl bg-sky-brand px-8 text-base font-bold text-white shadow-lg shadow-sky-brand/20 transition-all hover:bg-sky-brand-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none disabled:active:scale-100"
        >
          {isSubmitting ? (
            <>
              <Spinner />
              送信中...
            </>
          ) : (
            <>
              この内容で送信する
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </>
          )}
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
          ご記入いただいた個人情報は、お問い合わせへの回答および
          <br className="hidden sm:block" />
          スクールからのご案内以外の目的では使用いたしません。
        </p>
      </div>
    </form>
  );
}

/** 入力欄の共通スタイル（タップしやすい高さを確保） */
function inputClass(hasError: boolean) {
  return cn(
    "w-full min-h-[52px] rounded-xl border-2 bg-white px-4 text-base text-navy-900 transition-colors",
    "placeholder:text-slate-400 focus:outline-none",
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-navy-100 focus:border-sky-brand",
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex flex-wrap items-center gap-2 text-[15px] font-bold text-navy-800"
      >
        {label}
        {required ? (
          <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            必須
          </span>
        ) : (
          <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
            任意
          </span>
        )}
      </label>

      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}

      <div className="mt-2">{children}</div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 animate-spin"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
