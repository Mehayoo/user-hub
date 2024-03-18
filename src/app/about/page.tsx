import './style.scss'

export default function About() {
	return (
		<article className="readme">
			<header>
				<h1>UserHub Record Management App</h1>
				<p>
					This app showcases a blend of modern web technologies and
					best practices, emphasizing a strongly typed and secure
					approach to web development.
				</p>
			</header>

			<section className="sectionFormat">
				<h2>Key Features</h2>
				<ul>
					<li>
						<strong>CRUD Operations</strong>: View, create, edit,
						and delete user records directly from a responsive data
						table.
					</li>
					<li>
						<strong>Tech Stack</strong>: Built with Next.js, React,
						TypeScript, Ant Design (AntD), React Hook Form, Recoil,
						and Prisma, ensuring a type-safe and robust application.
					</li>
					<li>
						<strong>Dynamic Data Fetching</strong>: Leverages
						Next.js&apos;s Server-Side Generation (SSG) with
						on-demand cache revalidation for up-to-date data
						presentation without sacrificing performance.
					</li>
					<li>
						<strong>State Management</strong>: Utilizes Recoil for
						efficient global state management across the app,
						enabling dynamic updates and consistent state across
						components.
					</li>
					<li>
						<strong>Form Handling and Validation</strong>:
						Integrates React Hook Form with AntD for fluid form
						experiences and employs Yup and Zod for comprehensive
						client and server-side validation.
					</li>
					<li>
						<strong>Server Actions</strong>: Employs Next.js server
						actions for server-side data processing and validation,
						ensuring data integrity and security.
					</li>
					<li>
						<strong>Session Storage</strong>: Retains query
						parameters (like sorting, pagination, and filters) in
						session storage for a persistent user experience across
						page refreshes and navigation.
					</li>
					<li>
						<strong>Relational Data Modeling</strong>: Features a
						relational database design with Prisma, modeling users
						and countries with a many-to-one relationship.
					</li>
					<li>
						<strong>Type Safety</strong>: Enforces a strongly typed
						codebase using TypeScript, enhancing code reliability
						and maintainability.
					</li>
					<li>
						<strong>User-Friendly UI</strong>: Offers an ergonomic
						and intuitive user interface, designed with AntD
						components for a seamless user experience.
					</li>
					<li>
						<strong>Notification System</strong>: Integrates a
						real-time notification system, providing immediate
						visual feedback for user actions, enhancing the
						interactive experience.
					</li>
				</ul>
			</section>

			<section className="sectionFormat">
				<h2>Getting Started</h2>
				<p>
					This app is pre-seeded with sample data for immediate
					exploration. Upon the first launch, it checks for the
					presence of the SQLite database; if absent, it seeds the
					database with initial data, providing a ready-to-use setup.
				</p>

				<h3>Installation Instructions</h3>

				<ol>
					<li>Clone the repository to your local machine.</li>
					<li>
						Navigate to the project directory and run{' '}
						<code>npm install</code> to install all required
						dependencies.
					</li>
					<li>
						To start the app in development mode, run{' '}
						<code>npm run dev</code>. This allows for hot reloading
						and immediate feedback on code changes.
					</li>
					<li>
						For a more production-like experience, it is encouraged
						to build the app and run it in production mode. To do
						this, first build the app using{' '}
						<code>npm run build</code>.
					</li>
					<li>
						Once the build process is complete, start the app in
						production mode by running <code>npm run start</code>.
					</li>
					<li>
						While in production mode, inspect which routes are
						dynamically generated and which are statically generated
						for a comprehensive understanding of the app&apos;s
						rendering behavior.
					</li>
				</ol>

				<div className="important">
					<strong>IMPORTANT</strong>
				</div>

				<p>
					If any error is received when first trying to run the app
					with <code>npm install</code>, <code>npm run build</code>,{' '}
					<code>npm run start</code>, then you might need to configure
					the prisma client.
				</p>

				<ol>
					<li>
						Copy{' '}
						<strong>
							<em>schema.prisma</em>
						</strong>{' '}
						from the{' '}
						<strong>
							<em>/prisma</em>
						</strong>{' '}
						folder anywhere outside the project folder.
					</li>
					<li>
						Delete the{' '}
						<strong>
							<em>/prisma</em>
						</strong>{' '}
						folder.
					</li>
					<li>
						Run{' '}
						<code>
							npx prisma init --datasource-provider sqlite
						</code>{' '}
						command.
					</li>
					<li>
						Replace the newly generated{' '}
						<strong>
							<em>schema.prisma</em>
						</strong>{' '}
						file from the{' '}
						<strong>
							<em>/prisma</em>
						</strong>{' '}
						folder with the old{' '}
						<strong>
							<em>schema.prisma</em>
						</strong>{' '}
						file (this is where the entities are located).
					</li>
					<li>
						Run <code>npx prisma migrate dev</code> and give it a
						name.
					</li>
					<li>
						Run <code>npm run dev</code> for development mode or{' '}
						<code>npm run build</code> and{' '}
						<code>npm run start</code> for production mode.
					</li>
				</ol>
			</section>

			<section className="sectionFormat">
				<h2>Key Technologies</h2>
				<ul>
					<li>
						<strong>Frontend</strong>: React, Next.js (App router),
						AntD, React Hook Form, Recoil
					</li>
					<li>
						<strong>Backend</strong>: Next.js API routes, Prisma ORM
					</li>
					<li>
						<strong>Database</strong>: SQLite for ease of use and
						quick setup
					</li>
					<li>
						<strong>Validation</strong>: Yup (client-side), Zod
						(server-side)
					</li>
					<li>
						<strong>Styling</strong>: Styling is mostly done through
						AntD&apos;s component base. Since the implication in
						actual styling was minimal, inline styles were used in
						favor of scss files
					</li>
				</ul>
			</section>

			<section className="sectionFormat">
				<h2>Special Features</h2>
				<ul>
					<li>
						<strong>Dynamic and Static Rendering</strong>: Combines
						the best of both worlds by using SSG for initial page
						loads and React&apos;s client-side capabilities for
						dynamic updates.
					</li>
					<li>
						<strong>Session Persistence</strong>: Manages session
						storage to maintain user state across the app, providing
						a consistent and reliable user experience.
					</li>
					<li>
						<strong>Adaptive URL Management</strong>: Dynamically
						updates URLs with query parameters reflecting the
						current app state, offering clear navigation cues to the
						user.
					</li>
					<li>
						<strong>Adaptable Codebase</strong>: Demonstrates best
						practices in web development, with a focus on
						adaptability, scalability, and maintainability.
					</li>
				</ul>
			</section>

			<footer>
				<div className="important">
					<strong>IMPORTANT</strong>
				</div>

				<h2>Intellectual Property</h2>
				<p>
					This app is my intellectual property,{' '}
					<strong>
						<em>Mihaiu Sorin-Ionut</em>
					</strong>{' '}
					and serves as a demonstration of my professional skills,
					adaptability, and commitment to delivering high-quality
					software solutions. It showcases modern web development
					practices, emphasizing type safety, user experience, and
					robust architecture.
				</p>
			</footer>
		</article>
	)
}
