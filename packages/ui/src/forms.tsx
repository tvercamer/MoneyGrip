import {Search} from "lucide-react";
import {
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  useId,
  useState,
} from "react";
import styles from "./styles.module.css";
import {cx} from "./utils";

export interface FormFieldProps {
    children: ReactNode;
    className?: string | undefined;
    description?: ReactNode;
    error?: ReactNode;
    hideLabel?: boolean | undefined;
    label: ReactNode;
    labelFor: string;
    optionalText?: ReactNode;
}

export function FormField({
                              children,
                              className,
                              description,
                              error,
                              hideLabel = false,
                              label,
                              labelFor,
                              optionalText,
                          }: FormFieldProps) {
    return (
        <div className={cx(styles.formField, className)}>
            <div className={cx(styles.fieldLabelRow, hideLabel && styles.visuallyHidden)}>
                <label className={styles.fieldLabel} htmlFor={labelFor}>
                    {label}
                </label>
                {optionalText ? <span className={styles.optionalText}>{optionalText}</span> : null}
            </div>
            {children}
            {description ? (
                <div className={styles.fieldDescription} id={`${labelFor}-description`}>
                    {description}
                </div>
            ) : null}
            {error ? (
                <div className={styles.fieldError} id={`${labelFor}-error`} role="alert">
                    {error}
                </div>
            ) : null}
        </div>
    );
}

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "size"> {
    description?: ReactNode;
    error?: ReactNode;
    hideLabel?: boolean;
    inputClassName?: string;
    label: ReactNode;
    optionalText?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
}

export function TextField({
                              className,
                              description,
                              error,
                              hideLabel,
                              id: providedId,
                              inputClassName,
                              label,
                              optionalText,
                              prefix,
                              suffix,
                              ...props
                          }: TextFieldProps) {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const describedBy = [description && `${id}-description`, error && `${id}-error`].filter(Boolean).join(" ");

    return (
        <FormField
            className={className}
            description={description}
            error={error}
            hideLabel={hideLabel}
            label={label}
            labelFor={id}
            optionalText={optionalText}
        >
            <div className={cx(styles.inputFrame, Boolean(error) && styles.inputFrameError)}>
                {prefix ? <span className={styles.inputAffix}>{prefix}</span> : null}
                <input
                    aria-describedby={describedBy || undefined}
                    aria-invalid={error ? true : undefined}
                    className={cx(styles.input, inputClassName)}
                    id={id}
                    {...props}
                />
                {suffix ? <span className={styles.inputAffix}>{suffix}</span> : null}
            </div>
        </FormField>
    );
}

export type NumberFieldProps = Omit<TextFieldProps, "type">;

export function NumberField(props: NumberFieldProps) {
    return <TextField inputMode="decimal" type="number" {...props} />;
}

export interface CurrencyFieldProps extends Omit<TextFieldProps, "prefix" | "type"> {
    currency?: string;
}

export function CurrencyField({currency = "EUR", ...props}: CurrencyFieldProps) {
    return <TextField inputMode="decimal" prefix={currency} type="text" {...props} />;
}

export type PercentageFieldProps = Omit<TextFieldProps, "suffix" | "type">;

export function PercentageField(props: PercentageFieldProps) {
    return <TextField inputMode="decimal" suffix="%" type="text" {...props} />;
}

export type SearchFieldProps = Omit<TextFieldProps, "prefix" | "type">;

export function SearchField(props: SearchFieldProps) {
    return <TextField prefix={<Search aria-hidden="true" size={16}/>} type="search" {...props} />;
}

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    description?: ReactNode;
    error?: ReactNode;
    hideLabel?: boolean;
    label: ReactNode;
    optionalText?: ReactNode;
}

