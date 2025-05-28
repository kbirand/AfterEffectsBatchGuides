# Batch Guide Extension for After Effects

This extension allows you to add evenly distributed guides to your After Effects compositions with a simple user interface.

## Features

- Add any number of horizontal and vertical guides
- Option to include guides at the edges of the composition
- Option to have padding between guides
- Option to clear existing guides before adding new ones
- Clean, modern UI that matches the After Effects theme

## Installation

### Method 1: Manual Installation

1. Copy the entire `BatchGuides` folder to:
   - Windows: `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`
   - Mac: `/Library/Application Support/Adobe/CEP/extensions/`

2. Enable debug mode to load unsigned extensions:
   - Windows: Create a DWORD value named `PlayerDebugMode` with value `1` in the registry at:
     `HKEY_CURRENT_USER\Software\Adobe\CSXS.12` (or the appropriate version for your Adobe apps)
   - Mac: Run this command in Terminal:
     ```
     defaults write com.adobe.CSXS.10 PlayerDebugMode 1
     ```

3. Restart After Effects

### Method 2: Using ZXP Installer (Recommended)

1. Zip the entire `BatchGuide` folder
2. Rename the .zip extension to .zxp
3. Download and install a ZXP installer like [ZXP Installer](https://aescripts.com/learn/zxp-installer/) or [Anastasiy's Extension Manager](https://install.anastasiy.com/)
4. Use the installer to install your .zxp file
5. Restart After Effects

## Usage

1. In After Effects, go to Window > Extensions > Batch Guides
2. Enter the number of horizontal and vertical guides you want
3. Choose whether to include guides at the edges
4. Choose whether to clear existing guides
5. Click "Apply"

## Troubleshooting

- If the extension doesn't appear in After Effects, make sure you've enabled debug mode correctly
- If the guides aren't being added, make sure you have a composition selected
- If you encounter any errors, check the status message at the bottom of the extension panel

## Development

This extension is built using Adobe CEP (Common Extensibility Platform) with:
- HTML/CSS/JavaScript for the UI
- ExtendScript for the After Effects integration

To modify the extension:
1. Edit the HTML/CSS/JS files for UI changes
2. Edit the JSX file for After Effects functionality changes
3. Update the manifest.xml file if changing extension metadata or requirements
