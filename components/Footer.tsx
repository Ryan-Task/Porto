export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-20 text-white dark:bg-black border-t border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Let&apos;s create something <br />
              <span className="text-zinc-500">extraordinary together.</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Open for freelance opportunities and collaborations.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@ian.dev"
              className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-black font-medium text-lg hover:bg-zinc-200 transition-colors"
            >
              aryantotrinasrullah77@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Ian. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/Ryan-Task"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/yantrizan?igsh=eHRpMTM1dng1cTMx"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
