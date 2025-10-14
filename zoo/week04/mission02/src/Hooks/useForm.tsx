import React from "react";

type ErrorsOf<T> = Partial<Record<keyof T, string>>;
type TouchedOf<T> = Partial<Record<keyof T, boolean>>;

export interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => ErrorsOf<T>;
}

export function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
  const [values, setValues] = React.useState<T>(initialValues);
  const [touched, setTouched] = React.useState<TouchedOf<T>>({});
  const [errors, setErrors] = React.useState<ErrorsOf<T>>({});

  const setFieldValue = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFieldValue(name, value);
    // 즉시 검증이 필요하면 아래 한 줄 주석 해제
    // if (validate) setErrors(validate({ ...values, [name]: value }));
  };

  const handleBlur = <K extends keyof T>(name: K) => {
    setTouched((t) => ({ ...t, [name]: true }));
    if (validate) setErrors(validate(values));
  };

  const getInputProps = <K extends keyof T>(name: K) => ({
    name: String(name),
    value: (values[name] ?? "") as unknown as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(name, e.target.value as unknown as T[K]),
    onBlur: () => handleBlur(name),
  });

  const reset = (next?: T) => {
    setValues(next ?? initialValues);
    setTouched({});
    setErrors({});
  };

  const submit = async (onValid: (vals: T) => Promise<void> | void) => {
    const newErrors = validate ? validate(values) : {};
    setErrors(newErrors);
    const hasError = Object.keys(newErrors).length > 0;
    if (!hasError) await onValid(values);
    return !hasError;
  };

  return {
    values,
    errors,
    touched,
    setValues,
    setErrors,
    setTouched,
    setFieldValue,
    handleChange,
    handleBlur,
    getInputProps,
    reset,
    submit,
  };
}
