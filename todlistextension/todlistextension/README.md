# Harsh's Todo List Chrome Extension

A beautiful, animated todo list extension with AMOLED dark mode, sound effects, and multi-list support.

## Features

- ✅ **15-item limit** per todo list
- ✅ **Multi-list navigation** (Create New List / Previous List)
- ✅ **Animated checkboxes** with sound effects
- ✅ **Delete options** (Delete All / Delete Completed)
- ✅ **AMOLED dark mode** with glassmorphism effects
- ✅ **Sound system** with mute/unmute toggle
- ✅ **Google Fonts** (Caveat + Poppins)

## Setup Instructions

### 1. Load as Chrome Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `todlistextension` folder
5. The extension will appear in your toolbar

### 2. Add Sound Files (Optional)
The extension includes placeholder sound files. To add real sounds:

1. **Replace the placeholder files** in the `sounds/` folder:
   - `tick.mp3` - Short bubble/pop sound for checkbox completion
   - `click.mp3` - Subtle click sound for buttons
   - `chimes.mp3` - Pleasant chime sound for app opening

2. **Recommended sound characteristics:**
   - Duration: 0.1-0.5 seconds
   - Format: MP3, WAV, or OGG
   - Volume: Moderate (not too loud)
   - Quality: 44.1kHz, 128-320kbps

3. **Where to find sounds:**
   - [Freesound.org](https://freesound.org/)
   - [Zapsplat](https://www.zapsplat.com/)
   - GitHub sound effect packs

## File Structure

```
todlistextension/
├── todo.html          # Main HTML structure
├── todo.css           # Styles & animations
├── todo.js            # JavaScript & functionality
├── manifest.json      # Chrome extension config
├── icon128.png        # Extension icon
├── README.md          # This file
└── sounds/            # Audio files
    ├── tick.mp3       # Checkbox completion sound
    ├── click.mp3      # Button click sounds
    └── chimes.mp3     # App opening sound
```

## Troubleshooting

### Delete Buttons Not Working
1. Open browser console (F12)
2. Check for error messages
3. Verify the buttons are visible in the UI
4. Try refreshing the page

### Sounds Not Playing
1. Check if sound files are valid audio files
2. Open browser console for error messages
3. Verify mute button is not enabled
4. Check browser autoplay settings

### Extension Not Loading
1. Ensure all files are in the correct folder
2. Check `manifest.json` syntax
3. Verify file permissions
4. Try reloading the extension

## Usage

1. **Add todos**: Type in the input field and press Enter or click Add
2. **Complete todos**: Click the checkbox next to any todo
3. **Navigate lists**: Use "Create New List" and "Previous List" buttons
4. **Delete todos**: Use the small red buttons (🗑️ All / 🗑️ Done)
5. **Mute sounds**: Click the 🔊/🔇 button in the top-right corner

## Customization

- **Colors**: Edit `todo.css` to change the color scheme
- **Fonts**: Modify the Google Fonts link in `todo.html`
- **Animations**: Adjust keyframes in `todo.css`
- **Sounds**: Replace files in the `sounds/` folder

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Edge
- ✅ Opera
- ⚠️ Firefox (may need adjustments)

## License

This project is open source and available under the MIT License. 