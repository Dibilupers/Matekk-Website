const PARTICLES = [
	{ x: 8, y: 14, size: 5, duration: 7.4, delay: -2.1 },
	{ x: 22, y: 38, size: 4, duration: 8.6, delay: -5.3 },
	{ x: 37, y: 19, size: 6, duration: 9.2, delay: -3.7 },
	{ x: 48, y: 72, size: 4, duration: 7.8, delay: -1.4 },
	{ x: 61, y: 31, size: 5, duration: 8.9, delay: -6.2 },
	{ x: 73, y: 60, size: 4, duration: 7.1, delay: -4.4 },
	{ x: 84, y: 18, size: 6, duration: 9.6, delay: -2.8 },
	{ x: 93, y: 47, size: 4, duration: 8.1, delay: -5.7 },
];

export default function ProgramBackgroundParticles({ children, className = "" }) {
	return (
		<section className={`program-particle-hero ${className}`}>
			<div className="program-background-particles" aria-hidden="true">
				{PARTICLES.map((particle) => (
					<span
						key={particle.x}
						className="program-background-particle"
						style={{
							left: `${particle.x}%`,
							top: `${particle.y}%`,
							"--particle-size": `${particle.size}px`,
							"--particle-duration": `${particle.duration}s`,
							"--particle-delay": `${particle.delay}s`,
						}}
					/>
				))}
			</div>
			<div className="program-particle-hero-content">{children}</div>
		</section>
	);
}
