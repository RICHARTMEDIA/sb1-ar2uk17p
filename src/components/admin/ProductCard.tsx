import type { Product } from '../../lib/types/artist';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex bg-zinc-900/30 rounded-lg overflow-hidden group h-20">
      {/* Image Container */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 px-6 py-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white tracking-wide truncate max-w-[300px]">
            {product.title}
          </h3>
          <span className="text-emerald-500 font-medium tracking-wider text-lg">
            ${product.price.toFixed(2)}
          </span>
        </div>
        {product.status === 'sale' ? (
          <button className="border border-white/90 text-white hover:bg-white hover:text-black transition-all duration-300 px-4 py-1.5 text-xs font-medium tracking-wider rounded-full uppercase">
            buy
          </button>
        ) : product.status === 'soldout' && (
          <span className="text-red-500 font-medium text-sm tracking-wider uppercase">
            Sold Out
          </span>
        )}
      </div>
    </div>
  );
}