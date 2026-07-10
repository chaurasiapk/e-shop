interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
}

export default function SectionHeader({
  title,
  viewAllHref = "#",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <a
        href={viewAllHref}
        className="text-sm font-medium text-primary hover:underline"
      >
        View All &gt;
      </a>
    </div>
  );
}
