import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Terminal, Settings, Wrench, LifeBuoy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Comprehensive documentation and installation guides for PDZ EXTRA MTA:SA scripts.',
};

export default function DocumentationPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Documentation
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Everything you need to install, configure, and troubleshoot your PDZ EXTRA scripts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <a href="#installation" className="group p-6 rounded-2xl border border-card-border bg-card-bg hover:border-accent/50 transition-all">
            <Terminal className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Installation</h3>
            <p className="text-sm text-muted">Learn how to properly install and start resources on your server.</p>
          </a>
          
          <a href="#configuration" className="group p-6 rounded-2xl border border-card-border bg-card-bg hover:border-accent/50 transition-all">
            <Settings className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Configuration</h3>
            <p className="text-sm text-muted">Customize scripts using our detailed configuration guides.</p>
          </a>

          <a href="#troubleshooting" className="group p-6 rounded-2xl border border-card-border bg-card-bg hover:border-accent/50 transition-all">
            <Wrench className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-foreground mb-2">Troubleshooting</h3>
            <p className="text-sm text-muted">Solutions to common problems and error messages.</p>
          </a>
        </div>

        <div className="space-y-16">
          {/* Installation Section */}
          <section id="installation" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-card-border">
              <Terminal className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Installation Guide</h2>
            </div>
            <div className="prose prose-invert prose-neutral max-w-none">
              <p className="text-muted leading-relaxed mb-6">
                Installing our scripts is straightforward. Follow these general steps for most of our resources:
              </p>
              
              <div className="space-y-6">
                <div className="bg-card-bg border border-card-border rounded-xl p-5">
                  <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs">1</span>
                    Download & Extract
                  </h4>
                  <p className="text-sm text-muted">
                    After purchase, download the <code>.zip</code> file from Payhip. Extract the contents into your server's <code>resources</code> directory.
                  </p>
                </div>

                <div className="bg-card-bg border border-card-border rounded-xl p-5">
                  <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs">2</span>
                    Configure Database (If Required)
                  </h4>
                  <p className="text-sm text-muted">
                    If the script requires a database, locate the <code>.sql</code> file included in the package and import it into your MySQL database using phpMyAdmin or a similar tool. Ensure your database connection settings in the script's config are correct.
                  </p>
                </div>

                <div className="bg-card-bg border border-card-border rounded-xl p-5">
                  <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs">3</span>
                    Add to Server Config
                  </h4>
                  <p className="text-sm text-muted mb-3">
                    Open your <code>mtaserver.conf</code> or use the server console to ensure the resource starts automatically.
                  </p>
                  <pre className="bg-neutral-950 p-3 rounded-lg text-xs font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
                    <code>&lt;resource src="pdz_scriptname" startup="1" protected="0" /&gt;</code>
                  </pre>
                </div>

                <div className="bg-card-bg border border-card-border rounded-xl p-5">
                  <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs">4</span>
                    Start the Resource
                  </h4>
                  <p className="text-sm text-muted mb-3">
                    In your server console or in-game (if logged in as admin), type:
                  </p>
                  <pre className="bg-neutral-950 p-3 rounded-lg text-xs font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
                    <code>refresh
start pdz_scriptname</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Configuration Section */}
          <section id="configuration" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-card-border">
              <Settings className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Configuration</h2>
            </div>
            <div className="prose prose-invert prose-neutral max-w-none text-muted leading-relaxed">
              <p>
                Almost all of our scripts come with a dedicated <code>config.lua</code> (or similar JSON/XML files) located in the root of the resource folder.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong className="text-foreground">Editing Configs:</strong> Always use a proper text editor like VS Code or Notepad++. Do not use basic Notepad as it can break formatting.</li>
                <li><strong className="text-foreground">Restart Required:</strong> After making changes to any configuration file, you must restart the resource (<code>restart pdz_scriptname</code>) for the changes to take effect.</li>
                <li><strong className="text-foreground">Syntax Errors:</strong> Be careful with commas, brackets, and quotes in Lua tables. A missing comma is the #1 cause of scripts failing to start.</li>
              </ul>
            </div>
          </section>

          {/* Troubleshooting Section */}
          <section id="troubleshooting" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-card-border">
              <Wrench className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Troubleshooting</h2>
            </div>
            <div className="space-y-4">
              <div className="border border-card-border bg-card-bg rounded-xl p-5">
                <h4 className="text-foreground font-medium mb-2">Script fails to start with "Access Denied" error</h4>
                <p className="text-sm text-muted">
                  The script needs admin rights to perform certain actions (like managing ACL or other resources). Go to your <code>acl.xml</code> and add the resource to the Admin group: <code>&lt;object name="resource.pdz_scriptname" /&gt;</code>
                </p>
              </div>
              <div className="border border-card-border bg-card-bg rounded-xl p-5">
                <h4 className="text-foreground font-medium mb-2">Database Connection Errors</h4>
                <p className="text-sm text-muted">
                  Double-check your MySQL credentials in the config. Ensure your database server is running and accessible from the MTA server. If you're using oxmysql, make sure it is updated to the latest version and started before our scripts.
                </p>
              </div>
              <div className="border border-card-border bg-card-bg rounded-xl p-5">
                <h4 className="text-foreground font-medium mb-2">UI elements not showing or looking broken</h4>
                <p className="text-sm text-muted">
                  Ensure you are running the latest recommended artifacts for your MTA:SA server. Try clearing your local client cache by deleting the specific resource folder in your MTA installation directory (<code>MTA San Andreas/mods/deathmatch/resources</code>).
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Support Banner */}
        <div className="mt-20 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent border border-accent/20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <LifeBuoy className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Still need help?</h3>
            </div>
            <p className="text-muted max-w-xl">
              If you couldn't find the answer in our documentation, our support team is ready to help you on Discord. Please have your order ID and server logs ready.
            </p>
          </div>
          <a
            href="https://dsc.gg/predzop"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            Open a Ticket
          </a>
        </div>
      </div>
    </section>
  );
}
