import { AsciiArt } from "@/components/ascii-art"

export function ExperienceSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="experience" />

      <div className="space-y-6">
        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">Software Engineer</h3>
            <p className="text-xs text-muted-foreground">General Technology, Nepal | August 2024 - Present</p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>Developed backend and dashboard for Prabhu Budget Management System using .NET and React</li>
            <li>
              Delivered Online Digital Member Onboarding Solution for EFCU, integrating AWS, Twilio, and DocuSign for
              secure account opening and loan applications
            </li>
            <li>Implemented robust authentication mechanisms and secure file storage solutions using AWS services</li>
          </ul>
        </div>

        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">Internship</h3>
            <p className="text-xs text-muted-foreground">General Technology, Nepal | March 2024 - August 2024</p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>
              Developed a kiosk application using Flutter for Windows, enabling features like cheque deposit, account
              statements, and old-to-new account number migration
            </li>
            <li>
              Created an admin dashboard for the kiosk using React, streamlining system management and reporting
              functionalities
            </li>
            <li>Gained experience in translating business requirements into scalable and efficient solutions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

