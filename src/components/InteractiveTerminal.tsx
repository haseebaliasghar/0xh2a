'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '@/utils/soundEngine';

interface CommandOutput {
    id: number;
    command: string;
    output: React.ReactNode;
    isError?: boolean;
}

// File system simulation
const fileSystem: Record<string, string | Record<string, string>> = {
    'about.txt': `// SYNOPSIS:
CEH-Certified Cybersecurity Professional with 5 years of experience in technical support and network operations.
Specialized in threat detection, incident response, and Identity and Access Management (IAM) through Active Directory (AD) hardening.
Successfully engineered multi-node labs to implement Group Policy Object (GPO) security and
analyzed authentication logs for Indicators of Compromise (IoCs) to bridge complex network
infrastructure with Security Operations (SecOps).`,

    'skills.txt': `SKILL_MATRIX_v2.0
==================
[SECURITY TOOLS]
Kali Linux          [████████░░]  80% (Lab/Field)
Nmap                [████████▌░]  85% (Practice)
Metasploit          [██████▌░░░]  65% (Lab)
BurpSuite           [██████░░░░]  60% (Training)
Wireshark           [███████▌░░]  75% (Field)
Wazuh (SIEM)        [█████▌░░░░]  55% (Training)
Autopsy             [██████▌░░░]  65% (Academic)

[NETWORKING]
TCP/IP              [█████████▌]  95% (Field)
DNS/DHCP            [█████████░]  90% (Field)
Firewall Config     [████████▌░]  85% (Field)
IDS/IPS             [███████░░░]  70% (Lab)

[AI & ML]
Python              [███████▌░░]  75% (Projects)
Scikit-learn        [███████░░░]  70% (Projects)
Random Forest       [███████▒░░]  72% (NETRYX)
Feature Engineering [██████▊░░░]  68% (Academic)`,

    'contact.txt': `SECURE COMMUNICATION CHANNELS
==============================
> EMAIL:    haseeb.aliasghar@yahoo.com
> GITHUB:   github.com/haseebaliasghar
> LINKEDIN: linkedin.com/haseebaliasghar
> PHONE:    +92 340 5767273
> LOCATION: Islamabad, Pakistan
> STATUS:   🟢 Available for opportunities`,

    'achievements.txt': `SYSTEM_BADGES - Verified Credentials
=====================================
[CERT] CEH (Certified Ethical Hacker) — EC-Council [2024] ★
[CERT] CNSS (Certified Network Security Specialist) — ICSI [2020]
[CERT] Digital Forensics Certification — Autopsy / Basis Technology [2020]`,

    'secret.txt': `
╔══════════════════════════════════════════════════════════════╗
║  🎉 CONGRATULATIONS! You found a hidden file!                ║
║                                                              ║
║  FLAG{y0u_4r3_4_r34l_h4ck3r}                                ║
║                                                              ║
║  This proves you know your way around a terminal.           ║
║  Feel free to reach out - I'd love to connect!              ║
╚══════════════════════════════════════════════════════════════╝
`,

    'projects': {
        'netryx-nids': `PROJECT: NETRYX – Intelligent Network Intrusion Detection System
================================================================
AI-based NIDS using ensemble ML models (Random Forest, Decision Tree, Logistic Regression).
Trained on the CICIDS-2017 dataset. Achieved 99.8% detection accuracy.
Features: Real-time traffic analysis, multi-model consensus, forensic batch log inspection.
Built an interactive Streamlit-based security dashboard.
Tools: Python, Scikit-learn, Streamlit, Pandas
GitHub: https://github.com/haseebaliasghar/IDS`,

        'steganography-system': `PROJECT: Secure Information System using Encryption & Steganography
====================================================================
Secure data-hiding system using AES encryption and LSB steganography.
Key derivation: PBKDF2-HMAC-SHA256. GUI built with Tkinter.
Features: Secure message embedding, extraction, decryption, standardized PNG processing.
Tools: Python, AES-256, LSB Steganography, Tkinter
GitHub: https://github.com/haseebaliasghar/secure-steganography-system`,

        'ml-model-training': `PROJECT: Machine Learning Model Training & Analysis (Academic)
==============================================================
Hands-on training and evaluation of ML classification and linear models.
Focus: Data preprocessing, model training, prediction, and performance evaluation.
Applications in predictive analysis and security-related datasets.
Tools: Python, Scikit-learn, Pandas, NumPy`,
    },
};

