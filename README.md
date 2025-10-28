# 📖 Tarif Defteri (Recipe Book)

A simple, mobile-friendly recipe management app built with React, TypeScript, and Tailwind CSS. Store your favorite recipes locally in your browser - no server required!

## ✨ Features

- 📱 **Mobile-First Design** - Optimized for mobile browsers
- 🗂️ **Category Organization** - Organize recipes into 5 categories:
  - Çorbalar (Soups)
  - Tatlılar (Desserts)
  - Yemek (Main Dishes)
  - Salata (Salads)
  - Meze (Appetizers)
- 🔍 **Filter by Category** - Quick filtering with dropdown menu
- ➕ **Easy Recipe Creation** - Simple form to add new recipes
- 💾 **Local Storage** - All data saved in browser (no server needed)
- 🗑️ **Delete Recipes** - Remove recipes you no longer need
- 📝 **Detailed View** - See full ingredients and cooking instructions
- 🇹🇷 **Turkish Interface** - Full Turkish language support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The app is now running!

### Build for Production

```bash
pnpm build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
pnpm preview
```

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **LocalStorage API** - Browser-based data persistence

## 📱 Usage

### Adding a Recipe

1. Click the **+** button in the bottom-right corner
2. Select a category from the dropdown
3. Enter the recipe name (Tarif Adı)
4. Add ingredients (Malzemeler) - one per line recommended
5. Write cooking instructions (Hazırlanışı)
6. Click **Tarifi Kaydet** to save

### Viewing Recipes

- All recipes are displayed on the main screen
- Click on any recipe card to view full details
- Use the category dropdown filter to show specific categories
- Select "Tümü" to show all recipes

### Deleting a Recipe

1. Click on a recipe to open detail view
2. Click the trash icon in the top-right corner
3. Confirm deletion

## 📂 Project Structure

```
recipe-app/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Tailwind CSS imports
│   └── vite-env.d.ts    # Vite type definitions
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🎨 Customization

### Changing Categories

Edit the `categories` array in `src/App.tsx`:

```typescript
const categories: Category[] = ['Çorbalar', 'Tatlılar', 'Yemek', 'Salata', 'Meze'];
```

### Changing Theme Colors

The app uses Tailwind's `emerald` color palette. To change:

1. Open `src/App.tsx`
2. Find and replace `emerald-` with another color (e.g., `blue-`, `purple-`, `rose-`)

### Adding New Fields

To add new fields to recipes:

1. Update the `Recipe` interface
2. Add the field to `formData` state
3. Add input field in the create screen
4. Display the field in the detail view

## 💾 Data Storage

All recipes are stored in the browser's `localStorage` under the key `recipes`. Data persists across sessions but is specific to:
- The browser being used
- The domain/URL where the app is hosted

**Note:** Clearing browser data will delete all recipes.

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Cooking! 🍳👨‍🍳**