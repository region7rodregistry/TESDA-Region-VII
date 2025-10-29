"use client"
import React, { useState, useEffect, useRef } from "react"
import * as THREE from "three"
import { Lock, Mail, ArrowRight, Shield, Zap } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isFocused, setIsFocused] = useState({ email: false, password: false })
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000033, 0.001)

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    )

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x4a9eff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Geometric shapes
    const shapes: THREE.Mesh[] = []
    const geometries = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
    ]

    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x3b82f6 : 0x60a5fa,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
      const mesh = new THREE.Mesh(geometry, material)
      
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      )
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      
      mesh.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      }
      
      shapes.push(mesh)
      scene.add(mesh)
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x3b82f6, 2, 100)
    pointLight1.position.set(50, 50, 50)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x60a5fa, 2, 100)
    pointLight2.position.set(-50, -50, 50)
    scene.add(pointLight2)

    // Mouse movement
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate particles
      particlesMesh.rotation.y += 0.0005
      particlesMesh.rotation.x += 0.0002

      // Rotate shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x
        shape.rotation.y += shape.userData.rotationSpeed.y
        shape.rotation.z += shape.userData.rotationSpeed.z
      })

      // Camera movement based on mouse
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      shapes.forEach((shape) => {
        shape.geometry.dispose()
        if (Array.isArray(shape.material)) {
          shape.material.forEach(mat => mat.dispose())
        } else {
          shape.material.dispose()
        }
      })
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // For demo purposes - replace with actual Supabase authentication
      // Uncomment below for real Supabase auth:
      /*
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }
      */

      // Demo login - accepts any credentials
      if (email && password) {
        setSuccess(true)
        setEmail("")
        setPassword("")
        
        // Redirect after short delay to show success message
        setTimeout(() => {
          window.location.href = "/admin/admindash"
        }, 1000)
      } else {
        setError("Please enter both email and password")
        setLoading(false)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(to bottom right, #000000, #1e3a8a, #3b82f6)" }}
      />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite'
      }} />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-sm mx-6">
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
          {/* Animated border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 opacity-50 blur-xl animate-pulse" />
          
          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" 
                 style={{ animation: 'scanLine 3s linear infinite' }} />
          </div>

          <div className="relative p-6">
            {/* Header with Icon */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-3 shadow-lg shadow-blue-500/50">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent tracking-tight mb-1 drop-shadow-lg">
                TESDA
              </h1>
              <div className="flex items-center justify-center gap-2 text-xs text-cyan-300 font-mono">
                <Zap className="w-3 h-3" />
                <span className="tracking-widest">SECURE ACCESS</span>
                <Zap className="w-3 h-3" />
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-lg text-center backdrop-blur-sm animate-pulse">
                <div className="flex items-center justify-center gap-2 text-green-300 text-xs font-semibold">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                  ACCESS GRANTED
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/50 rounded-lg text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 text-red-300 text-xs font-semibold">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                  {error.toUpperCase()}
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-cyan-300 mb-1.5 tracking-widest font-mono">
                  USERNAME
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isFocused.email ? 'text-cyan-400 scale-110' : 'text-blue-300'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused({ ...isFocused, email: true })}
                    onBlur={() => setIsFocused({ ...isFocused, email: false })}
                    placeholder="admin@tesda.gov.ph"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-white/5 text-white placeholder-blue-300/40 border-2 border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 font-mono text-xs"
                  />
                  {isFocused.email && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-cyan-300 mb-1.5 tracking-widest font-mono">
                  PASSWORD
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isFocused.password ? 'text-cyan-400 scale-110' : 'text-blue-300'
                  }`}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused({ ...isFocused, password: true })}
                    onBlur={() => setIsFocused({ ...isFocused, password: false })}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-white/5 text-white placeholder-blue-300/40 border-2 border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 font-mono text-xs"
                  />
                  {isFocused.password && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="relative w-full py-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg shadow-blue-500/50 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-xs tracking-widest font-mono">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      INITIATE ACCESS
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-xs text-blue-300/60 font-mono">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px]">SYSTEM ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <style jsx>{`
        @keyframes scanLine {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  )
}