export function TextareaField({
                                  className,
                                  description,
                                  error,
                                  hideLabel,
                                  id: providedId,
                                  label,
                                  optionalText,
                                  ...props
                              }: TextareaFieldProps) {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const describedBy = [description && `${id}-description`, error && `${id}-error`].filter(Boolean).join(" ");
    return (
        <FormField
            className={className}
            description={description}
            error={error}
            hideLabel={hideLabel}
            label={label}
            labelFor={id}
            optionalText={optionalText}
        >
      <textarea
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={cx(styles.textarea, Boolean(error) && styles.inputFrameError)}
          id={id}
          {...props}
      />
        </FormField>
    );
}

export interface SelectOption {
    disabled?: boolean;
    label: ReactNode;
    value: string;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    description?: ReactNode;
    error?: ReactNode;
    hideLabel?: boolean;
    label: ReactNode;
    options: SelectOption[];
    optionalText?: ReactNode;
    placeholder?: string;
}

export function SelectField({
                                className,
                                description,
                                error,
                                hideLabel,
                                id: providedId,
                                label,
                                options,
                                optionalText,
                                placeholder,
                                ...props
                            }: SelectFieldProps) {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    return (
        <FormField
            className={className}
            description={description}
            error={error}
            hideLabel={hideLabel}
            label={label}
            labelFor={id}
            optionalText={optionalText}
        >
            <select
                aria-describedby={description ? `${id}-description` : undefined}
                aria-invalid={error ? true : undefined}
                className={cx(styles.select, Boolean(error) && styles.inputFrameError)}
                id={id}
                {...props}
            >
                {placeholder ? (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                ) : null}
                {options.map((option) => (
                    <option disabled={option.disabled} key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </FormField>
    );
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    description?: ReactNode;
    label: ReactNode;
}

export function Checkbox({className, description, id: providedId, label, ...props}: CheckboxProps) {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    return (
        <div className={cx(styles.checkField, className)}>
            <input className={styles.checkbox} id={id} type="checkbox" {...props} />
            <div>
                <label className={styles.checkLabel} htmlFor={id}>
                    {label}
                </label>
                {description ? <div className={styles.fieldDescription}>{description}</div> : null}
            </div>
        </div>
    );
}

export interface RadioOption {
    description?: ReactNode;
    disabled?: boolean;
    label: ReactNode;
    value: string;
}

export interface RadioGroupProps {
    label: ReactNode;
    name: string;
    onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
    options: RadioOption[];
    value?: string;
}

export function RadioGroup({label, name, onChange, options, value}: RadioGroupProps) {
    const groupId = useId();
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.fieldLabel}>{label}</legend>
            <div className={styles.radioGroup}>
                {options.map((option, index) => {
                    const id = `${groupId}-${index}`;
                    return (
                        <div className={styles.checkField} key={option.value}>
                            <input
                                checked={value === option.value}
                                className={styles.radio}
                                disabled={option.disabled}
                                id={id}
                                name={name}
                                onChange={onChange}
                                type="radio"
                                value={option.value}
                            />
                            <div>
                                <label className={styles.checkLabel} htmlFor={id}>
                                    {option.label}
                                </label>
                                {option.description ?
                                    <div className={styles.fieldDescription}>{option.description}</div> : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        </fieldset>
    );
}

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    description?: ReactNode;
    label: ReactNode;
}

export function Switch({
                           checked,
                           className,
                           defaultChecked = false,
                           description,
                           id: providedId,
                           label,
                           onChange,
                           ...props
                       }: SwitchProps) {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const [internalChecked, setInternalChecked] = useState(Boolean(defaultChecked));
    const isChecked = checked ?? internalChecked;
    return (
        <div className={cx(styles.switchField, className)}>
            <div>
                <label className={styles.checkLabel} htmlFor={id}>
                    {label}
                </label>
                {description ? <div className={styles.fieldDescription}>{description}</div> : null}
            </div>
            <input
                aria-checked={isChecked}
                checked={isChecked}
                className={styles.switch}
                id={id}
                onChange={(event) => {
                    if (checked === undefined) setInternalChecked(event.currentTarget.checked);
                    onChange?.(event);
                }}
                role="switch"
                type="checkbox"
                {...props}
            />
        </div>
    );
}
