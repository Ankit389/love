import { FloatingHearts } from "@/components/floating-hearts"
import { SheIsMyWorld } from "@/components/she-is-my-world"
import { HeartGallery } from "@/components/heart-gallery"
import { LoveLetter } from "@/components/love-letter"
import { ShayariSection } from "@/components/shayari-section"
import { MusicPlayer } from "@/components/music-player"
import { PromisesSection } from "@/components/promises-section"
import { FinalProposal } from "@/components/final-proposal"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <FloatingHearts />
      <SheIsMyWorld />
      <HeartGallery />
      <LoveLetter />
      <ShayariSection />
      <PromisesSection />
      <FinalProposal />
      <MusicPlayer />
    </main>
  )
}
