"use client"

import { useState, useEffect } from "react"
import { AsciiArt } from "@/components/ascii-art"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export function SecurityScanSection() {
  const [scanning, setScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [vulnerabilities, setVulnerabilities] = useState([])

  const scanSteps = [
    "Initializing security scan...",
    "Checking for outdated software...",
    "Scanning for open ports...",
    "Analyzing network configurations...",
    "Checking for common vulnerabilities...",
    "Testing web application security...",
    "Analyzing authentication mechanisms...",
    "Checking for encryption protocols...",
    "Scanning for malware signatures...",
    "Finalizing security report...",
  ]

  const mockVulnerabilities = [
    {
      severity: "high",
      title: "Outdated SSL/TLS Version",
      description: "The server is using an outdated SSL/TLS version that has known vulnerabilities.",
      recommendation: "Upgrade to TLS 1.3 and disable older protocols.",
    },
    {
      severity: "medium",
      title: "Insecure HTTP Headers",
      description: "Missing security headers such as Content-Security-Policy and X-XSS-Protection.",
      recommendation: "Implement recommended security headers on all web servers.",
    },
    {
      severity: "low",
      title: "Information Disclosure",
      description: "Server is revealing version information in HTTP responses.",
      recommendation: "Configure servers to hide version information in responses.",
    },
    {
      severity: "high",
      title: "Open Port 3389 (RDP)",
      description: "Remote Desktop Protocol port is open and accessible from the internet.",
      recommendation: "Restrict RDP access using a VPN or firewall rules.",
    },
    {
      severity: "medium",
      title: "Weak Password Policy",
      description: "Password policy does not enforce sufficient complexity requirements.",
      recommendation: "Implement a stronger password policy with MFA.",
    },
  ]

  const startScan = () => {
    setScanning(true)
    setScanComplete(false)
    setCurrentStep(0)
    setVulnerabilities([])
  }

  useEffect(() => {
    if (scanning && currentStep < scanSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 800)

      return () => clearTimeout(timer)
    } else if (scanning && currentStep === scanSteps.length) {
      setVulnerabilities(mockVulnerabilities)
      setScanComplete(true)
      setScanning(false)
    }
  }, [scanning, currentStep])

  return (
    <div className="space-y-4">
      <AsciiArt art="scan" />

      <div className="p-4 border border-primary/30 rounded bg-primary/5">
        <h3 className="text-primary font-bold mb-2 flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          Security Vulnerability Scanner
        </h3>

        {!scanning && !scanComplete && (
          <div>
            <p className="text-sm mb-4">
              Run a simulated security scan to identify potential vulnerabilities in your system.
            </p>
            <Button
              onClick={startScan}
              className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
            >
              Start Security Scan
            </Button>
          </div>
        )}

        {scanning && (
          <div className="space-y-2">
            <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / scanSteps.length) * 100}%` }}
              />
            </div>

            <div className="space-y-1 mt-2">
              {scanSteps.slice(0, currentStep).map((step, index) => (
                <div key={index} className="flex items-center text-xs">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  <span>{step}</span>
                </div>
              ))}

              {currentStep < scanSteps.length && (
                <div className="flex items-center text-xs">
                  <div className="h-3 w-3 rounded-full bg-primary/50 animate-pulse mr-2" />
                  <span>{scanSteps[currentStep]}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {scanComplete && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Scan Results</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded">
                  {vulnerabilities.filter((v) => v.severity === "high").length} High
                </span>
                <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded">
                  {vulnerabilities.filter((v) => v.severity === "medium").length} Medium
                </span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-500 rounded">
                  {vulnerabilities.filter((v) => v.severity === "low").length} Low
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {vulnerabilities.map((vuln, index) => (
                <div key={index} className="border border-primary/20 rounded p-3 bg-black/30">
                  <div className="flex items-start justify-between">
                    <h5 className="font-medium flex items-center">
                      {vuln.severity === "high" && <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />}
                      {vuln.severity === "medium" && <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />}
                      {vuln.severity === "low" && <AlertTriangle className="h-4 w-4 text-blue-500 mr-2" />}
                      {vuln.title}
                    </h5>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        vuln.severity === "high"
                          ? "bg-red-500/20 text-red-500"
                          : vuln.severity === "medium"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-blue-500/20 text-blue-500"
                      }`}
                    >
                      {vuln.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs mt-2">{vuln.description}</p>
                  <div className="mt-2 text-xs">
                    <span className="font-medium">Recommendation:</span> {vuln.recommendation}
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={startScan}
              className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
            >
              Run Scan Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

