import React, { useState } from 'react'
import { sound } from '../utils/audio'
import { ShieldCheck, AlertTriangle, CheckCircle, Terminal, Play, Bug } from 'lucide-react'

const SAMPLES = {
  sql: {
    title: 'SQL Injection in Auth Handler',
    language: 'python',
    code: `def get_user_profile(user_input_id):\n    # Querying DB directly with string concat\n    query = f"SELECT * FROM users WHERE id = '{user_input_id}'"\n    cursor.execute(query)\n    return cursor.fetchone()`,
    vuln: 'OWASP A03:2021 – Injection (High Severity)',
    fix: 'Use parameterized queries: cursor.execute("SELECT * FROM users WHERE id = %s", (user_input_id,))',
    line: 3,
  },
  auth: {
    title: 'Hardcoded JWT Secret',
    language: 'python',
    code: `def verify_token(token):\n    # Hardcoded secret key\n    secret = "my_super_secret_production_key_123"\n    return jwt.decode(token, secret, algorithms=["HS256"])`,
    vuln: 'OWASP A07:2021 – Identification & Auth Failures',
    fix: 'Load secrets from environment variables: os.environ.get("JWT_SECRET_KEY")',
    line: 3,
  },
  safe: {
    title: 'Sanitized Password Hashing',
    language: 'python',
    code: `import bcrypt\n\ndef hash_password(password: str) -> str:\n    salt = bcrypt.gensalt(rounds=12)\n    return bcrypt.hashpw(password.encode(), salt)`,
    vuln: null,
    fix: 'No vulnerabilities detected. Meets industry password hashing standards (OWASP A02 Compliant).',
    line: null,
  }
}

export default function SecurityScannerDemo() {
  const [selectedKey, setSelectedKey] = useState('sql')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)

  const handleScan = () => {
    sound.playClick()
    setIsScanning(true)
    setScanResult(null)

    setTimeout(() => {
      setIsScanning(false)
      setScanResult(SAMPLES[selectedKey])
      sound.playChime()
    }, 900)
  }

  const sample = SAMPLES[selectedKey]

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Infosys AI Code Review Agent (Live Simulator)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                OWASP Scanner
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Automated source-code vulnerability detection developed by Sumit
            </p>
          </div>
        </div>

        {/* Snippet selector tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
          {Object.entries(SAMPLES).map(([key, item]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedKey(key)
                setScanResult(null)
                sound.playClick()
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedKey === key
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {key === 'sql' ? 'SQL Vuln' : key === 'auth' ? 'Hardcoded Secret' : 'Secure Code'}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="mt-4 relative rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 text-slate-400 text-[11px]">
          <span>{sample.title}</span>
          <span className="text-cyan-400">Python 3.14</span>
        </div>
        <pre className="p-4 overflow-x-auto text-slate-300 leading-relaxed">
          {sample.code.split('\n').map((line, idx) => {
            const isTarget = scanResult && scanResult.line === idx + 1
            return (
              <div
                key={idx}
                className={`flex items-center ${
                  isTarget ? 'bg-rose-500/20 -mx-4 px-4 border-l-2 border-rose-500 text-rose-200' : ''
                }`}
              >
                <span className="w-6 text-slate-600 select-none">{idx + 1}</span>
                <span>{line}</span>
              </div>
            )
          })}
        </pre>

        {/* Scan Trigger Button */}
        <div className="p-3 bg-slate-900/40 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Analyzing AST & Security Rules...' : 'Run AI Security Scan'}</span>
          </button>
          <span className="text-[11px] font-mono text-slate-500">
            Target: 10 OWASP Categories
          </span>
        </div>
      </div>

      {/* Result Card */}
      {scanResult && (
        <div
          className={`mt-4 p-3.5 rounded-xl border flex items-start space-x-3 transition-all ${
            scanResult.vuln
              ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          }`}
        >
          {scanResult.vuln ? (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1 text-xs">
            <div className="font-bold flex items-center gap-2">
              <span>{scanResult.vuln || 'Security Check Passed!'}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                85% manual audit saved
              </span>
            </div>
            <p className="text-slate-300 font-mono text-[11px]">{scanResult.fix}</p>
          </div>
        </div>
      )}
    </div>
  )
}
