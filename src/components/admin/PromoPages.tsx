import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ExternalLink, Edit } from 'lucide-react';
import { usePromoPageStore } from '../../stores/promoPageStore';
import { Button } from '../ui/Button';
import Toggle from '../ui/Toggle';
import CopyLinkButton from '../ui/CopyLinkButton';
import { formatDateTime } from '../../lib/utils/date';

export default function PromoPages() {
  const navigate = useNavigate();
  const { pages, loading, error, fetchPages, deletePage, togglePublish } = usePromoPageStore();

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      await deletePage(id);
      // Refresh the pages list after deletion
      fetchPages();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-wider text-white">My Promo Pages</h2>
        <Button 
          variant="gradient" 
          size="md" 
          onClick={() => navigate('/admin/pages/new')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Page
        </Button>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/30 rounded-lg border border-zinc-800">
          <p className="text-gray-400 mb-4">No promo pages yet</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin/pages/new')}
          >
            Create your first page
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {pages.map((page) => (
            <div 
              key={page.id}
              className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800 flex gap-6"
            >
              {/* Thumbnail */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={page.latest_release_image || 'https://images.unsplash.com/photo-1578589318433-39b5de440c3f?auto=format&fit=crop&w=200&q=80'}
                  alt={page.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-grow flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    <span className="text-red-500">{page.title}</span>
                  </h3>
                  <p className="text-sm text-gray-400">
                    Created: {formatDateTime(page.created_at)}
                  </p>
                  {page.latest_release_title && (
                    <p className="text-sm text-white mt-1">
                      {page.latest_release_title}
                    </p>
                  )}
                  <div className="mt-3">
                    <Toggle
                      checked={page.is_published}
                      onChange={() => togglePublish(page.id)}
                      label={page.is_published ? 'Published' : 'Draft'}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <CopyLinkButton pageId={page.id} />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/promo/${page.id}`, '_blank')}
                    className="w-10 h-10 p-0 flex items-center justify-center"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/pages/edit/${page.id}`)}
                    className="w-10 h-10 p-0 flex items-center justify-center"
                    title="Edit page"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(page.id)}
                    className="w-10 h-10 p-0 flex items-center justify-center text-red-500 hover:text-red-400"
                    title="Delete page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}