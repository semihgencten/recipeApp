import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Trash2 } from 'lucide-react';
import './App.css';

type Category = 'Çorbalar' | 'Tatlılar' | 'Yemek' | 'Salata' | 'Meze';

interface Recipe {
  id: string;
  category: Category;
  name: string;
  ingredients: string;
  instructions: string;
  createdAt: number;
}

const categories: Category[] = ['Çorbalar', 'Tatlılar', 'Yemek', 'Salata', 'Meze'];

export default function RecipeApp() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [screen, setScreen] = useState<'main' | 'create' | 'detail'>('main');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Tümü'>('Tümü');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const [formData, setFormData] = useState({
    category: 'Çorbalar' as Category,
    name: '',
    ingredients: '',
    instructions: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('recipes');
    if (saved) setRecipes(JSON.parse(saved));
  }, []);

  const saveRecipes = (newRecipes: Recipe[]) => {
    setRecipes(newRecipes);
    localStorage.setItem('recipes', JSON.stringify(newRecipes));
  };

  const handleSaveRecipe = () => {
    if (!formData.name || !formData.ingredients || !formData.instructions) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      category: formData.category,
      name: formData.name,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      createdAt: Date.now(),
    };
    saveRecipes([...recipes, newRecipe]);
    setFormData({ category: 'Çorbalar', name: '', ingredients: '', instructions: '' });
    setScreen('main');
  };

  const handleDeleteRecipe = (id: string) => {
    if (confirm('Bu tarifi silmek istediğinize emin misiniz?')) {
      saveRecipes(recipes.filter(r => r.id !== id));
      setScreen('main');
    }
  };

  const filteredRecipes =
    selectedCategory === 'Tümü'
      ? recipes
      : recipes.filter(r => r.category === selectedCategory);

  // Category color map for fun badges
  const categoryColors: Record<Category, string> = {
    Çorbalar: 'bg-orange-100 text-orange-700',
    Tatlılar: 'bg-pink-100 text-pink-700',
    Yemek: 'bg-emerald-100 text-emerald-700',
    Salata: 'bg-lime-100 text-lime-700',
    Meze: 'bg-sky-100 text-sky-700',
  };

  // Header gradient helper
  const headerGradient = 'bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500';

  // CREATE SCREEN
  if (screen === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 pb-8">
        <div className={`${headerGradient} text-white p-4 sticky top-0 shadow-md`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setScreen('main')}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-semibold tracking-wide">Yeni Tarif Ekle</h1>
          </div>
        </div>

        <div className="p-5 space-y-5 max-w-xl mx-auto">
          {[
            {
              label: 'Kategori',
              element: (
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              ),
            },
            {
              label: 'Tarif Adı',
              element: (
                <input
                  type="text"
                  placeholder="Örn: Mercimek Çorbası"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />
              ),
            },
            {
              label: 'Malzemeler',
              element: (
                <textarea
                  rows={5}
                  placeholder="Her satıra bir malzeme yazın..."
                  value={formData.ingredients}
                  onChange={e => setFormData({ ...formData, ingredients: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />
              ),
            },
            {
              label: 'Hazırlanışı',
              element: (
                <textarea
                  rows={7}
                  placeholder="Tarifin adımlarını yazın..."
                  value={formData.instructions}
                  onChange={e => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />
              ),
            },
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              {field.element}
            </div>
          ))}

          <button
            onClick={handleSaveRecipe}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.01] transition-all"
          >
            Tarifi Kaydet
          </button>
        </div>
      </div>
    );
  }

  // DETAIL SCREEN
  if (screen === 'detail' && selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
        <div className={`${headerGradient} text-white p-4 sticky top-0 shadow-md`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScreen('main')}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
              >
                <ArrowLeft size={22} />
              </button>
              <h1 className="text-xl font-semibold">{selectedRecipe.name}</h1>
            </div>
            <button
              onClick={() => handleDeleteRecipe(selectedRecipe.id)}
              className="p-2 bg-white/20 hover:bg-red-500/60 rounded-full transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6 max-w-2xl mx-auto">
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[selectedRecipe.category]}`}
          >
            {selectedRecipe.category}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Malzemeler</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedRecipe.ingredients}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Hazırlanışı</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedRecipe.instructions}</p>
          </div>
        </div>
      </div>
    );
  }

  // MAIN SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 pb-24">
      <div className={`${headerGradient} text-white p-4 sticky top-0 shadow-md`}>
        <h1 className="text-2xl font-bold tracking-wide">🍽️ Tarif Defteri</h1>
      </div>

      <div className="p-5 max-w-xl mx-auto">
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value as Category | 'Tümü')}
          className="w-full p-3 border border-gray-200 rounded-xl mb-5 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white"
        >
          <option value="Tümü">Tümü</option>
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium">Henüz tarif eklenmemiş 🍳</p>
            <p className="text-sm mt-2">Yeni tarif eklemek için aşağıdaki butona tıklayın</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => {
                  setSelectedRecipe(recipe);
                  setScreen('detail');
                }}
                className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{recipe.name}</h3>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColors[recipe.category]}`}
                >
                  {recipe.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setScreen('create')}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-transform"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
