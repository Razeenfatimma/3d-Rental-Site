// FormInput.jsx
// Luxury Soft form input styled for the Cream + Blush Terracotta-Rose + Charcoal design system.

export default function FormInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows,
}) {
  const isTextarea = type === 'textarea';

  return (
    <div className="mb-3 text-start">
      <label htmlFor={id} className="form-label luxury-form-label">
        {label} {required && <span style={{ color: '#d28574' }}>*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows || 3}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`form-control luxury-form-control${error ? ' is-invalid' : ''}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`form-control luxury-form-control${error ? ' is-invalid' : ''}`}
        />
      )}

      {error && (
        <div id={`${id}-error`} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
}
