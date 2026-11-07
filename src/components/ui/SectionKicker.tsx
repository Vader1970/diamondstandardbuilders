type SectionKickerProps = {
  label: string;
  index: string;
  tone?: "light" | "dark";
};

export function SectionKicker({ label, index, tone = "light" }: SectionKickerProps) {
  return (
    <div className={tone === "dark" ? "ds-kicker ds-kicker-dark" : "ds-kicker"}>
      <div data-reveal="line" className="ds-kicker-line" />
      <div className="ds-kicker-row">
        <span>{label}</span>
        <span className="ds-num">{index}</span>
      </div>
    </div>
  );
}
