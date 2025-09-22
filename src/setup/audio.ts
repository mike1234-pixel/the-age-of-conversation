export const setupAudio = () => {
  // Handel - Entrance to the Queen of Sheba for Two Oboes, Strings, and Continuo allegro by Advent Chamber Orchestra is licensed under a Attribution-Share Alike 3.0 United States License.
  // https://creativecommons.org/licenses/by-sa/3.0/us/
  // Music promoted on https://www.chosic.com/free-music/all/
  const backgroundMusic = new Audio(
    "/assets/music/handel-arrival-of-the-queen-of-sheba.mp3"
  )
  backgroundMusic.loop = true
  backgroundMusic.volume = 0.5

  function startMusic() {
    backgroundMusic.play().catch((err) => {
      console.warn("Unable to play music automatically:", err)
    })
    window.removeEventListener("keydown", startMusic)
    window.removeEventListener("mousedown", startMusic)
  }

  // Start music on first key press or mouse click
  window.addEventListener("keydown", startMusic)
  window.addEventListener("mousedown", startMusic)
}