// All available files for autocomplete
const allFiles = [
    'about.txt',
    'skills.txt',
    'contact.txt',
    'achievements.txt',
    'secret.txt',
    'projects/',
    'projects/netryx-nids',
    'projects/steganography-system',
    'projects/ml-model-training',
];

// All commands
const commandList = [
    'help', 'whoami', 'ls', 'cat', 'cd', 'clear', 'contact', 'skills',
    'projects', 'achievements', 'neofetch', 'sudo', 'echo', 'date', 'pwd',
    'matrix', 'hack', 'glitch', 'theme', 'history', 'fortune', 'cowsay',
];

const commands: Record<string, (args: string[], setState?: React.Dispatch<React.SetStateAction<{ matrixIntensity: number; theme: string }>>) => React.ReactNode> = {
    help: () => (
        <div className="text-[#8b949e]">
            <div className="text-[#00ff41] mb-2 terminal-glow">Available commands:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-1 text-xs sm:text-sm">
                <div><span className="text-[#0ea5e9]">help</span> - Show commands</div>
                <div><span className="text-[#0ea5e9]">whoami</span> - User info</div>
                <div><span className="text-[#0ea5e9]">ls</span> - List files</div>
                <div><span className="text-[#0ea5e9]">cat [file]</span> - Read file</div>
                <div><span className="text-[#0ea5e9]">clear</span> - Clear screen</div>
                <div><span className="text-[#0ea5e9]">neofetch</span> - System info</div>
                <div><span className="text-[#0ea5e9]">skills</span> - Skill matrix</div>
                <div><span className="text-[#0ea5e9]">projects</span> - Case files</div>
                <div><span className="text-[#0ea5e9]">contact</span> - Get in touch</div>
                <div><span className="text-[#ffd700]">matrix</span> - 🎬 Effect</div>
                <div><span className="text-[#ffd700]">hack</span> - 🎬 Animation</div>
                <div><span className="text-[#ffd700]">glitch</span> - 🎬 Glitch!</div>
                <div><span className="text-[#ffd700]">fortune</span> - 🔮 Wisdom</div>
                <div><span className="text-[#ffd700]">cowsay</span> - 🐄 Moo</div>
                <div><span className="text-[#ffd700]">sudo hire_me</span> - 🥚 Easter</div>
            </div>
            <div className="mt-3 text-[#30363d] text-xs">
                Tip: Press TAB to autocomplete commands and filenames
            </div>
        </div>
    ),

    whoami: () => (
        <div>
            <div className="text-[#00ff41] terminal-glow">0xH2A</div>
            <div className="text-[#8b949e] text-sm mt-1">
                CEH Certified | IAM/AD Hardening | Network Operations | SecOps
            </div>
        </div>
    ),

    ls: (args: string[]) => {
        const showDetails = args.includes('-la') || args.includes('-l') || args.includes('-a');
        const path = args.find(a => !a.startsWith('-')) || '';

        let files = ['about.txt', 'skills.txt', 'contact.txt', 'achievements.txt', 'projects/'];
        if (showDetails) {
            files.push('.secret.txt');
        }

        if (path === 'projects' || path === 'projects/') {
            files = ['netryx-nids/', 'steganography-system/', 'ml-model-training/'];
        }

        if (showDetails) {
            return (
                <div className="text-[#8b949e] font-mono text-xs sm:text-sm">
                    <div className="mb-1">total {files.length}</div>
                    {files.map((file) => (
                        <div key={file} className="flex gap-2 sm:gap-4">
                            <span className="hidden sm:inline">{file.endsWith('/') ? 'drwxr-xr-x' : '-rw-r--r--'}</span>
                            <span className="hidden sm:inline">analyst</span>
                            <span className={`${file.endsWith('/') ? 'text-[#0ea5e9]' :
                                file.startsWith('.') ? 'text-[#ffd700]' : 'text-[#00ff41]'
                                }`}>
                                {file}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="flex flex-wrap gap-4">
                {files.filter(f => !f.startsWith('.')).map((file) => (
                    <span key={file} className={file.endsWith('/') ? 'text-[#0ea5e9]' : 'text-[#00ff41]'}>
                        {file}
                    </span>
                ))}
            </div>
        );
    },

    cat: (args: string[]) => {
        const filename = args[0];
        if (!filename) {
            return <div className="text-red-500">cat: missing file operand</div>;
        }

        // Handle hidden file
        if (filename === '.secret.txt' || filename === 'secret.txt') {
            return <pre className="text-[#ffd700] whitespace-pre-wrap">{fileSystem['secret.txt'] as string}</pre>;
        }

        // Handle projects subdirectory
        if (filename.startsWith('projects/')) {
            const projectName = filename.replace('projects/', '');
            const projects = fileSystem['projects'] as Record<string, string>;
            const content = projects[projectName];
            if (content) {
                return <pre className="text-[#00ff41] whitespace-pre-wrap">{content}</pre>;
            }
            return <div className="text-red-500">cat: {filename}: No such file</div>;
        }

        const key = filename.endsWith('.txt') ? filename : `${filename}.txt`;
        const content = fileSystem[key];
        if (typeof content === 'string') {
            return <pre className="text-[#00ff41] whitespace-pre-wrap">{content}</pre>;
        }

        return <div className="text-red-500">cat: {filename}: No such file or directory</div>;
    },

    cd: (args: string[]) => {
        const dir = args[0];
        if (!dir || dir === '~' || dir === '..') {
            return <div className="text-[#8b949e]">Changed to home directory</div>;
        }

        if (dir === 'projects' || dir === 'projects/') {
            return (
                <div>
                    <div className="text-[#8b949e]">Entering projects directory...</div>
                    <div className="mt-2 text-[#00ff41]">
                        📁 netryx-nids/  📁 steganography-system/  📁 ml-model-training/
                    </div>
                    <div className="text-[#8b949e] text-xs mt-1">Use: cat projects/[name]</div>
                </div>
            );
        }

        return <div className="text-red-500">cd: {dir}: No such directory</div>;
    },

    contact: () => <pre className="text-[#00ff41]">{fileSystem['contact.txt'] as string}</pre>,
    skills: () => <pre className="text-[#00ff41]">{fileSystem['skills.txt'] as string}</pre>,
    achievements: () => <pre className="text-[#00ff41]">{fileSystem['achievements.txt'] as string}</pre>,

    projects: () => (
        <div>
            <div className="text-[#0ea5e9] mb-2">📁 Available case files:</div>
            {Object.keys(fileSystem['projects'] as Record<string, string>).map((project) => (
                <div key={project} className="text-[#00ff41]">└── {project}/</div>
            ))}
            <div className="text-[#8b949e] text-sm mt-2">Use: cat projects/[name]</div>
        </div>
    ),

    neofetch: () => (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
            <pre className="text-[#00ff41] text-[10px] sm:text-xs leading-tight hidden sm:block">
                {`    ⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⣿⣿⣿⣿⣷⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⠀⠀
    ⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀
    ⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀
    ⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀`}
            </pre>
            <div className="text-sm">
                <div><span className="text-[#0ea5e9]">0xH2A</span></div>
                <div className="text-[#8b949e]">─────────────────────</div>
                <div><span className="text-[#0ea5e9]">OS:</span> Kali Linux (WSL2)</div>
                <div><span className="text-[#0ea5e9]">Role:</span> CEH-Certified CyberSec Professional</div>
                <div><span className="text-[#0ea5e9]">Cert:</span> CEH | CNSS | Digital Forensics</div>
                <div><span className="text-[#0ea5e9]">Location:</span> Islamabad, Pakistan</div>
                <div><span className="text-[#0ea5e9]">Shell:</span> zsh 5.9</div>
                <div><span className="text-[#0ea5e9]">Status:</span> <span className="text-green-400">🟢 OPERATIONAL</span></div>
                <div className="mt-2 flex gap-1">
                    <span className="w-3 h-3 bg-red-500 inline-block"></span>
                    <span className="w-3 h-3 bg-green-500 inline-block"></span>
                    <span className="w-3 h-3 bg-yellow-500 inline-block"></span>
                    <span className="w-3 h-3 bg-blue-500 inline-block"></span>
                    <span className="w-3 h-3 bg-purple-500 inline-block"></span>
                    <span className="w-3 h-3 bg-cyan-500 inline-block"></span>
                </div>
            </div>
        </div>
    ),

    clear: () => 'CLEAR_TERMINAL',

    sudo: (args: string[]) => {
        if (args.join(' ') === 'hire_me') {
            return (
                <div className="space-y-2">
                    <div className="text-[#ffd700] animate-pulse">🎉 ACHIEVEMENT UNLOCKED: Secret Command Found!</div>
                    <pre className="text-[#00ff41] terminal-glow text-xs">
                        {`
███████╗███████╗ ██████╗██████╗ ███████╗████████╗
██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝╚══██╔══╝
███████╗█████╗  ██║     ██████╔╝█████╗     ██║   
╚════██║██╔══╝  ██║     ██╔══██╗██╔══╝     ██║   
███████║███████╗╚██████╗██║  ██║███████╗   ██║   
╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝   
                                                  
    █████╗  ██████╗ ███████╗███╗   ██╗████████╗  
   ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝  
   ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║     
   ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║     
   ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║     
   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝     
`}
                    </pre>
                    <div className="text-[#8b949e] mt-2">
                        Ready to discuss opportunities →{' '}
                        <a href="mailto:haseeb.aliasghar@yahoo.com" className="text-[#0ea5e9] hover:underline">
                            haseeb.aliasghar@yahoo.com
                        </a>
                    </div>
                </div>
            );
        }
        if (args[0] === 'rm' && args.includes('-rf')) {
            return <div className="text-[#ffd700]">Nice try! 😄 This terminal is read-only.</div>;
        }
        return <div className="text-red-500">sudo: command not found: {args.join(' ')}</div>;
    },

    echo: (args: string[]) => <div className="text-[#00ff41]">{args.join(' ')}</div>,
    date: () => <div className="text-[#00ff41]">{new Date().toString()}</div>,
    pwd: () => <div className="text-[#00ff41]">/home/0xH2A</div>,

    history: () => (
        <div className="text-[#8b949e] text-sm">
            <div>Command history (last 10):</div>
            <div className="mt-1 text-[#00ff41]">
                {['help', 'whoami', 'ls', 'cat about.txt', 'neofetch'].map((cmd, i) => (
                    <div key={i}>{i + 1}  {cmd}</div>
                ))}
            </div>
        </div>
    ),

    // Easter egg commands
    matrix: () => {
        // Trigger matrix effect
        document.body.classList.add('matrix-intense');
        setTimeout(() => document.body.classList.remove('matrix-intense'), 5000);
        return (
            <div className="text-[#00ff41] terminal-glow animate-pulse">
                🎬 Matrix mode activated for 5 seconds...
                <br />
                <span className="text-[#8b949e] text-sm">Follow the white rabbit.</span>
            </div>
        );
    },

    hack: () => {
        document.body.classList.add('hacking-mode');
        setTimeout(() => document.body.classList.remove('hacking-mode'), 4000);
        return (
            <div className="space-y-1">
                <div className="text-[#00ff41]">[*] Initializing hack sequence...</div>
                <div className="text-[#0ea5e9]">[*] Bypassing firewall...</div>
                <div className="text-[#ffd700]">[*] Accessing mainframe...</div>
                <div className="text-[#00ff41]">[*] Downloading secrets...</div>
                <div className="text-green-400 mt-2">✓ Just kidding! This is a portfolio 😄</div>
            </div>
        );
    },

    glitch: () => {
        document.body.classList.add('glitch-effect');
        setTimeout(() => document.body.classList.remove('glitch-effect'), 2000);
        return <div className="text-[#ff0000] glitch-text">G̷L̷I̷T̷C̷H̷ ̷D̷E̷T̷E̷C̷T̷E̷D̷</div>;
    },

    theme: (args: string[]) => {
        const themeName = args[0];
        if (themeName === 'neon') {
            document.body.classList.add('theme-neon');
            return <div className="text-[#ff00ff]">🌈 Neon theme activated!</div>;
        }
        if (themeName === 'reset' || themeName === 'default') {
            document.body.classList.remove('theme-neon');
            return <div className="text-[#00ff41]">Theme reset to default</div>;
        }
        return (
            <div className="text-[#8b949e]">
                Usage: theme [neon|reset]
                <br />
                Available themes: neon, default
            </div>
        );
    },

    fortune: () => {
        const fortunes = [
            "The best security is layers of paranoia.",
            "In cyberspace, trust is a vulnerability.",
            "Hackers don't break in, they log in.",
            "The password 'password' is not a password.",
            "Every system can be hacked, given enough time.",
            "Social engineering: hacking the human OS.",
            "Your attack surface is larger than you think.",
            "The cloud is just someone else's computer.",
            "Patch Tuesday, Exploit Wednesday.",
            "There are only two types of companies: those that have been hacked, and those that will be.",
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        return (
            <div className="text-[#ffd700] italic">
                🔮 {fortune}
            </div>
        );
    },

    cowsay: (args: string[]) => {
        const message = args.join(' ') || 'Moo! Hire 0xH2A!';
        return (
            <pre className="text-[#00ff41] text-xs">
                {` ${'_'.repeat(message.length + 2)}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
            </pre>
        );
    },
};

// Command aliases
const aliases: Record<string, string> = {
    'll': 'ls -la',
    'la': 'ls -la',
    '?': 'help',
    'cls': 'clear',
    'hi': 'echo Hello there! Type help for commands.',
    'hello': 'echo Hello there! Type help for commands.',
};

// Autocomplete helper
function getCompletions(input: string): string[] {
    const parts = input.split(' ');
    const command = parts[0];
    const currentArg = parts[parts.length - 1];

    // If typing first word, complete commands
    if (parts.length === 1) {
        return commandList.filter(cmd => cmd.startsWith(input));
    }

    // If command is cat or cd, complete filenames
    if (['cat', 'cd'].includes(command)) {
        return allFiles
            .filter(file => file.startsWith(currentArg))
            .map(file => `${command} ${file}`);
    }

    // Theme command completions
    if (command === 'theme') {
        return ['neon', 'reset', 'default']
            .filter(t => t.startsWith(currentArg))
            .map(t => `theme ${t}`);
    }

    return [];
}

export default function InteractiveTerminal() {
    const [history, setHistory] = useState<CommandOutput[]>([
        {
            id: 0,
            command: '',
            output: (
                <div>
                    <div className="text-[#00ff41] terminal-glow">
                        Welcome to 0xH2A&apos;s Terminal v3.0
                    </div>
                    <div className="text-[#8b949e] text-sm">
                        Type <span className="text-[#0ea5e9]">help</span> for commands |
                        <span className="text-[#ffd700]"> TAB</span> to autocomplete
                    </div>
                </div>
            ),
        },
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentPath] = useState('~');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    // Unlock terminal achievement
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window !== 'undefined' && (window as unknown as { unlockAchievement?: (id: string) => void }).unlockAchievement) {
                (window as unknown as { unlockAchievement: (id: string) => void }).unlockAchievement('terminal_explorer');
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleContainerClick = () => inputRef.current?.focus();

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        const resolvedCmd = aliases[trimmedCmd] || trimmedCmd;
        const parts = resolvedCmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Play sound for command execution
        soundEngine.playKeypress();

        if (command === 'clear') {
            setHistory([]);
            soundEngine.playSuccess();
        } else if (commands[command]) {
            const output = commands[command](args);
            setHistory((prev) => [...prev, { id: Date.now(), command: cmd, output }]);

            // Special sounds for easter eggs
            if (['matrix', 'hack', 'glitch', 'sudo'].includes(command)) {
                soundEngine.playEasterEgg();
            } else {
                soundEngine.playSuccess();
            }
        } else {
            setHistory((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    command: cmd,
                    output: (
                        <div className="text-red-500">
                            Command not found: {command}. Type <span className="text-[#0ea5e9]">help</span> for available commands.
                        </div>
                    ),
                    isError: true,
                },
            ]);
            soundEngine.playError();
        }

        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);
        setInput('');
        setSuggestions([]);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setSuggestions([]);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const completions = getCompletions(input);

            if (completions.length === 1) {
                // Single match - complete it
                setInput(completions[0] + ' ');
                setSuggestions([]);
            } else if (completions.length > 1) {
                // Multiple matches - show suggestions or cycle
                if (suggestions.length > 0) {
                    // Cycle through suggestions
                    const newIndex = (suggestionIndex + 1) % completions.length;
                    setSuggestionIndex(newIndex);
                    setInput(completions[newIndex]);
                } else {
                    setSuggestions(completions);
                    setSuggestionIndex(0);
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Escape') {
            setSuggestions([]);
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        } else {
            // Clear suggestions on other key presses
            setSuggestions([]);
        }
    };

    return (
        <motion.div
            className="terminal-window w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Terminal Header */}
            <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
                <span className="ml-4 text-[#8b949e] text-sm hidden sm:inline">
                    0xH2A: {currentPath}
                </span>
                <span className="ml-4 text-[#8b949e] text-xs sm:hidden">terminal</span>
            </div>

            {/* Terminal Body */}
            <div
                ref={containerRef}
                onClick={handleContainerClick}
                className="p-4 h-[350px] sm:h-[400px] overflow-y-auto font-mono text-xs sm:text-sm cursor-text"
            >
                <AnimatePresence>
                    {history.map((entry) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-3"
                        >
                            {entry.command && (
                                <div className="command-line flex flex-wrap">
                                    <span className="command-prompt whitespace-nowrap">
                                        <span className="text-[#00ff41]">0xH2A</span>
                                        <span className="text-white">:</span>
                                        <span className="text-[#ffd700]">{currentPath}</span>
                                        <span className="text-white">$ </span>
                                    </span>
                                    <span className="text-[#00ff41]">{entry.command}</span>
                                </div>
                            )}
                            <div className="mt-1">{entry.output}</div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Autocomplete suggestions */}
                {suggestions.length > 1 && (
                    <div className="mb-2 flex flex-wrap gap-2 text-[#8b949e] text-xs">
                        {suggestions.map((s, i) => (
                            <span
                                key={s}
                                className={`px-2 py-1 ${i === suggestionIndex ? 'bg-[#00ff41] text-[#0d1117]' : 'bg-[#161b22]'}`}
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                )}

                {/* Current Input Line */}
                <div className="command-line mt-2 flex flex-wrap">
                    <span className="command-prompt whitespace-nowrap">
                        <span className="text-[#00ff41]">0xH2A</span>
                        <span className="text-white">:</span>
                        <span className="text-[#ffd700]">{currentPath}</span>
                        <span className="text-white">$ </span>
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="terminal-input flex-1 min-w-[100px]"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                        placeholder="Type a command..."
                    />
                </div>
            </div>
        </motion.div>
    );
}
