import { motion } from "motion/react";
import {
  Code2,
  Trophy,
  Users,
  Rocket,
  Sparkles,
  Star,
  Zap,
  Crown,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
} from "lucide-react";

interface HomeProps {
  onGetStarted: () => void;
  onExploreProblems: () => void;
}

export function Home({ onGetStarted, onExploreProblems }: HomeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000000]">
      {/* Animated Galaxy Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014] via-[#1a0a2e] to-[#0a0014]" />

        {/* Moving galaxy layers */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent), radial-gradient(1px 1px at 80% 10%, white, transparent), radial-gradient(2px 2px at 90% 60%, white, transparent), radial-gradient(1px 1px at 33% 50%, white, transparent), radial-gradient(1px 1px at 70% 40%, white, transparent)",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Additional star layers for depth */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Nebula clouds */}
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-pink-500/5 rounded-full blur-[120px]"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-8"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                    "0 0 40px rgba(236, 72, 153, 0.3)",
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to the Future of Coding
                </span>
              </motion.div>

              <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                CodeColosseum
              </h1>

              <p className="text-2xl md:text-3xl text-gray-400 mb-4 font-light">
                Battle. Learn. Conquer.
              </p>

              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Next-gen algorithmic battle platform powered by AI mentorship,
                real-time competitions, and collaborative coding spaces.
              </p>
            </motion.div>

            {/* Realistic Astronaut with Virtual Effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mb-12 mx-auto max-w-2xl"
            >
              {/* Virtual Holographic Astronaut */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Multiple glowing layers for virtual effect */}
                <div className="relative w-full aspect-[4/3]">
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute -inset-8 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 60px 20px rgba(168, 85, 247, 0.3)",
                        "0 0 100px 40px rgba(236, 72, 153, 0.4)",
                        "0 0 60px 20px rgba(59, 130, 246, 0.3)",
                        "0 0 100px 40px rgba(168, 85, 247, 0.4)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Animated border rings */}
                  <motion.div
                    className="absolute -inset-4 rounded-3xl border-2 border-purple-500/30"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />

                  <motion.div
                    className="absolute -inset-6 rounded-3xl border border-pink-500/20"
                    animate={{
                      rotate: -360,
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />

                  {/* Spaceship Window Frame */}
                  <div className="relative">
                    {/* Outer metallic frame */}
                    <div className="absolute -inset-8 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-3xl shadow-2xl">
                      {/* Metallic shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 via-transparent to-gray-900/50 rounded-3xl" />

                      {/* Rivets in corners */}
                      {[
                        { top: "8px", left: "8px" },
                        { top: "8px", right: "8px" },
                        { bottom: "8px", left: "8px" },
                        { bottom: "8px", right: "8px" },
                        {
                          top: "8px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        },
                        {
                          bottom: "8px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        },
                        {
                          left: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        },
                        {
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        },
                      ].map((pos, i) => (
                        <div
                          key={i}
                          className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-inner"
                          style={pos}
                        >
                          <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-gray-600 to-gray-800" />
                          <div className="absolute inset-1 rounded-full bg-gray-700" />
                        </div>
                      ))}

                      {/* Panel lines */}
                      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                      <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                      <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
                      <div className="absolute right-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
                    </div>

                    {/* Inner frame with tech details */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border-2 border-gray-700">
                      {/* Corner brackets */}
                      {[
                        {
                          top: "-2px",
                          left: "-2px",
                          borderTop: "3px solid #6366f1",
                          borderLeft: "3px solid #6366f1",
                        },
                        {
                          top: "-2px",
                          right: "-2px",
                          borderTop: "3px solid #ec4899",
                          borderRight: "3px solid #ec4899",
                        },
                        {
                          bottom: "-2px",
                          left: "-2px",
                          borderBottom: "3px solid #3b82f6",
                          borderLeft: "3px solid #3b82f6",
                        },
                        {
                          bottom: "-2px",
                          right: "-2px",
                          borderBottom: "3px solid #22d3ee",
                          borderRight: "3px solid #22d3ee",
                        },
                      ].map((style, i) => (
                        <div
                          key={i}
                          className="absolute w-8 h-8"
                          style={style}
                        />
                      ))}

                      {/* Tech indicators on frame */}
                      <div className="absolute -top-2 left-1/4 flex items-center gap-1">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-green-400"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-blue-400"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-purple-400"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.6,
                          }}
                        />
                      </div>

                      {/* Status display */}
                      <div className="absolute -top-3 right-4 text-[10px] font-mono text-cyan-400 flex items-center gap-2 bg-gray-900/80 px-2 py-1 rounded border border-cyan-500/30">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                        <span>VIEWPORT ACTIVE</span>
                      </div>

                      {/* Side panels with details */}
                      <div className="absolute -left-3 top-1/4 text-[8px] font-mono text-purple-400 writing-mode-vertical bg-gray-900/80 px-1 py-2 rounded border border-purple-500/30">
                        <span>SECTOR-7A</span>
                      </div>

                      <div className="absolute -right-3 top-1/4 text-[8px] font-mono text-pink-400 writing-mode-vertical bg-gray-900/80 px-1 py-2 rounded border border-pink-500/30">
                        <span>DEEP-SPACE</span>
                      </div>
                    </div>

                    {/* Main astronaut image with virtual effects */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800">
                      {/* Holographic overlay effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 mix-blend-overlay"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Scanning lines effect */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          backgroundPosition: ["0% 0%", "0% 100%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168, 85, 247, 0.05) 2px, rgba(168, 85, 247, 0.05) 4px)",
                          backgroundSize: "100% 20px",
                        }}
                      />

                      <img
                        src="https://images.unsplash.com/photo-1578852799294-cf61faaec83c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb25hdXQlMjByZWFsaXN0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjgzMTgzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Realistic Astronaut"
                        className="relative w-full h-full object-cover"
                      />

                      {/* Glowing edges */}
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-500/40 shadow-[inset_0_0_60px_rgba(168,85,247,0.3)]" />

                      {/* HUD overlay elements */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1">
                        <div className="text-[10px] font-mono text-green-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-green-500/30">
                          <span className="text-green-300">O₂:</span> 98%
                        </div>
                        <div className="text-[10px] font-mono text-blue-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-blue-500/30">
                          <span className="text-blue-300">TEMP:</span> -270°C
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 flex flex-col gap-1">
                        <div className="text-[10px] font-mono text-purple-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-purple-500/30">
                          <span className="text-purple-300">ALT:</span> ∞
                        </div>
                        <div className="text-[10px] font-mono text-pink-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-pink-500/30">
                          <span className="text-pink-300">VEL:</span> 27.6K km/h
                        </div>
                      </div>

                      {/* Bottom status bar */}
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm border border-cyan-500/30 rounded px-3 py-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] font-mono text-cyan-400">
                            COORDINATES:{" "}
                            <span className="text-cyan-300">
                              41.3851° N, 2.1734° E
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-1 h-3 bg-cyan-400 rounded"
                                animate={{ scaleY: [1, 0.5, 1] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Crosshair overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-32 h-32">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent" />
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-cyan-400/60 to-transparent" />
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-8 bg-gradient-to-r from-cyan-400/60 to-transparent" />
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-8 bg-gradient-to-l from-cyan-400/60 to-transparent" />

                          <motion.div
                            className="absolute inset-0 border-2 border-cyan-400/40 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating particles around the astronaut */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = 280;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-purple-400"
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                        animate={{
                          x: [0, x, 0],
                          y: [0, y, 0],
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </div>
              </motion.div>

              {/* Floating Code Symbols around astronaut */}
              <motion.div
                className="absolute top-10 -left-16 text-5xl font-mono"
                animate={{
                  rotate: 360,
                  x: [0, 30, 0],
                  y: [0, -30, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <span className="text-purple-400/70 drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]">
                  {"{}"}
                </span>
              </motion.div>

              <motion.div
                className="absolute top-10 -right-16 text-5xl font-mono"
                animate={{
                  rotate: -360,
                  x: [0, -30, 0],
                  y: [0, 30, 0],
                }}
                transition={{ duration: 7, repeat: Infinity }}
              >
                <span className="text-pink-400/70 drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]">
                  {"</>"}
                </span>
              </motion.div>

              <motion.div
                className="absolute -bottom-10 left-10 text-5xl font-mono"
                animate={{
                  rotate: 360,
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <span className="text-blue-400/70 drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]">
                  {"[]"}
                </span>
              </motion.div>

              <motion.div
                className="absolute -bottom-10 right-10 text-5xl font-mono"
                animate={{
                  rotate: -360,
                  x: [0, 15, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 9, repeat: Infinity }}
              >
                <span className="text-cyan-400/70 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">
                  {"()"}
                </span>
              </motion.div>

              {/* Additional floating elements */}
              <motion.div
                className="absolute left-0 top-1/2 text-4xl"
                animate={{
                  x: [0, -40, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <Star className="w-6 h-6 text-yellow-400/60 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
              </motion.div>

              <motion.div
                className="absolute right-0 top-1/2 text-4xl"
                animate={{
                  x: [0, 40, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{ duration: 12, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-purple-400/60 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Launch Your Journey
                </span>
              </motion.button>

              <motion.button
                onClick={onExploreProblems}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Explore Problems
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* AI Mentor Card */}
            <motion.div
              className="group relative p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all"
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 rounded-2xl transition-all" />

              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">AI Mentor</h3>
                <p className="text-gray-400 leading-relaxed">
                  Get personalized guidance powered by advanced AI without
                  revealing solutions
                </p>
              </div>
            </motion.div>

            {/* Live Battles Card */}
            <motion.div
              className="group relative p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all"
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 rounded-2xl transition-all" />

              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">
                  Live Battles
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Compete in real-time contests with global rankings and instant
                  feedback
                </p>
              </div>
            </motion.div>

            {/* Collab Spaces Card */}
            <motion.div
              className="group relative p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl hover:border-green-500/40 transition-all"
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/20 group-hover:to-emerald-500/20 rounded-2xl transition-all" />

              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">
                  Collab Spaces
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Practice interviews with video calls, shared coding, and AI
                  interviewers
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Code2, label: "Problems", value: "500+" },
              { icon: Users, label: "Active Users", value: "10K+" },
              { icon: Trophy, label: "Contests", value: "50+" },
              { icon: Crown, label: "Premium Features", value: "20+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-8">
              {/* Brand Section */}
              <div className="col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative">
                    {/* Orbital rings */}
                    <div
                      className="absolute inset-0 animate-spin"
                      style={{ animationDuration: "20s" }}
                    >
                      <div className="w-9 h-9 border-2 border-transparent border-t-purple-400 border-r-pink-400 rounded-full" />
                    </div>
                    <div
                      className="absolute inset-0.5 animate-spin"
                      style={{
                        animationDuration: "15s",
                        animationDirection: "reverse",
                      }}
                    >
                      <div className="w-8 h-8 border border-transparent border-b-purple-300 border-l-pink-300 rounded-full" />
                    </div>

                    {/* Core planet/star */}
                    <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-2 rounded-full">
                      <Rocket className="w-5 h-5 text-white" />

                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-md opacity-50 -z-10" />
                    </div>

                    {/* Small orbiting dots */}
                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full -translate-x-1/2 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
                  </div>
                  <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    CodeColosseum
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  The next-generation platform for competitive programming,
                  algorithmic battles, and collaborative coding.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="w-9 h-9 bg-gray-800/50 hover:bg-purple-500/20 border border-gray-700/50 hover:border-purple-500/30 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Github className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700/50 hover:border-blue-500/30 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Twitter className="w-4 h-4 text-gray-400 hover:text-blue-400" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700/50 hover:border-blue-500/30 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-gray-400 hover:text-blue-400" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 bg-gray-800/50 hover:bg-pink-500/20 border border-gray-700/50 hover:border-pink-500/30 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Mail className="w-4 h-4 text-gray-400 hover:text-pink-400" />
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Problems
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Contests
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Leaderboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Meeting Rooms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      AI Mentor
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2026 CodeColosseum. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>by developers, for developers</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
