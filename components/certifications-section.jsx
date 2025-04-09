import { AsciiArt } from "@/components/ascii-art"
import { Award, Trophy, Code } from "lucide-react"

export function CertificationsSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="certifications" />

      <div className="space-y-6">
        <div>
          <h3 className="text-primary font-bold mb-2 flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Additional Skills
          </h3>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <div>
                <p className="font-medium">API Development</p>
                <p className="text-xs text-muted-foreground">RESTful API design and implementation</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <div>
                <p className="font-medium">Third-party Integrations</p>
                <p className="text-xs text-muted-foreground">Experience with Twilio, DocuSign, and payment gateways</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <div>
                <p className="font-medium">Agile Development</p>
                <p className="text-xs text-muted-foreground">Scrum and Kanban methodologies</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2 flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            Professional Development
          </h3>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>AWS Cloud Practitioner (In Progress)</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>Microsoft Certified: Azure Fundamentals (Planned)</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>Flutter Development Bootcamp</p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2 flex items-center">
            <Code className="h-4 w-4 mr-2" />
            Technical Interests
          </h3>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>Cloud-native application development</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>Fintech solutions and banking applications</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>Cross-platform mobile development</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>Microservices architecture</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
