import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import Toggle from '../../ui/Toggle';
import ImageUpload from '../ImageUpload';
import ProductStatusSelect from './ProductStatusSelect';
import type { Product, ProductStatus } from '../../../lib/types/artist';

interface ProductsProps {
  visible: boolean;
  products: Product[];
  onVisibilityChange: () => void;
  onChange: (products: Product[]) => void;
}

export default function Products({
  visible,
  products,
  onVisibilityChange,
  onChange
}: ProductsProps) {
  const addProduct = () => {
    onChange([...products, {
      id: crypto.randomUUID(),
      title: '',
      image: '',
      price: 0,
      status: 'sale'
    }]);
  };

  const removeProduct = (id: string) => {
    onChange(products.filter(product => product.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number | ProductStatus) => {
    if (field === 'price') {
      const numericValue = parseFloat(value as string);
      const validPrice = !isNaN(numericValue) ? Math.max(0, numericValue) : 0;
      onChange(products.map(product =>
        product.id === id ? { ...product, price: validPrice } : product
      ));
      return;
    }

    onChange(products.map(product =>
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wider text-gray-400">Products</h3>
        <Toggle
          checked={visible}
          onChange={onVisibilityChange}
          label={visible ? 'Visible' : 'Hidden'}
        />
      </div>

      <div className={visible ? 'space-y-6' : 'hidden'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800"
            >
              <div className="flex justify-between">
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => updateProduct(product.id, 'title', e.target.value)}
                  placeholder="Product Title"
                  className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeProduct(product.id)}
                  className="ml-4 text-red-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <ImageUpload
                label="Product Image"
                initialValue={product.image}
                onChange={(url) => updateProduct(product.id, 'image', url)}
              />

              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={product.price || ''}
                    onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    className="w-full p-3 pl-6 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                </div>
                <ProductStatusSelect
                  value={product.status}
                  onChange={(value) => updateProduct(product.id, 'status', value)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          size="sm"
          onClick={addProduct}
          className="flex items-center gap-1.5 text-xs whitespace-nowrap mt-8"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Product
        </Button>
      </div>
    </section>
  );
}