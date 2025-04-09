import { AsciiArt } from "@/components/ascii-art"
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react"

export function ContactSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="contact" />

      <div className="space-y-6">
        <div className="flex flex-col gap-3">
          <a
            href="mailto:bpramesh742@gmail.com"
            className="flex items-center text-sm hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4 mr-2 text-primary" />
            bpramesh742@gmail.com
          </a>
          <a href="tel:+9779829579889" className="flex items-center text-sm hover:text-primary transition-colors">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            +977-9829579889
          </a>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            Balkumari, Lalitpur, Nepal
          </div>
          <a
            href="https://www.linkedin.com/in/prameshbasnet1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:text-primary transition-colors"
          >
            <Linkedin className="h-4 w-4 mr-2 text-primary" />
            linkedin.com/in/prameshbasnet1
          </a>
          <a
            href="https://github.com/prameshbasnet1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4 mr-2 text-primary" />
            github.com/prameshbasnet1
          </a>
          <a
            href="https://www.prameshbasnet.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:text-primary transition-colors"
          >
            <Globe className="h-4 w-4 mr-2 text-primary" />
            www.prameshbasnet.com.np
          </a>
        </div>
      </div>
    </div>
  )
}
