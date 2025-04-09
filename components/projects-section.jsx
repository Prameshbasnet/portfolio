import { AsciiArt } from "@/components/ascii-art"

export function ProjectsSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="projects" />

      <div className="space-y-6">
        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Online Digital Member Onboarding Solution (EFCU)</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
 +-------------+     +----------------+     +----------------+
 | User        |---->| Authentication |---->| Account        |
 | Interface   |     | (AWS Cognito)  |     | Creation       |
 +-------------+     +----------------+     +----------------+
       |                    |                      |
       |                    v                      |
       |             +--------------+              |
       +------------>| Document     |<-------------+
                     | Processing   |
                     +--------------+
                            |
                            v
                     +---------------+
                     | Loan          |
                     | Application   |
                     +---------------+
`}
          </pre>
          <p className="text-sm mb-2">
            A comprehensive online platform enabling users to open accounts and apply for loans (individual and
            business). Built with secure authentication using AWS Cognito and seamless file storage via AWS S3.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: .NET, Next.js, AWS Cognito, AWS S3, Twilio, DocuSign
          </p>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Prabhu Budget Management System (PBM)</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
 +-------------+     +----------------+     +----------------+
 | React       |---->| .NET API       |---->| PostgreSQL     |
 | Dashboard   |     | Backend        |     | Database       |
 +-------------+     +----------------+     +----------------+
       |                    |                      |
       v                    v                      v
 +-------------+     +--------------+      +----------------+
 | Budget      |     | Financial    |      | Reporting      |
 +-------------+     +--------------+      +----------------+
`}
          </pre>
          <p className="text-sm mb-2">
            Developed robust backend systems for budget tracking and financial management with an intuitive React
            dashboard for budget visualization and administration.
          </p>
          <p className="text-xs text-muted-foreground mb-2">Technologies: .NET, React, PostgreSQL</p>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Kiosk Application</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
 +-------------+     +----------------+     +----------------+
 | Flutter     |---->| Self-Service   |---->| Account        |
 | Windows App |     | Features       |     | Management     |
 +-------------+     +----------------+     +----------------+
       |                                            |
       v                                            v
 +-------------+                            +----------------+
 | Cheque      |                            | React Admin    |
 | Deposit     |                            | Dashboard      |
 +-------------+                            +----------------+
`}
          </pre>
          <p className="text-sm mb-2">
            A self-service kiosk application for cheque deposit, account statements, and account management, with a
            React-based admin dashboard for operational oversight.
          </p>
          <p className="text-xs text-muted-foreground mb-2">Technologies: Flutter, React</p>
        </div>
      </div>
    </div>
  )
}
