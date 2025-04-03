"use client"

export function ImageAsciiLogo() {
  return (
    <div className="bg-black p-2 font-mono text-white">
      <pre className="text-white whitespace-pre overflow-x-auto text-xs sm:text-sm md:text-base">
        {`
$ echo "PRAMESH BASNET"
PRAMESH BASNET

$ whoami
pramesh@developer

$ pwd
C:\\Users\\pramesh

$ dir
 Volume in drive C has no label.
 Volume Serial Number is 1234-5678

 Directory of C:\\Users\\pramesh

about  education  skills  experience  projects  certifications  contact
`}
      </pre>
    </div>
  )
}

