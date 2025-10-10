import { Linkedin, Github, X } from "lucide-react";
import { PulseGuardLogo } from "./Icons";

const Footer = () => (
  <footer className="border-t border-slate-600/50 text-slate-300 relative bg-slate-900/30">
    <div className="max-w-7xl mx-auto py-12 border-x border-slate-600/50">
      <div className="grid md:grid-cols-3 gap-8 mb-8 px-6">
        <div className="space-y-4">
          <PulseGuardLogo />
          <p className="text-sm leading-relaxed text-slate-400">
            Full-Stack observability platform for modern applications.
          </p>
        </div>

        {[
          {
            title: "Product",
            links: [
              { title: "Features", link: "#features" },
              { title: "Pricing", link: "#pricing" },
              { title: "Integrations", link: "#integrations" },
            ],
          },
          {
            title: "Resources",
            links: [
              { title: "Blog", link: "https://mezieiv.vercel.app/blog" },
              { title: "About", link: "/about" },
              {
                title: "Documentation",
                link: "https://github.com/Vic-Orlands/pulseguard-app#readme",
              },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="space-y-4 ml-auto text-right">
            <h4 className="font-semibold text-slate-100">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.link}
                    className="hover:text-slate-100 transition-colors duration-200 text-sm text-slate-400"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 px-6 border-t border-slate-600/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} PulseGuard. All rights reserved.
        </p>

        <div className="flex items-center space-x-6">
          {[
            {
              href: "https://github.com/Vic-Orlands/pulseguard",
              icon: Github,
              label: "GitHub",
            },
            {
              href: "https://www.linkedin.com/in/victor-innocent/",
              icon: Linkedin,
              label: "LinkedIn",
            },
            { href: "https://x.com/MezieIV", icon: X, label: "Twitter" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              <social.icon className="h-5 w-5" />
              <span className="sr-only">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
