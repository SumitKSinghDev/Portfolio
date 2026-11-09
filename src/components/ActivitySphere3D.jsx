import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Sparkles, Activity, Layers, RotateCcw, Filter } from 'lucide-react'
import { sound } from '../utils/audio'

// Curated sample of high-signal algorithmic problems solved across difficulty tiers
const PROBLEM_NODES = [
  // 16 Hard Problems (Crimson/Red)
  { id: 'h1', title: 'Binary Tree Maximum Path Sum', topic: 'Trees / DFS', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h2', title: 'Trapping Rain Water', topic: 'Two Pointers', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h3', title: 'Merge k Sorted Lists', topic: 'Heap / Divide & Conquer', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h4', title: 'Median of Two Sorted Arrays', topic: 'Binary Search', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h5', title: 'Edit Distance', topic: 'Dynamic Programming', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h6', title: 'Word Ladder II', topic: 'BFS / Graph Theory', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h7', title: 'Alien Dictionary', topic: 'Topological Sort', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h8', title: 'Sliding Window Maximum', topic: 'Monotonic Deque', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h9', title: 'Serialize and Deserialize Binary Tree', topic: 'Tree Design', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h10', title: 'Longest Valid Parentheses', topic: 'DP / Stack', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h11', title: 'First Missing Positive', topic: 'Array Cyclic Sort', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h12', title: 'N-Queens Backtracking', topic: 'Recursion / Backtracking', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h13', title: 'Minimum Window Substring', topic: 'Sliding Window / Hash', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h14', title: 'Largest Rectangle in Histogram', topic: 'Monotonic Stack', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h15', title: 'Burst Balloons', topic: 'Matrix Chain DP', difficulty: 'Hard', color: 0xff3b30 },
  { id: 'h16', title: 'Russian Doll Envelopes', topic: 'Binary Search / LIS', difficulty: 'Hard', color: 0xff3b30 },

  // Medium Problems Sample (Amber/Orange)
  { id: 'm1', title: 'Coin Change', topic: 'DP Memoization', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm2', title: 'Longest Increasing Subsequence', topic: 'Dynamic Programming', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm3', title: 'Number of Islands', topic: 'Graph / Matrix BFS', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm4', title: 'Course Schedule', topic: 'Topological Sort / DFS', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm5', title: 'Kth Largest Element in an Array', topic: 'QuickSelect / MaxHeap', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm6', title: '3Sum', topic: 'Two Pointers', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm7', title: 'Container With Most Water', topic: 'Greedy / Two Pointers', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm8', title: 'Clone Graph', topic: 'BFS / Hash Mapping', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm9', title: 'Subarray Sum Equals K', topic: 'Prefix Sums / Hash', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm10', title: 'Word Break', topic: 'DP / Trie', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm11', title: 'Construct Binary Tree from Pre/In', topic: 'Tree Recursion', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm12', title: 'Rotting Oranges', topic: 'Multi-Source BFS', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm13', title: 'Search in Rotated Sorted Array', topic: 'Modified Binary Search', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm14', title: 'Find Minimum in Rotated Sorted Array', topic: 'Binary Search', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm15', title: 'House Robber II', topic: 'Circular DP', difficulty: 'Medium', color: 0xff9500 },
  { id: 'm16', title: 'Daily Temperatures', topic: 'Monotonic Stack', difficulty: 'Medium', color: 0xff9500 },

  // Easy Problems Sample (Emerald/Green)
  { id: 'e1', title: 'Two Sum', topic: 'Hash Map Lookup', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e2', title: 'Valid Parentheses', topic: 'Stack Fundamentals', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e3', title: 'Reverse Linked List', topic: 'Pointers Iteration', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e4', title: 'Invert Binary Tree', topic: 'Tree Recursion', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e5', title: 'Maximum Subarray (Kadane)', topic: 'Greedy Dynamic Programming', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e6', title: 'Climbing Stairs', topic: 'Fibonacci DP', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e7', title: 'Best Time to Buy & Sell Stock', topic: 'Single Pass Min So Far', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e8', title: 'Binary Search', topic: 'Divide and Conquer', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e9', title: 'Merge Two Sorted Lists', topic: 'Linked List Splice', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e10', title: 'Same Tree', topic: 'Binary Tree Traversal', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e11', title: 'Valid Anagram', topic: 'Frequency Array', difficulty: 'Easy', color: 0x34c759 },
  { id: 'e12', title: 'Diameter of Binary Tree', topic: 'DFS Depth Calculation', difficulty: 'Easy', color: 0x34c759 },
]

