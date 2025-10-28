import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Trash2 } from 'lucide-react';

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
    if (saved) {
      setRecipes(JSON.parse(saved));
    }
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
      createdAt: Date.now()
    };

    saveRecipes([...recipes, newRecipe]);
    setFormData({
      category: 'Çorbalar',
      name: '',
      ingredients: '',
      instructions: ''
    });
    setScreen('main');
  };

  const handleDeleteRecipe = (id: string) => {
    if (confirm('Bu tarifi silmek istediğinize emin misiniz?')) {
      saveRecipes(recipes.filter(r => r.id !== id));
      setScreen('main');
    }
  };

  const filteredRecipes = selectedCategory === 'Tümü' 
    ? recipes 
    : recipes.filter(r => r.category === selectedCategory);

  if (screen === 'create') {
    return (
      <div className="min-h-screen bg-gray-50 pb-6">
        <div className="bg-emerald-600 text-white p-4 sticky top-0 shadow-md">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setScreen('main')}
              className="p-1 hover:bg-emerald-700 rounded"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold">Yeni Tarif Ekle</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarif Adı
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Örn: Mercimek Çorbası"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Malzemeler
            </label>
            <textarea
              value={formData.ingredients}
              onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
              placeholder="Her satıra bir malzeme yazın..."
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hazırlanışı
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              placeholder="Tarifin adımlarını yazın..."
              rows={8}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleSaveRecipe}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Tarifi Kaydet
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'detail' && selectedRecipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-emerald-600 text-white p-4 sticky top-0 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setScreen('main')}
                className="p-1 hover:bg-emerald-700 rounded"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-xl font-semibold">{selectedRecipe.name}</h1>
            </div>
            <button
              onClick={() => handleDeleteRecipe(selectedRecipe.id)}
              className="p-2 hover:bg-emerald-700 rounded"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              {selectedRecipe.category}
            </span>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Malzemeler</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedRecipe.ingredients}</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Hazırlanışı</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedRecipe.instructions}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-600 text-white p-4 sticky top-0 shadow-md">
        <h1 className="text-2xl font-bold">Tarif Defteri</h1>
      </div>

      <div className="p-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as Category | 'Tümü')}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="Tümü">Tümü</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Henüz tarif eklenmemiş</p>
            <p className="text-sm mt-2">Yeni tarif eklemek için + butonuna tıklayın</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => {
                  setSelectedRecipe(recipe);
                  setScreen('detail');
                }}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      {recipe.name}
                    </h3>
                    <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                      {recipe.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setScreen('create')}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}