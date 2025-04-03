import { AsciiArt } from "@/components/ascii-art"

export function AboutSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="about" />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/5">
          <div className="p-4 border border-primary/30 rounded bg-primary/5">
            <pre className="text-xs text-primary/80 font-mono">
              {`
____                               _     
|  _ \\ _ __ __ _ _ __ ___   ___  __| |___ 
| |_) | '__/ _\` | '_ \` _ \\ / _ \\/ _\` / __|
|  __/| | | (_| | | | | | |  __/ (_| \\__ \\
|_|   |_|  \\__,_|_| |_| |_|\\___|\\__,_|___/
                                         
____                          _   
| __ )  __ _ ___ _ __   ___  _| |_ 
|  _ \\ / _\` / __| '_ \\ / _ \\/ _\` |
| |_) | (_| \\__ \\ | | |  __/ (_| |
|____/ \\__,_|___/_| |_|\\___|\\__,_|
                                 
`}
            </pre>
            <div className="text-center text-xs text-muted-foreground mt-2">
              Pramesh Basnet
              <br />
              <span className="text-primary/60">Software Developer</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 md:w-3/5">
          <p>
            Hello! I'm Pramesh Basnet, a proactive software developer with experience in delivering full-stack solutions
            across .NET, React, Flutter, and AWS.
          </p>

          <p>
            I specialize in creating scalable, user-focused applications that optimize business workflows and enhance
            user experience.
          </p>

          <div className="mt-2 p-3 border border-primary/20 rounded bg-primary/5">
            <h3 className="text-primary font-bold mb-2">Technical Focus:</h3>
            <div className="space-y-2 text-sm">
              <p>
                My development approach centers on delivering full-stack solutions across .NET, React, Flutter, and AWS
                that optimize business workflows and enhance user experience.
              </p>

              <p>
                I'm particularly experienced in financial technology solutions, having worked on budget management
                systems and digital onboarding platforms for credit unions.
              </p>

              <p>
                I enjoy translating complex business requirements into scalable, efficient solutions that provide real
                value to users and organizations.
              </p>
            </div>
          </div>

          <div className="mt-2 p-3 border border-primary/20 rounded bg-primary/5">
            <h3 className="text-primary font-bold mb-2">Quick Facts:</h3>
            <ul className="space-y-1">
              <li>
                <span className="text-muted-foreground">Location:</span> Balkumari, Lalitpur, Nepal
              </li>
              <li>
                <span className="text-muted-foreground">Education:</span> Bachelor in Computer Application, Tribhuvan
                University
              </li>
              <li>
                <span className="text-muted-foreground">Specialty:</span> Full-stack Development, Cloud Solutions
              </li>
              <li>
                <span className="text-muted-foreground">Focus:</span> .NET, React, Flutter, AWS
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

