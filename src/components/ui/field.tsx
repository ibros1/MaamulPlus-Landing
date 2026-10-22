import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface FieldProps {
  id: string;
  label: ReactNode;
  error?: string | undefined;
  hint?: string;
  full?: boolean;
  className?: string;
  children: ReactNode;
}

export const errorId = (id: string) => `${id}-error`;
export const hintId = (id: string) => `${id}-hint`;

/** Label + control + hint + error. Pair with <Input>/<Select>/<Textarea> using the same id. */
export function Field({ id, label, error, hint, full = false, className, children }: FieldProps) {
  return (
    <div className={cn('mp-field', full && 'full', error && 'bad', className)}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint ? (
        <span className="mp-hint" id={hintId(id)}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="err" id={errorId(id)} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

interface ControlA11y {
  id: string;
  invalid?: boolean | undefined;
  hasHint?: boolean | undefined;
}

function a11y({ id, invalid, hasHint }: ControlA11y) {
  const describedBy = [invalid ? errorId(id) : null, hasHint ? hintId(id) : null].filter(Boolean).join(' ');
  return {
    id,
    'aria-invalid': invalid ? true : undefined,
    'aria-describedby': describedBy || undefined,
  } as const;
}

type InputProps = Omit<ComponentPropsWithRef<'input'>, 'id'> & ControlA11y;
export function Input({ id, invalid, hasHint, className, ...props }: InputProps) {
  return <input className={cn('mp-input', className)} {...a11y({ id, invalid, hasHint })} {...props} />;
}

type SelectProps = Omit<ComponentPropsWithRef<'select'>, 'id'> & ControlA11y;
export function Select({ id, invalid, hasHint, className, children, ...props }: SelectProps) {
  return (
    <select className={cn('mp-select', className)} {...a11y({ id, invalid, hasHint })} {...props}>
      {children}
    </select>
  );
}

type TextareaProps = Omit<ComponentPropsWithRef<'textarea'>, 'id'> & ControlA11y;
export function Textarea({ id, invalid, hasHint, className, ...props }: TextareaProps) {
  return <textarea className={cn('mp-textarea', className)} {...a11y({ id, invalid, hasHint })} {...props} />;
}

interface SegmentedRadioProps {
  name: string;
  legend: string;
  options: readonly { value: string; label: string; note?: string }[];
  /** Props from react-hook-form's register(name). */
  inputProps: Omit<ComponentPropsWithRef<'input'>, 'type' | 'value' | 'id'>;
}

/** Two or more large radio cards, as in the demo form's edition picker. */
export function SegmentedRadio({ name, legend, options, inputProps }: SegmentedRadioProps) {
  return (
    <fieldset className="mp-field full seg-field">
      <legend>{legend}</legend>
      <div className="seg">
        {options.map((o) => {
          const id = `${name}-${o.value}`;
          return (
            <span key={o.value} className="seg-item">
              <input type="radio" id={id} value={o.value} {...inputProps} />
              <label htmlFor={id}>
                {o.label}
                {o.note ? <small>{o.note}</small> : null}
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}