export default function ActivitySphere3D() {
  const mountRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredNode, setHoveredNode] = useState(null)
  const [isRotating, setIsRotating] = useState(true)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight || 420

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 18

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Master Group for Rotation
    const sphereGroup = new THREE.Group()
    scene.add(sphereGroup)

    // Orbital Rings
    const ringGeo = new THREE.RingGeometry(7.8, 8.0, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18
    })
    const ring1 = new THREE.Mesh(ringGeo, ringMat)
    ring1.rotation.x = Math.PI / 2.3
    sphereGroup.add(ring1)

    const ring2 = new THREE.Mesh(ringGeo, ringMat.clone())
    ring2.rotation.x = Math.PI / 1.7
    ring2.rotation.y = Math.PI / 3.5
    sphereGroup.add(ring2)

    // Celestial Core Glow
    const coreGeo = new THREE.SphereGeometry(1.6, 24, 24)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0891b2,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    sphereGroup.add(coreMesh)

    // Node Meshes & Metadata
    const meshes = []
    const sphereRadius = 6.2

    // Fibonnaci Sphere distribution
    const count = 120 // 120 visible nodes mapped around the sphere
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    const linePoints = []

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio
      const phi = Math.acos(1 - 2 * (i + 0.5) / count)

      const x = Math.cos(theta) * Math.sin(phi) * sphereRadius
      const y = Math.sin(theta) * Math.sin(phi) * sphereRadius
      const z = Math.cos(phi) * sphereRadius

      // Pick problem data
      const prob = PROBLEM_NODES[i % PROBLEM_NODES.length]

      // Difficulty distribution
      const nodeColor =
        prob.difficulty === 'Hard'
          ? 0xf43f5e // Rose / Hard
          : prob.difficulty === 'Medium'
          ? 0xf59e0b // Amber / Medium
          : 0x10b981 // Emerald / Easy

      const size = prob.difficulty === 'Hard' ? 0.32 : prob.difficulty === 'Medium' ? 0.24 : 0.18
      const geo = new THREE.SphereGeometry(size, 12, 12)
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColor,
        transparent: true,
        opacity: 0.85
      })

      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      mesh.userData = {
        ...prob,
        originalColor: nodeColor,
        baseScale: size
      }

      sphereGroup.add(mesh)
      meshes.push(mesh)

      // Collect points for constellation wire lines
      if (i % 3 === 0) {
        linePoints.push(new THREE.Vector3(x, y, z))
      }
    }

    // Connect some line constellations
    if (linePoints.length > 1) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.12
      })
      const lines = new THREE.Line(lineGeo, lineMat)
      sphereGroup.add(lines)
    }

    // Drag Interaction Physics
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let velX = 0.003
    let velY = 0.002

    const onMouseDown = (e) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY

        velX = deltaX * 0.005
        velY = deltaY * 0.005

        sphereGroup.rotation.y += velX
        sphereGroup.rotation.x += velY

        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }

      // Raycasting for node hover
      const rect = renderer.domElement.getBoundingClientRect()
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      )

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(meshes)

      if (intersects.length > 0) {
        const hit = intersects[0].object
        setHoveredNode(hit.userData)
      } else {
        setHoveredNode(null)
      }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const dom = renderer.domElement
    dom.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }
    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX
        const deltaY = e.touches[0].clientY - prevMouseY
        sphereGroup.rotation.y += deltaX * 0.005
        sphereGroup.rotation.x += deltaY * 0.005
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }
    const onTouchEnd = () => {
      isDragging = false
    }

    dom.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    // Animation Loop
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)

      if (!isDragging) {
        sphereGroup.rotation.y += velX
        sphereGroup.rotation.x += velY * 0.4

        // Inertial damping to gentle cruise
        velX += (0.002 - velX) * 0.05
        velY += (0.001 - velY) * 0.05
      }

      // Rotate core mesh
      coreMesh.rotation.y -= 0.01

      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight || 420
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Filter Node Visibility Effect
    meshes.forEach((m) => {
      if (activeFilter === 'All') {
        m.visible = true
      } else {
        m.visible = m.userData.difficulty === activeFilter
      }
    })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      dom.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      dom.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      if (container.contains(dom)) {
        container.removeChild(dom)
      }
      renderer.dispose()
    }
  }, [activeFilter])

  return (
    <div className="relative rounded-3xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-xl overflow-hidden p-6 shadow-2xl">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <Activity className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">3D Problem Constellation</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
            250+ Algorithmic Nodes Sphere
          </h3>
          <p className="text-xs text-zinc-400">
            Interactive spherical topology mapping LeetCode 206 problems and Java algorithmic masteries.
          </p>
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-zinc-900 border border-white/[0.08] self-start sm:self-auto">
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => {
                sound.playClick()
                setActiveFilter(diff)
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                activeFilter === diff
                  ? diff === 'Hard'
                    ? 'bg-rose-500 text-white font-bold shadow'
                    : diff === 'Medium'
                    ? 'bg-amber-500 text-white font-bold shadow'
                    : diff === 'Easy'
                    ? 'bg-emerald-500 text-white font-bold shadow'
                    : 'bg-white text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-[380px] sm:h-[440px] cursor-grab active:cursor-grabbing relative"
      >
        {/* Interactive Hover HUD Tooltip */}
        {hoveredNode && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none p-3 rounded-2xl bg-zinc-900/90 border border-white/[0.12] backdrop-blur-xl shadow-xl space-y-1 animate-in fade-in duration-150">
            <div className="flex items-center space-x-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  hoveredNode.difficulty === 'Hard'
                    ? 'bg-rose-500'
                    : hoveredNode.difficulty === 'Medium'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                {hoveredNode.difficulty} Challenge
              </span>
            </div>
            <div className="text-xs font-bold text-white">{hoveredNode.title}</div>
            <div className="text-[11px] font-mono text-cyan-400">{hoveredNode.topic}</div>
          </div>
        )}

        {/* Ambient Orbit Legend */}
        <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-3 text-[11px] font-mono text-zinc-400 bg-zinc-950/80 p-2.5 px-3.5 rounded-xl border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span>93 Easy</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
            <span>97 Medium</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            <span>16 Hard</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">• Drag to rotate sphere</span>
        </div>
      </div>

    </div>
  )
}
