import React, { useState, useEffect, useRef } from 'react';

type DebouncedInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  value: string | number;
  onChange: (value: string) => void;
  debounce?: number;
};

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onChangeRef.current(value.toString());
      }
    }, debounce);
    
    return () => clearTimeout(timeout);
  }, [value, debounce, initialValue]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

type DebouncedTextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
};

export const DebouncedTextarea: React.FC<DebouncedTextareaProps> = ({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onChangeRef.current(value);
      }
    }, debounce);
    
    return () => clearTimeout(timeout);
  }, [value, debounce, initialValue]);

  return (
    <textarea
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
