# StarWars Galaxy

StarWars Galaxy is a classic arcade-style game where players pilot a spaceship to fend off waves of enemy spacecraft. The objective is to prevent enemies from breaching the bottom border and avoid getting hit to survive.

[Demo live](https://clairegame.netlify.app/) |
[Medium Post](https://medium.com/@jclaire/embarking-on-a-galactic-adventure-transforming-my-sons-love-for-star-wars-into-a-captivating-mini-d3e43ab8e983) |
[Claire's Portfolio](https://www.jclairelee.com)

![Screenshot](./image/shootingGame.jpg)

### Technologies Used

- HTML5 Canvas
- JavaScript

### Setup

To run the game locally:

1. Clone this repository.
2. Open the project directory in your preferred code editor.
3. Launch the game by clicking on `Go live` at the bottom of VS Code to preview the game in your browser.

### Difficulty Levels

Choose from three different levels of difficulty before starting the game:

- **Easy**: Slower enemy speed and longer intervals between enemy spawns.
- **Medium**: Moderate enemy speed and faster spawn intervals.
- **Hard**: Faster enemy speed and shorter spawn intervals.

The selected difficulty level impacts the game's challenge and pacing, offering varying degrees of difficulty to suit different player skills.

### Function Flow

1. Canvas Setup: The canvas element is initialized for rendering with event listeners for window resizing.

2. Level Selection: Players can choose from easy, medium, or hard difficulty levels, influencing enemy speed and spawn rates.

3. Game Initialization:
   Background music themed from Star Wars is loaded and played. Image assets, including backgrounds, player spaceship, enemy spacecraft, bullets, and game over screens, are loaded.

5. Game Loop:

   Continuously updates the game state and renders images on the canvas.
Handles player input for spaceship movement and firing bullets.
Spawns enemy spacecraft based on the selected difficulty level.
Detects collisions between bullets and enemies, as well as collisions with the player spaceship.
Displays score and level information dynamically.

6. Game Over:
   Ends the game if the player's spaceship is hit by an enemy or an enemy breaches the bottom border.
Displays a game over screen and pauses background music.

6. Restarting the Game: Automatically restarts the game after displaying the game over screen briefly.

### Credits

- This project was inspired by [HTML5 Canvas and JavaScript Game Tutorial](https://youtu.be/eI9idPTT0c4).
- Background Music: Star Wars Theme Song
- Sound Effects: Spaceship Shooting Sound
- Image Assets: Star Wars characters sourced from Google Images


