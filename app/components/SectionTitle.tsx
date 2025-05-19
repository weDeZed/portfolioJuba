// components/SectionTitle.tsx
export default function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {children}
      </h2>
    )
  }
  