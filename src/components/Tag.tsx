/* Reusable tag/pill component used on project cards and case study sidebar */
interface TagProps {
  label: string
  textColor: string
  borderColor: string
}

export default function Tag({ label, textColor, borderColor }: TagProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        padding: '5px 13px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '500',
        border: `1px solid ${borderColor}`,
        color: textColor,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
