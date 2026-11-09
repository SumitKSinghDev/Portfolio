import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { sound } from '../utils/audio'
import { voice } from '../utils/speech'
import { ChevronDown, Sparkles } from 'lucide-react'

export default function Walker3D({ isVisible = true }) {
  const mountRef = useRef(null)
  const [hasArrived, setHasArrived] = useState(false)
  const [speechBubbleText, setSpeechBubbleText] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const container = mountRef.current
    if (!container) return

    const width = 280
    const height = 320

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0.8, 5.2)

    // WebGL Renderer with transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0)
    keyLight.position.set(3, 4, 3)
    scene.add(keyLight)

    const cyanRimLight = new THREE.PointLight(0x00f0ff, 3.5, 10)
    cyanRimLight.position.set(-2, 2, 1)
    scene.add(cyanRimLight)

    const purpleFill = new THREE.PointLight(0xa855f7, 2.0, 10)
    purpleFill.position.set(2, -1, 1)
    scene.add(purpleFill)

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.6 })
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4 })
    const jacketMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.2 })
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.2, emissive: 0x00f0ff, emissiveIntensity: 0.3 })
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.1, emissive: 0x00f0ff, emissiveIntensity: 0.8 })
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })

    // Build Articulated 3D Humanoid Model
    const character = new THREE.Group()
    scene.add(character)

    // Torso / Jacket
    const torsoGeo = new THREE.BoxGeometry(0.55, 0.65, 0.3)
    const torso = new THREE.Mesh(torsoGeo, jacketMat)
    torso.position.y = 0.8
    character.add(torso)

    // Chest Badge / Logo
    const badgeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.02)
    const badge = new THREE.Mesh(badgeGeo, visorMat)
    badge.position.set(-0.14, 0.1, 0.16)
    torso.add(badge)

    // Neck & Head
    const neckGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 8)
    const neck = new THREE.Mesh(neckGeo, skinMat)
    neck.position.y = 0.38
    torso.add(neck)

    const headGroup = new THREE.Group()
    headGroup.position.y = 0.55
    torso.add(headGroup)

    const headGeo = new THREE.SphereGeometry(0.24, 16, 16)
    const head = new THREE.Mesh(headGeo, skinMat)
    headGroup.add(head)

    // Modern Hair
    const hairGeo = new THREE.BoxGeometry(0.5, 0.2, 0.5)
    const hair = new THREE.Mesh(hairGeo, hairMat)
    hair.position.set(0, 0.15, -0.02)
    headGroup.add(hair)

    // Tech Visor / Glasses
    const visorGeo = new THREE.BoxGeometry(0.42, 0.08, 0.1)
    const visor = new THREE.Mesh(visorGeo, visorMat)
    visor.position.set(0, 0.02, 0.2)
    headGroup.add(visor)

    // Arms Hierarchical Groups (Shoulder pivots)
    // Left Arm
    const leftShoulder = new THREE.Group()
    leftShoulder.position.set(-0.35, 0.24, 0)
    torso.add(leftShoulder)

    const leftArmGeo = new THREE.BoxGeometry(0.14, 0.5, 0.14)
    const leftArm = new THREE.Mesh(leftArmGeo, jacketMat)
    leftArm.position.y = -0.22
    leftShoulder.add(leftArm)

    const leftHandGeo = new THREE.SphereGeometry(0.08, 8, 8)
    const leftHand = new THREE.Mesh(leftHandGeo, skinMat)
    leftHand.position.y = -0.5
    leftShoulder.add(leftHand)

    // Right Arm
    const rightShoulder = new THREE.Group()
    rightShoulder.position.set(0.35, 0.24, 0)
    torso.add(rightShoulder)

    const rightArmGeo = new THREE.BoxGeometry(0.14, 0.5, 0.14)
    const rightArm = new THREE.Mesh(rightArmGeo, jacketMat)
    rightArm.position.y = -0.22
    rightShoulder.add(rightArm)

    const rightHandGeo = new THREE.SphereGeometry(0.08, 8, 8)
    const rightHand = new THREE.Mesh(rightHandGeo, skinMat)
    rightHand.position.y = -0.5
    rightShoulder.add(rightHand)

    // Legs Hierarchical Groups (Hip pivots)
    // Left Leg
    const leftHip = new THREE.Group()
    leftHip.position.set(-0.16, -0.32, 0)
    torso.add(leftHip)

    const leftLegGeo = new THREE.BoxGeometry(0.16, 0.55, 0.16)
    const leftLeg = new THREE.Mesh(leftLegGeo, pantsMat)
    leftLeg.position.y = -0.28
    leftHip.add(leftLeg)

    const leftShoeGeo = new THREE.BoxGeometry(0.18, 0.12, 0.28)
    const leftShoe = new THREE.Mesh(leftShoeGeo, shoeMat)
    leftShoe.position.set(0, -0.56, 0.06)
    leftHip.add(leftShoe)

    // Right Leg
    const rightHip = new THREE.Group()
    rightHip.position.set(0.16, -0.32, 0)
    torso.add(rightHip)

    const rightLegGeo = new THREE.BoxGeometry(0.16, 0.55, 0.16)
    const rightLeg = new THREE.Mesh(rightLegGeo, pantsMat)
    rightLeg.position.y = -0.28
    rightHip.add(rightLeg)

    const rightShoeGeo = new THREE.BoxGeometry(0.18, 0.12, 0.28)
    const rightShoe = new THREE.Mesh(rightShoeGeo, shoeMat)
    rightShoe.position.set(0, -0.56, 0.06)
    rightHip.add(rightShoe)

    // Initial Position: Starts offscreen to the left
    character.position.set(-3.2, -0.4, 0)
    character.rotation.y = Math.PI / 2 // Facing right while walking in

    let animId
    let time = 0
    let arrived = false
    const targetX = 0

    // Animation Loop
    const animate = () => {
      animId = requestAnimationFrame(animate)
      time += 0.04

      // Phase 1: Walking In from Left to Center
      if (character.position.x < targetX) {
        character.position.x += 0.045
        character.rotation.y = Math.PI * 0.42 // Slight 3D angle towards user

        // Walk Cycle: Legs & Arms swinging
        const walkFreq = 7.5
        leftHip.rotation.x = Math.sin(time * walkFreq) * 0.65
        rightHip.rotation.x = -Math.sin(time * walkFreq) * 0.65

        leftShoulder.rotation.x = -Math.sin(time * walkFreq) * 0.5
        rightShoulder.rotation.x = Math.sin(time * walkFreq) * 0.5

        // Natural vertical bounce
        torso.position.y = 0.8 + Math.abs(Math.sin(time * walkFreq)) * 0.06
      } else {
        // Phase 2: Arrived! Stop walking and transition to Pointing Down & Waving
        if (!arrived) {
          arrived = true
          setHasArrived(true)
          setSpeechBubbleText("Hey! Scroll down to explore my work 👇")
          character.position.x = targetX
          character.rotation.y = 0 // Face forward towards user
          sound.playChime()
        }

        // Idle Breathing Stance
        torso.position.y = 0.8 + Math.sin(time * 2) * 0.015
        leftHip.rotation.x *= 0.8
        rightHip.rotation.x *= 0.8
        leftShoulder.rotation.x *= 0.8

        // Right Arm: Point Downwards & Wave to guide user
        rightShoulder.rotation.x = -0.5 + Math.sin(time * 3) * 0.15
        rightShoulder.rotation.z = -0.4 + Math.sin(time * 2) * 0.1
        headGroup.rotation.y = Math.sin(time * 1.5) * 0.15
        headGroup.rotation.x = 0.15 // Look slightly down towards scroll prompt
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isVisible])

  const handleClickCharacter = () => {
    sound.playClick()
    setSpeechBubbleText("Scroll down to enter my portfolio! 🚀")
    voice.speak("Scroll down to explore my portfolio!")
  }

  if (!isVisible) return null

  return (
    <div
      className="relative flex flex-col items-center select-none pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClickCharacter}
      title="Click to interact with 3D avatar"
    >
      {/* Floating Holographic Speech Bubble */}
      {hasArrived && (
        <div className="absolute -top-12 z-30 animate-bounce transition-all">
          <div className="px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-md flex items-center space-x-2 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold">{speechBubbleText}</span>
          </div>
          {/* Speech bubble beak */}
          <div className="w-2.5 h-2.5 bg-zinc-900 border-r border-b border-cyan-400/50 rotate-45 mx-auto -mt-1" />
        </div>
      )}

      {/* 3D Model WebGL Canvas Mount */}
      <div ref={mountRef} className="w-[280px] h-[320px] cursor-pointer" />

      {/* Sub-label under avatar */}
      {hasArrived && (
        <div className="-mt-8 text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center space-x-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Sumit 3D Avatar • Tap Me</span>
        </div>
      )}
    </div>
  )
}
