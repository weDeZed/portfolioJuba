type Props = {
    title: string
    description: string
    imageUrl: string
    link: string
  }
  
  export default function ProjectCard({ title, description, imageUrl, link }: Props) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: '#FFFFFF', color: '#0A1828' }}
      >
        <img src={imageUrl} alt={title} className="w-full h-48 sm:h-56 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#178582' }}>
            {title}
          </h3>
          <p className="text-sm sm:text-base">{description}</p>
        </div>
      </a>
    )
  }
  